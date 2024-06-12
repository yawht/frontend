interface Env {
    BACKEND_HOST?: string;
}

export const env: Env = {
    BACKEND_HOST: import.meta.env.VITE_BACKEND_HOST,
};

if (!env.BACKEND_HOST) {
    throw new Error('VITE_BACKEND_HOST was not set');
}

if (env.BACKEND_HOST.endsWith('/')) {
    throw new Error('VITE_BACKEND_HOST should not end with `/`.');
}
