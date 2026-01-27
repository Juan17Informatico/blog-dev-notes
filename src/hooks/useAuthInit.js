import { useEffect } from 'react';
import { verifyToken } from '../services/authService';
import { useAuthStore } from '../store/authStore';

/**
 * Hook para inicializar autenticación al cargar la aplicación
 * Verifica si hay token válido en localStorage
 */
export const useAuthInit = () => {
    const { token, setLoading, setError } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                setLoading(true);
                try {
                    await verifyToken();
                } catch (err) {
                    console.error('Token verification failed:', err);
                    setError('Token inválido o expirado');
                } finally {
                    setLoading(false);
                }
            }
        };

        initAuth();
    }, [token, setLoading, setError]);
};
