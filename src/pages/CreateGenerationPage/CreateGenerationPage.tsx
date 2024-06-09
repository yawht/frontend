import React from "react";
import { Box, Button } from "@mui/material";

import { Page } from "../../components/Page/Page";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";

export const CreateGenerationPage: React.FC = () => {
    return (
        <Page>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ImageUpload />
                <Button variant="contained">Сгенерировать!</Button>
            </Box>
        </Page>
    );
}
