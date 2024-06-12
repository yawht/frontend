import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

import { Page } from "../../components/Page/Page";

export const NotFoundPage: React.FC = () => {
    return (
        <Page>
            <Stack direction="column" alignItems='center' >
                <Typography variant="h1" mt="32.0rem">404</Typography>
                <Typography variant="h3">Страница не найдена</Typography>
                <Link to="/generation">
                    <Button
                        variant="contained"
                        sx={{ marginTop: '3.2rem' }}
                    >В начало</Button>
                </Link>
            </Stack>
        </Page>
    );
};
