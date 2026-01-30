import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

/**
 * Instancia de Axios configurada
 * Usa VITE_API_URL del .env
 */
export const axiosClient = axios.create({
    baseURL: VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor para agregar token de autenticación (cuando esté disponible)
 */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Interceptor de respuesta para manejo de errores
 */
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('auth_token');
            const { VITE_ADMIN_PATH } = getEnvVariables();
            const loginPath = VITE_ADMIN_PATH ? `/${VITE_ADMIN_PATH}/login` : '/login';
            window.location.href = loginPath;
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
