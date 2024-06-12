import React, { ChangeEventHandler } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, CircularProgress, FormControl, ImageList, ImageListItem, Skeleton, TextField, Typography } from "@mui/material";

import { Page } from "../../components/Page/Page";
import { ImageUpload, ImageUploadPreview } from "../../components/ImageUpload/ImageUpload";
import { ApiError, api } from "../../api";
import { toBase64 } from "../../lib/file";
import { useRenewedBoolean } from "../../lib/useRenewedBoolean";

interface StartButtonProps {
    pending?: boolean;
    onClick?: VoidFunction;
}

export const StartButton: React.FC<StartButtonProps> = ({ pending, onClick }) => {
    return (
        <Button
            variant="contained"
            disabled={pending}
            sx={{ marginTop: '0.8rem' }}
            onClick={pending ? undefined : onClick}
            endIcon={pending ? <CircularProgress size={16} /> : undefined}
        >Сгенерировать!</Button>
    );
};

interface OutlinedTextField {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const OutlinedTextField: React.FC<OutlinedTextField> = ({ value, onChange: setValue, disabled, label }) => {
    const onValueChange = React.useCallback<ChangeEventHandler<HTMLInputElement>>(event => setValue?.(event.target.value), [setValue]);

    return (
        <TextField
            sx={{ mt: "0.8rem" }}
            variant="outlined"
            value={value}
            onChange={onValueChange}
            disabled={disabled}
            label={label}
            multiline
        />
    );
};

export const CreateGenerationPage: React.FC = () => {
    const {
        image,
        setImage,
        prompt,
        setPrompt,
        description,
        setDescription,
        negativePrompt,
        setNegativePrompt
    } = useGenerationPageContext();
    const [imageIncorrect, setImageIncorrect] = useRenewedBoolean(2000);

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

    const navigate = useNavigate();

    const startGeneration = React.useCallback(() => {
        if (!image) {
            setImageIncorrect();
            return;
        }

        return toBase64(image).then(base64 => mutateAsync({
            input_image: base64,
            description: description,
            input_prompt: prompt === '' ? null : prompt,
            negative_prompt: negativePrompt === '' ? null : negativePrompt,

        }))
            .then(({ uid }) => navigate(`/generation/${uid}`))
            .catch(console.error);
    }, [mutateAsync, navigate, prompt, image, setImageIncorrect, description, negativePrompt]);

    return <>
        <ImageUpload onImageChange={setImage} showError={imageIncorrect} />
        <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }} >
            <OutlinedTextField label="Описание" onChange={setDescription} disabled={isPending} />
            <OutlinedTextField label="Промпт" onChange={setPrompt} disabled={isPending} />
            <OutlinedTextField label="Отрицательный промпт" onChange={setNegativePrompt} disabled={isPending} />
        </FormControl>
        <StartButton pending={isPending} onClick={startGeneration} />
    </>;
};

const mockImages: API.GenerationResult[] = new Array(1).fill(undefined).map((_, i) => ({
    uid: i.toString(),
}));

export const GenerationPage: React.FC = () => {
    const {
        image,
        prompt,
        description,
        negativePrompt,
    } = useGenerationPageContext();
    const uid = useParams<{ id: string }>().id || '';

    const { data, isFetching } = useQuery({
        queryKey: ['generation', uid],
        queryFn: () => api.fetch<API.Generation>(`/generations/${uid}`),
    });

    const results = isFetching || !data || data.results.length === 0 ? mockImages : data.results;

    return <>
        <ImageUploadPreview image={image} />
        <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }} disabled>
            <OutlinedTextField label="Описание" value={description} disabled />
            <OutlinedTextField label="Промпт" value={prompt} disabled />
            <OutlinedTextField label="Отрицательный промпт" value={negativePrompt} disabled />
        </FormControl>
        <ImageList variant="masonry" cols={1} rowHeight='auto' gap={4} sx={{ width: "51.2rem" }}>
            {results.map((result) => (
                <ImageListItem key={result.uid} >
                    <Box sx={{ width: "51.2rem", height: "51.2rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {!result.image_link && !result.error && (<>
                            <Skeleton variant="rectangular" sx={{
                                width: "100%", height: "100%", position: 'absolute'
                            }} />
                            <CircularProgress sx={{ position: 'absolute' }} />
                        </>)}
                        {result.image_link && (
                            <img
                                srcSet={`${result.image_link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${result.image_link}?w=164&h=164&fit=crop&auto=format`}
                                loading="lazy"
                            />
                        )}
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
    image: File | undefined;
    setImage: (image: File | undefined) => void;
    description: string;
    setDescription: (description: string) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    negativePrompt: string;
    setNegativePrompt: (prompt: string) => void;
}

export const BaseGenerationPage = () => {
    // const image = useInstance(() => document.createElement('img'));

    const [image, setImage] = React.useState<File>()
    const [description, setDescription] = React.useState('');
    const [prompt, setPrompt] = React.useState('');
    const [negativePrompt, setNegativePrompt] = React.useState('');

    return (
        <Page>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} padding="1.6rem">
                <Outlet context={{
                    image,
                    setImage,
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
