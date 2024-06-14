import React, { ChangeEventHandler } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, CircularProgress, FormControl, ImageList, ImageListItem, Skeleton, Stack, TextField, Typography } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { Page } from "../../components/Page/Page";
import { ImageUpload, ImageUploadPreview } from "../../components/ImageUpload/ImageUpload";
import { ApiError, api } from "../../api";
import { useRenewedBoolean } from "../../lib/useRenewedBoolean";
import { ImagePreview } from "../../components/ImageUpload/ImagePreview";

interface ContainedButtonProps {
    pending?: boolean;
    onClick?: VoidFunction;
}

export const StartButton: React.FC<ContainedButtonProps> = ({ pending, onClick }) => {
    return (
        <Button
            variant="contained"
            disabled={pending}
            sx={{ marginTop: '0.8rem' }}
            onClick={pending ? undefined : onClick}
            endIcon={pending ? <CircularProgress size={16} /> : undefined}
        >
            <Typography variant="button">
                Сгенерировать!
            </Typography>
        </Button>
    );
};

const AiPromptButton: React.FC<ContainedButtonProps> = ({ pending, onClick }) => {
    return (
        <Button
            variant="outlined"
            disabled={pending}
            onClick={pending ? undefined : onClick}
            sx={{ mt: "0.8rem", ml: "0.8rem" }}
        >
            {pending ? <CircularProgress size={16} /> : <SmartToyIcon fontSize="large" />}
        </Button >
    );
};

interface OutlinedTextField {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
}

const OutlinedTextField: React.FC<OutlinedTextField> = ({ value, onChange: setValue, disabled, label, required, error }) => {
    const onValueChange = React.useCallback<ChangeEventHandler<HTMLInputElement>>(event => setValue?.(event.target.value), [setValue]);

    return (
        <TextField
            sx={{ mt: "0.8rem", flexGrow: 1 }}
            variant="outlined"
            value={value}
            onChange={onValueChange}
            disabled={disabled}
            required={required}
            label={label}
            error={error}
            multiline
        />
    );
};

export const CreateGenerationPage: React.FC = () => {
    const {
        src,
        setSrc,
        prompt,
        setPrompt,
        description,
        setDescription,
        negativePrompt,
        setNegativePrompt
    } = useGenerationPageContext();
    const [imageIncorrect, setImageIncorrect] = useRenewedBoolean(2000);
    const [descriptionIncorrect, setDescriptionIncorrect] = useRenewedBoolean(2000);

    const { mutateAsync, isPending } = useMutation<
        API.Generation,
        ApiError,
        POST.LaunchGeneration
    >({
        mutationKey: ['generate'],
        mutationFn: (body) => {
            return api.fetch<API.Generation, POST.LaunchGeneration>('/generations', {
                method: "POST",
                body,
            })
        }
    });

    const { mutateAsync: generatePromptMutation, isPending: isGeneratingPrompt } = useMutation<API.GeneratePrompt, ApiError, POST.GeneratePrompt>({
        mutationKey: ['generatePrompt'],
        mutationFn: (body) => {
            return api.fetch('/prompt', {
                method: 'POST',
                body,
            })
        },
    });

    const navigate = useNavigate();

    const startGeneration = React.useCallback(() => {
        if (!src) {
            setImageIncorrect();
        }
        if (!description) {
            setDescriptionIncorrect();
        }

        if (!src || !description) {
            return;
        }

        return mutateAsync({
            input_image: src,
            description: description,
            input_prompt: prompt === '' ? null : prompt,
            negative_prompt: negativePrompt === '' ? null : negativePrompt,
        })
            .then(({ uid }) => navigate(`/generation/${uid}`))
            .catch(console.error);
    }, [mutateAsync, navigate, prompt, setImageIncorrect, setDescriptionIncorrect, description, negativePrompt, src]);

    const generatePrompt = React.useCallback(() => {
        if (!description) {
            setDescriptionIncorrect();
            return;
        }

        generatePromptMutation({ description })
            .then(({ prompt }) => setPrompt(prompt))
            .catch(console.error);

    }, [description, setDescriptionIncorrect, generatePromptMutation, setPrompt]); 

    return <>
        <ImageUpload onSrcChange={setSrc} showError={imageIncorrect} />
        <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }}>
            <OutlinedTextField label="Описание" value={description} onChange={setDescription} disabled={isPending || isGeneratingPrompt} error={descriptionIncorrect} required />
            <Stack direction="row">
                <OutlinedTextField label="Промпт" value={prompt} onChange={setPrompt} disabled={isPending || isGeneratingPrompt} /><AiPromptButton onClick={generatePrompt} pending={isGeneratingPrompt} />
            </Stack>
            <OutlinedTextField label="Отрицательный промпт" value={negativePrompt} onChange={setNegativePrompt} disabled={isPending} />
        </FormControl>
        <StartButton pending={isPending} onClick={startGeneration} />
    </>;
};

const mockImages: API.GenerationResult[] = new Array(1).fill(undefined).map((_, i) => ({
    uid: i.toString(),
}));

export const GenerationPage: React.FC = () => {
    const {
        src,
        prompt,
        description,
        negativePrompt,
    } = useGenerationPageContext();
    const uid = useParams<{ id: string }>().id || '';

    const { data } = useQuery({
        queryKey: ['generation', uid],
        queryFn: () => api.fetch<API.Generation>(`/generations/${uid}`),
        refetchInterval: (query) => !query.state.data || ['created', 'in_progress'].includes(query.state.data.status) ? 5000 : false,
    });

    React.useEffect(() => {
        if (src) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        }
    }, []);

    const results = !data || ['created', 'in_progress'].includes(data.status) ? mockImages : data.results;
    const previewSrc = src || data?.input_image_link;

    return <>
        <ImageUploadPreview src={previewSrc} />
        <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }} disabled>
            <OutlinedTextField label="Описание" value={description || data?.description || ''} disabled />
            <OutlinedTextField label="Промпт" value={prompt || data?.input_prompt || ''} disabled />
            <OutlinedTextField label="Отрицательный промпт" value={negativePrompt || data?.negative_prompt || ''} disabled />
        </FormControl>
        <ImageList variant="masonry" cols={1} rowHeight='auto' gap={4} sx={{ width: "51.2rem" }}>
            {results.map((result) => (
                <ImageListItem key={result.uid} >
                    <Box sx={{ width: "51.2rem", height: "51.2rem" }}>
                        {!result.error && (<ImagePreview src={result.image_link} spinner />)}
                        {result.error && (<>
                            <Skeleton variant="rectangular" animation={false} sx={{
                                width: "100%", height: "100%", position: 'absolute', bgcolor: "rgba(225, 51, 51, 0.11)",
                            }} />
                            <Typography variant="body1">{result.error}</Typography>
                        </>)}
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    </>;
}

interface GenerationPageContext {
    src: string | undefined;
    setSrc: (src: string | undefined) => void;
    description: string;
    setDescription: (description: string) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    negativePrompt: string;
    setNegativePrompt: (prompt: string) => void;
}

export const BaseGenerationPage = () => {
    const [src, setSrc] = React.useState<string>()
    const [description, setDescription] = React.useState('');
    const [prompt, setPrompt] = React.useState('');
    const [negativePrompt, setNegativePrompt] = React.useState('');

    return (
        <Page>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} padding="1.6rem">
                <Outlet context={{
                    src,
                    setSrc,
                    prompt,
                    setPrompt,
                    description,
                    setDescription,
                    negativePrompt,
                    setNegativePrompt
                }} />
            </Box>
        </Page>
    );
}

const useGenerationPageContext = () => useOutletContext<GenerationPageContext>();
