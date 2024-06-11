import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, CircularProgress, FormControl, TextField } from "@mui/material";

import { Page } from "../../components/Page/Page";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { delay } from "../../lib/promise";

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
    const { mutateAsync, isPending } = useMutation<API.GenerationStartResult>({
        mutationKey: ['generate'],
        mutationFn: () => {
            return delay(5000).then(() => ({
                uid: "some-uuid"
            }));
        }
    });

    const navigate = useNavigate();

    const startGeneration = React.useCallback(() => {
        return mutateAsync()
            .then(({ uid }) => navigate(`/generation/${uid}`))
            .catch(console.error);
    }, [mutateAsync, navigate]);

    return (
        <Page>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} padding="1.6rem">
                <ImageUpload />
                <FormControl sx={{ marginTop: '1.6rem', width: '51.2rem' }} disabled={isPending}>
                    <TextField
                        multiline
                        variant="outlined"
                        id="prompt"
                        label="Input prompt"
                    />
                </FormControl>
                <StartButton pending={isPending} onClick={startGeneration} />
            </Box>
        </Page>
    );
};
