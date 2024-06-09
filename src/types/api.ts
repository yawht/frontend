// eslint-disable-next-line @typescript-eslint/no-namespace
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
        started_at: string;
        finished_at?: string;
        metadata: Record<string, string>;

        input_image_link: string;
        input_prompt?: string;

        results: GenerationResult[];
    }
}
