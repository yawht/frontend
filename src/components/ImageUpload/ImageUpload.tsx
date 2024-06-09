import React from "react";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from "@mui/material";

import './style.css';

export const ImageUpload: React.FC = () => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isFileDialogActive
    } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.webkitRelativePath}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <Box component="section" className="container">
            <div {...getRootProps({
                className: isDragActive || isFileDialogActive
                    ? 'image-upload__dropzone image-upload__dropzone--active'
                    : 'image-upload__dropzone'
            })} >
                <input {...getInputProps()} />
                <Box sx={{ flex: 1 }} />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                >
                    Загрузите файл
                </Button>
                <Box sx={{ flex: 1, display: 'flex' }}>
                    <Typography variant="caption" mt="0.8rem">
                        Или перетащите его в поле
                    </Typography>
                </Box>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </Box>
    );
};
