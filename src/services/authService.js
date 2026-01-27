import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../store/authStore';

/**
 * Servicio de Autenticación
 * Contiene todas las funciones para interactuar con los endpoints de auth
 */

/**
 * Login con email y contraseña
 */
export const login = async (email, password) => {
    const { setLoading, setError, login: storeLogin } = useAuthStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.post('/auth/login', { email, password });
        const { user, token } = response.data.data || response.data;

        storeLogin(user, token);
        return { user, token };
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error logging in';
        setError(errorMessage);
        console.error('Error logging in:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Registro de nuevo usuario
 */
export const register = async (userData) => {
    const { setLoading, setError, login: storeLogin } = useAuthStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.post('/auth/register', userData);
        const { user, token } = response.data.data || response.data;

        storeLogin(user, token);
        return { user, token };
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error registering';
        setError(errorMessage);
        console.error('Error registering:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Logout
 */
export const logout = () => {
    const { logout: storeLogout } = useAuthStore.getState();
    storeLogout();
};

/**
 * Obtiene el perfil del usuario autenticado
 */
export const getProfile = async () => {
    const { setLoading, setError, setUser } = useAuthStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get('/auth/profile');
        const user = response.data.data || response.data;

        setUser(user);
        return user;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching profile';
        setError(errorMessage);
        console.error('Error fetching profile:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Actualiza el perfil del usuario
 */
export const updateProfile = async (userData) => {
    const { setError, setUser } = useAuthStore.getState();
    setError(null);

    try {
        const response = await axiosClient.put('/auth/profile', userData);
        const user = response.data.data || response.data;

        setUser(user);
        return user;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error updating profile';
        setError(errorMessage);
        console.error('Error updating profile:', error);
        throw error;
    }
};

/**
 * Verifica si el token es válido
 */
export const verifyToken = async () => {
    const { setUser, setError } = useAuthStore.getState();
    setError(null);

    try {
        const response = await axiosClient.get('/auth/verify');
        const user = response.data.data || response.data;

        setUser(user);
        return true;
    } catch {
        setError(null);
        return false;
    }
};
