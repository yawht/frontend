import React from "react";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from "@mui/material";

import './style.css';
import { ImagePreview } from "./ImagePreview";

const accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg'],
};

export const ImageUpload: React.FC = () => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isFileDialogActive,
        isDragReject,
    } = useDropzone({
        accept,
        maxFiles: 1
    });

    const file = acceptedFiles[0];

    const classNames = ['image-upload__dropzone'];
    if (isDragReject) {
        classNames.push('image-upload__dropzone--reject');
    } else if (isDragActive || isFileDialogActive) {
        classNames.push('image-upload__dropzone--active');
    } 

    return (
        <Box component="section" className="container">
            <div {...getRootProps({ className: classNames.join(" ") })} >
                <input {...getInputProps()} />
                {file && <ImagePreview image={file} />}
                {!file && <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                }}>
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
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="caption" mt="0.8rem">
                            Или перетащите его в поле
                        </Typography>
                        {isDragReject && <Typography variant="caption">
                            Доступные форматы: {Object.values(accept).flatMap(id => id)}
                        </Typography>}
                    </Box>
                </Box>}
            </div>
        </Box>
    );
};
