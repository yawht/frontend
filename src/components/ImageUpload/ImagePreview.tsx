import React from "react";

interface ImagePreviewProps {
    image: File;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
    const [src, setSrc] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const url = URL.createObjectURL(image);
        setSrc(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [image]);

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
