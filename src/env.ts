interface Env {
    BACKEND_HOST?: string;
}

export const env: Env = {
    BACKEND_HOST: process.env.REACT_APP_BACKEND_HOST,
};

if (!env.BACKEND_HOST) {
    throw new Error('REACT_APP_BACKEND_HOST was not set');
}

if (env.BACKEND_HOST.endsWith('/')) {
    throw new Error('REACT_APP_BACKEND_HOST should not end with `/`.');
}
