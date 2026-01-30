import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, fetchCategoryById, updateCategory } from '../../services/categoriesService';

export const CategoryEditor = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchCategoryById(id).then((cat) => {
                setName(cat.name || cat);
            }).catch(() => {}).finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { name };
            if (id) {
                await updateCategory(id, data);
            } else {
                await createCategory(data);
            }
            navigate('/admin/categories');
        } catch (err) {}
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{id ? 'Edit Category' : 'New Category'}</h2>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CategoryEditor;
