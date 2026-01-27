import axiosClient from '../api/axiosClient';
import { useCategoriesStore } from '../store/categoriesStore';

/**
 * Servicio de Categorías
 * Contiene todas las funciones para interactuar con la API de categorías
 */

/**
 * Obtiene todas las categorías
 */
export const fetchAllCategories = async () => {
    const { setLoading, setError, setCategories } = useCategoriesStore.getState();
    setLoading(true);
    setError(null);

    try {
        const response = await axiosClient.get('/categories');
        const categories = response.data.data || response.data;
        setCategories(categories);
        return categories;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching categories';
        setError(errorMessage);
        console.error('Error fetching categories:', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

/**
 * Obtiene una categoría por ID
 */
export const fetchCategoryById = async (id) => {
    const { setError } = useCategoriesStore.getState();
    setError(null);

    try {
        const response = await axiosClient.get(`/categories/${id}`);
        return response.data.data || response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching category';
        setError(errorMessage);
        console.error('Error fetching category:', error);
        throw error;
    }
};

/**
 * Crea una nueva categoría (requiere autenticación)
 */
export const createCategory = async (categoryData) => {
    const { setError, addCategory } = useCategoriesStore.getState();
    setError(null);

    try {
        const response = await axiosClient.post('/categories', categoryData);
        const category = response.data.data || response.data;

        addCategory(category.name || category);
        return category;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error creating category';
        setError(errorMessage);
        console.error('Error creating category:', error);
        throw error;
    }
};

/**
 * Actualiza una categoría (requiere autenticación)
 */
export const updateCategory = async (id, categoryData) => {
    const { setError } = useCategoriesStore.getState();
    setError(null);

    try {
        const response = await axiosClient.put(`/categories/${id}`, categoryData);
        return response.data.data || response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error updating category';
        setError(errorMessage);
        console.error('Error updating category:', error);
        throw error;
    }
};

/**
 * Elimina una categoría (requiere autenticación)
 */
export const deleteCategory = async (id) => {
    const { setError, removeCategory } = useCategoriesStore.getState();
    setError(null);

    try {
        const response = await axiosClient.delete(`/categories/${id}`);
        removeCategory(id);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error deleting category';
        setError(errorMessage);
        console.error('Error deleting category:', error);
        throw error;
    }
};
