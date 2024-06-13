import React from "react";
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import { ImagePreview } from "./ImagePreview";
import { toBase64 } from "../../lib/file";

import './style.css';

const accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg'],
};

interface ControlledImageUploadProps {
    src: string | undefined;
}

interface UncontrolledImageUploadProps {
    onSrcChange: (image: string | undefined) => void;
    showError?: boolean;
}

export const ImageUploadPreview: React.FC<ControlledImageUploadProps> = ({ src }) => {
    return (
        <Box component="section" className="container">
            <div className="image-upload__dropzone" >
                <ImagePreview src={src} />
            </div>
        </Box>
    );
};

export const ImageUpload: React.FC<UncontrolledImageUploadProps> = ({ onSrcChange, showError }) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isFileDialogActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        accept,
        maxSize: 5 * 1024 * 1024,
        maxFiles: 1,
    });

    const invalidTypeUploaded = fileRejections.some(file => file.errors.some(error => error.code === 'file-invalid-type'));
    const heavyFileUploaded = fileRejections.some(file => file.errors.some(error => error.code === 'file-too-large'));

    const [src, setSrc] = React.useState<string>();
    const file: File | undefined = acceptedFiles[0];
    React.useEffect(() => {
        let effectActive = true;
        if (!file) {
            setSrc("");
            onSrcChange("");
        }
        else {
            toBase64(file).then((base64) => {
                if (!effectActive) {
                    return;
                }
                setSrc(base64);
                onSrcChange(base64);
            })

            return () => {
                effectActive = false;
            };
        }

    }, [file, onSrcChange]);

    const classNames = ['image-upload__dropzone'];
    if (isDragReject || showError || heavyFileUploaded || invalidTypeUploaded) {
        classNames.push('image-upload__dropzone--reject');
    } else if (isDragActive || isFileDialogActive) {
        classNames.push('image-upload__dropzone--active');
    } 

    return (
        <Box component="section" className="container">
            <div {...getRootProps({ className: classNames.join(" ") })} >
                <input {...getInputProps()} />
                {file && <ImagePreview src={src} />}
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
                        <Typography variant="button">
                            Загрузите файл
                        </Typography>
                    </Button>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="caption" mt="0.8rem">
                            Или перетащите его в поле
                        </Typography>
                        {(isDragReject || invalidTypeUploaded) && <Typography variant="caption">
                            Доступные форматы: {Object.values(accept).flatMap(id => id).join(" ")}
                        </Typography>}
                        {heavyFileUploaded && <Typography variant="caption">
                            Максимальный размер 5Mb
                        </Typography>}
                    </Box>
                </Box>}
            </div>
        </Box>
    );
};
