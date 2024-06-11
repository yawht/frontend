import React from "react";
import { useParams } from 'react-router-dom';

import { Page } from "../../components/Page/Page";
import { ImageList, ImageListItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { delay } from "../../lib/promise";

const RUBY = 'https://cdn.discordapp.com/attachments/497421344644923402/1249438647183474750/S6y4NQcxVKA.jpg?ex=66674dea&is=6665fc6a&hm=948750d52338a90be2a1bb5c471a9941e515b84cf55d4f177224d250755dc0e8&';

export const GenerationPage: React.FC = () => {
    const uid = useParams<{ id: string }>().id || '';

    const { data } = useQuery({
        queryKey: ['generation', uid],
        queryFn: () => {
            return delay(3000).then<API.Generation>(() => ({
                status: 'in_progress',
                uid: uid,
                metadata: {},
                input_image_link: RUBY,
                started_at: new Date().toISOString(),
                input_prompt: "asdasd",
                results: [{
                    uid: "1",
                    image_link: RUBY,
                    finished_at: new Date().toISOString(),
                    started_at: new Date().toISOString(),
                }]
            }))
        },
        initialData: undefined,
    });

    return (
        <Page>
            {data && <ImageList cols={2} rowHeight='auto' gap={4}>
                {data.results.map((result) => (
                    <ImageListItem key={result.uid}>
                        {result.image_link && (
                            <img
                                srcSet={`${result.image_link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${result.image_link}?w=164&h=164&fit=crop&auto=format`}
                                loading="lazy"
                            />
                        )}
                    </ImageListItem>
                ))}
            </ImageList>}
        </Page>
    );
};
