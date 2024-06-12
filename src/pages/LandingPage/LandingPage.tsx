import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

import { Page } from "../../components/Page/Page";

export const LandingPage: React.FC = () => {

    return (
        <Page>
            <Stack direction="column" alignItems='center' >
                <Typography variant="h1" mt="32.0rem">YAHT</Typography>
                <Link to="/generation">
                    <Button
                        variant="contained"
                        sx={{ marginTop: '1.6rem' }}
                    >Попробовать</Button>
                </Link>
            </Stack>
        </Page>
    );
};
