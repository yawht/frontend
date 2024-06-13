import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

import { Page } from "../../components/Page/Page";

export const LandingPage: React.FC = () => {
    return (
        <Page>
            <Stack direction="column" alignItems='center' >
                <Typography variant="h1" mt="32.0rem">YAHT</Typography>
                <Typography variant="h3" mt="0.8rem">Ваш контентый генератор</Typography>
                <Link to="/generation">
                    <Button
                        variant="contained"
                        sx={{ marginTop: '2.0rem' }}
                    >
                        <Typography variant="button">
                            Попробовать
                        </Typography>
                    </Button>
                </Link>
            </Stack>
        </Page>
    );
};
