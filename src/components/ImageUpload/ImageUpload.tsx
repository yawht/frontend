import React from "react";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';
import { Box, Button } from "@mui/material";

import './style.css';

export const ImageUpload: React.FC = () => {
    const { acceptedFiles, getRootProps, getInputProps, isFocused } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.webkitRelativePath}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <Box component="section" className="container">
            <div {...getRootProps({
                className: isFocused
                    ? 'image-upload__dropzone image-upload__dropzone--active'
                    : 'image-upload__dropzone'
            })} >
                <input {...getInputProps()} />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                >
                    Upload file
                </Button>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </Box>
    );
};
