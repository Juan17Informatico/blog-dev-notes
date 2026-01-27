import { useEffect, useCallback } from 'react';
import { usePostsStore } from '../store/postsStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { fetchAllPosts, fetchPostBySlug } from '../services/postService';
import { fetchAllCategories } from '../services/categoriesService';

/**
 * Hook personalizado para cargar y gestionar posts
 * Utiliza el store de Zustand y los servicios de API
 */
export const usePosts = () => {
    const { posts, filteredPosts, currentPost, loading, error, setPosts, filterByCategory } = usePostsStore();

    const loadPosts = useCallback(async () => {
        try {
            await fetchAllPosts();
        } catch (err) {
            console.error('Error loading posts:', err);
        }
    }, []);

    return {
        posts,
        filteredPosts,
        currentPost,
        loading,
        error,
        loadPosts,
        filterByCategory,
        setPosts,
    };
};

/**
 * Hook personalizado para cargar post individual por slug
 */
export const usePost = (slug) => {
    const { currentPost, loading, error } = usePostsStore();

    useEffect(() => {
        if (slug) {
            fetchPostBySlug(slug).catch(console.error);
        }
    }, [slug]);

    return {
        post: currentPost,
        loading,
        error,
    };
};

/**
 * Hook personalizado para categorías
 */
export const useCategories = () => {
    const { categories, loading, error } = useCategoriesStore();

    const loadCategories = useCallback(async () => {
        try {
            await fetchAllCategories();
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    }, []);

    return {
        categories,
        loading,
        error,
        loadCategories,
    };
};
