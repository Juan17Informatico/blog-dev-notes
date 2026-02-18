import axiosClient from '../api/axiosClient';
import { usePostsStore } from '../store/postsStore';

/**
 * Servicio de Posts
 * Contiene todas las funciones para interactuar con la API de posts
 */

/**
 * Obtiene todos los posts
 */
export const fetchAllPosts = async () => {
    const { setLoading, setError, setPosts } = usePostsStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get('/posts');
        const posts = response.data.data || response.data;
        setPosts(posts);
        return posts;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching posts';
        setError(errorMessage);
        console.error('Error fetching posts:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Obtiene un post individual por slug
 */
export const fetchPostBySlug = async (slug) => {
    const { setLoading, setError, setCurrentPost } = usePostsStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get(`/posts/slug/${slug}`);
        const post = response.data.data || response.data;
        setCurrentPost(post);
        return post;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching post';
        setError(errorMessage);
        console.error('Error fetching post:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Obtiene posts filtrados por categoría
 */
export const fetchPostsByCategory = async (category) => {
    const { setLoading, setError, setPosts } = usePostsStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get(`/posts/category/${category}`);
        const posts = response.data.data || response.data;
        setPosts(posts);
        return posts;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching posts by category';
        setError(errorMessage);
        console.error('Error fetching posts by category:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Obtiene posts paginados
 */
export const fetchPostsPaginated = async (page = 1, limit = 10) => {
    const { setLoading, setError, setPosts } = usePostsStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get('/posts', {
            params: { page, limit },
        });
        const posts = response.data.data || response.data;
        setPosts(posts);
        return {
            posts,
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
        };
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching posts';
        setError(errorMessage);
        console.error('Error fetching posts:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Crea un nuevo post (requiere autenticación)
 */
export const createPost = async (postData) => {
    const { setError } = usePostsStore.getState();
    setError(null);

    try {
        const response = await axiosClient.post('/posts', postData);
        return response.data.data || response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error creating post';
        setError(errorMessage);
        console.error('Error creating post:', error);
        throw error;
    }
};

/**
 * Actualiza un post (requiere autenticación)
 */
export const updatePost = async (id, postData) => {
    const { setError } = usePostsStore.getState();
    setError(null);

    try {
        const response = await axiosClient.put(`/posts/${id}`, postData);
        return response.data.data || response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error updating post';
        setError(errorMessage);
        console.error('Error updating post:', error);
        throw error;
    }
};

/**
 * Elimina un post (requiere autenticación)
 */
export const deletePost = async (id) => {
    const { setError } = usePostsStore.getState();
    setError(null);

    try {
        const response = await axiosClient.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error deleting post';
        setError(errorMessage);
        console.error('Error deleting post:', error);
        throw error;
    }
};
