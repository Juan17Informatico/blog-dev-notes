import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePosts } from "../hooks/useApi";

export const CategoryPage = () => {
    const { category } = useParams();
    const { filteredPosts, loading, error, filterByCategory, loadPosts } = usePosts();

    useEffect(() => {
        // Primero cargar todos los posts si no están cargados
        loadPosts();
    }, [loadPosts]);

    useEffect(() => {
        // Luego filtrar por categoría
        if (category) {
            filterByCategory(category);
        }
    }, [category, filterByCategory]);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Categoría: {category}</h1>
            
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Cargando posts...</p>
            ) : error ? (
                <p className="text-red-500 dark:text-red-400">Error: {error}</p>
            ) : filteredPosts.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No hay posts para esta categoría.</p>
            ) : (
                <div className="grid gap-4">
                    {filteredPosts.map(post => (
                        <div key={post.slug} className="border p-4 rounded-md dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold dark:text-white">{post.title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{post.readTime} • {post.difficulty}</p>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{post.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
