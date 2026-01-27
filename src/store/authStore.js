import { create } from 'zustand';

/**
 * Store de Autenticación
 * Maneja el estado de login y datos del usuario
 */
export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
    isAuthenticated: !!localStorage.getItem('auth_token'),
    loading: false,
    error: null,

    // Acciones
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    
    setToken: (token) => {
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
        }
        set({ token, isAuthenticated: !!token });
    },

    setLoading: (loading) => set({ loading }),
    
    setError: (error) => set({ error }),
    
    login: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({
            user,
            token,
            isAuthenticated: true,
            error: null,
            loading: false,
        });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
            loading: false,
        });
    },

    clearError: () => set({ error: null }),
}));
