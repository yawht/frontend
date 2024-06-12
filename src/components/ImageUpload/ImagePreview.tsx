import { Box, CircularProgress, Skeleton } from "@mui/material";
import React from "react";

interface ImagePreviewProps {
    spinner?: boolean;
    src: string | undefined;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, spinner }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {!src && <Skeleton variant="rectangular" sx={{
                width: "100%", height: "100%", position: 'absolute'
            }} />}
            {!src && spinner && <CircularProgress sx={{ position: 'absolute' }} />}
            {src && (<img
                src={src}

                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: 'contain',
                }}
            />)}
        </Box>
    );
};
