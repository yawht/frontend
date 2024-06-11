declare namespace API {
    type Status = 'created' | 'in_progress' | 'finished' | 'failed';

    interface GenerationResult {
        uid: string;
        started_at: string;
        finished_at: string;

        error?: string;
        image_link?: string;
    }

    interface Generation {
        uid: string;
        status: Status;
        started_at: string | null;
        finished_at?: string;
        metadata: Record<string, string>;

        input_image_link: string;
        input_prompt: string | null;

        results: GenerationResult[];
    }

    interface ValidationError {
        detail: Array<{
            loc: (number | string)[];
            msg: string;
            type: string;
        }>
    }
}

declare namespace POST {
    interface LaunchGeneration {
        input_image: string;
        input_prompt: string | null;
    }
}
