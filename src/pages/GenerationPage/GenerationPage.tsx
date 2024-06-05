import React from "react";
import { useParams } from 'react-router-dom';

import { Page } from "../../components/Page/Page";

export const GenerationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page>
            {'generation/' + id}
        </Page>
    );
}
