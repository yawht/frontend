import React from "react";

interface ImagePreviewProps {
    src: string | undefined;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
    return (
        <img
            src={src}

            style={{
                width: "100%",
                height: "100%",
                objectFit: 'contain',
            }}
        />
    );
};
