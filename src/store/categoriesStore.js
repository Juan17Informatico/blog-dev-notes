import { create } from 'zustand';

/**
 * Store de Categorías
 * Maneja el estado global de categorías
 */
export const useCategoriesStore = create((set) => ({
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,

    // Acciones
    setCategories: (categories) => set({ categories }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    /**
     * Añade una nueva categoría
     */
    addCategory: (category) =>
        set((state) => ({
            categories: [...new Set([...state.categories, category])],
        })),

    /**
     * Elimina una categoría
     */
    removeCategory: (category) =>
        set((state) => ({
            categories: state.categories.filter((cat) => cat !== category),
        })),

    /**
     * Limpia las categorías y estado
     */
    clearCategories: () =>
        set({
            categories: [],
            selectedCategory: null,
            error: null,
        }),

    clearError: () => set({ error: null }),
}));
