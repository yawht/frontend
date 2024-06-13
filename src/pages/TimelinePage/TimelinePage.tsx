import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Page } from "../../components/Page/Page";
import { api } from "../../api";
import { ImagePreview } from "../../components/ImageUpload/ImagePreview";
import { Link } from "react-router-dom";

interface AccordionItemProps {
    generation: API.Generation;
}

const IMAGE_SIDE = "20.0rem";

const formatUnit = (unit: number) => unit < 10 ? `0${unit}` : `${unit}`;

const AccordionItem: React.FC<AccordionItemProps> = ({ generation }) => {
    const rightText = React.useMemo(() => {
        if (!generation.started_at) {
            return "..."
        }

        const date = new Date(generation.started_at);

        return `${formatUnit(date.getDay())}.${formatUnit(date.getMonth())} ${date.getHours()}:${formatUnit(date.getMinutes())}`;
    }, [generation.started_at]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" justifyContent="space-between" width="100%">
                    <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '60%' }}>
                        {generation.description || generation.uid}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', textAlign: "right" }}>
                        {rightText}
                    </Typography>
                </Stack>

            </AccordionSummary>
            <Link to={`/generation/${generation.uid}`}>
                <AccordionDetails sx={{ cursor: "pointer" }}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Box height={IMAGE_SIDE} width={IMAGE_SIDE}>
                            <ImagePreview src={generation.input_image_link} />
                        </Box>
                        <Stack direction='row' spacing={2}>
                            {generation.results.length === 0 &&
                                <Box height={IMAGE_SIDE} width={IMAGE_SIDE}>
                                    <ImagePreview />
                                </Box>
                            }
                            {generation.results.length !== 0 && generation.results.map(result => (
                                <Box key={result.uid} height={IMAGE_SIDE} width={IMAGE_SIDE}>
                                    <ImagePreview key={result.uid} src={result.image_link} />
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </AccordionDetails>
            </Link>
        </Accordion>
    );
}

export const TimelinePage: React.FC = () => {
    const { data } = useQuery({
        queryKey: ['generations'],
        queryFn: () => api.fetch<API.Generation[]>('/generations'),
    });

    return (
        <Page>
            {(data || []).map((generation) => (
                <AccordionItem key={generation.uid} generation={generation} />
            ))}
        </Page>
    );
};
