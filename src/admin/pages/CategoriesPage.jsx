import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCategories, deleteCategory } from '../../services/categoriesService';
import { useCategoriesStore } from '../../store/categoriesStore';

export const CategoriesPage = () => {
    const { categories, loading, error } = useCategoriesStore();

    useEffect(() => {
        fetchAllCategories().catch(() => {});
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await deleteCategory(id);
            await fetchAllCategories();
        } catch (err) {}
    };

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <div>
                    <Link to="new" className="px-3 py-1 bg-blue-600 text-white rounded">New Category</Link>
                </div>
            </header>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            <div className="space-y-2">
                {(categories || []).map((cat) => (
                    <div key={cat.id || cat} className="p-3 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center">
                        <div className="text-gray-800 dark:text-gray-100">{cat.name || cat}</div>
                        <div className="space-x-2">
                            <Link to={`${cat.id || cat}/edit`} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</Link>
                            <button onClick={() => handleDelete(cat.id || cat)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
