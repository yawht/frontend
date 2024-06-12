import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, CircularProgress, FormControl, TextField } from "@mui/material";

import { Page } from "../../components/Page/Page";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { ApiError, api } from "../../api";
import { toBase64 } from "../../lib/file";

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

export const CreateGenerationPage: React.FC = () => {
    const imageRef = React.useRef<File>();
    const [prompt, setPrompt] = React.useState('');

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

    const onPromptChange = React.useCallback<ChangeEventHandler<HTMLInputElement>>(event => setPrompt(event.target.value), [])

    const startGeneration = React.useCallback(() => {
        const image = imageRef.current;
        if (!image) {
            return;
        }

        return toBase64(image).then(base64 => mutateAsync({
            input_image: base64,
            input_prompt: prompt,
        }))
            .then(({ uid }) => navigate(`/generation/${uid}`))
            .catch(console.error);
    }, [mutateAsync, navigate, prompt]);

    return (
        <Page>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} padding="1.6rem">
                <ImageUpload imageRef={imageRef} />
                <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }} disabled={isPending}>
                    <TextField
                        multiline
                        variant="outlined"
                        id="prompt"
                        label="Input prompt"
                        onChange={onPromptChange}
                    />
                </FormControl>
                <StartButton pending={isPending} onClick={startGeneration} />
            </Box>
        </Page>
    );
};
