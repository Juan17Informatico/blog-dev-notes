import { create } from 'zustand';

/**
 * Store de Posts
 * Maneja el estado global de posts (lista, filtrado, detalles)
 */
export const usePostsStore = create((set) => ({
    posts: [],
    currentPost: null,
    filteredPosts: [],
    loading: false,
    error: null,

    // Acciones
    setPosts: (posts) => set({ posts, filteredPosts: posts }),
    
    setCurrentPost: (post) => set({ currentPost: post }),

    setLoading: (loading) => set({ loading }),
    
    setError: (error) => set({ error }),

    /**
     * Filtra posts por categoría
     */
    filterByCategory: (category) =>
        set((state) => {
            const categoryName = typeof category === 'string' ? category : category?.name;
            return {
                filteredPosts: state.posts.filter((post) => {
                    if (Array.isArray(post.category)) {
                        return post.category.includes(categoryName);
                    }
                    return post.category === categoryName;
                }),
            };
        }),

    /**
     * Filtra posts por búsqueda de texto
     */
    filterBySearch: (searchTerm) =>
        set((state) => ({
            filteredPosts: state.posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
            ),
        })),

    /**
     * Obtiene post por slug
     */
    getPostBySlug: (slug) =>
        set((state) => ({
            currentPost: state.posts.find((post) => post.slug === slug) || null,
        })),

    /**
     * Limpia los posts almacenados
     */
    clearPosts: () => set({ posts: [], filteredPosts: [], currentPost: null, error: null }),

    clearError: () => set({ error: null }),
}));
