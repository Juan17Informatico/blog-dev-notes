export const getEnvVariables = () => {
    const env = import.meta.env;

    return {
        VITE_API: env.VITE_API,
        VITE_API_URL: env.VITE_API_URL || env.VITE_API,
        VITE_ADMIN_PATH: env.VITE_ADMIN_PATH,
    };
}