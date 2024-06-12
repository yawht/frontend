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

const AccordionItem: React.FC<AccordionItemProps> = ({ generation }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {generation.description || generation.uid}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
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
