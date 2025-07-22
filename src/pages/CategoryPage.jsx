import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadAllPosts } from "../helpers/loadPosts"; // asegúrate que el helper esté aquí

export const CategoryPage = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const all = await loadAllPosts();
            const filtered = all.filter(post => post.category === category);
            setPosts(filtered);
        };

        fetchPosts();
    }, [category]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Categoría: {category}</h1>
            {posts.length === 0 ? (
                <p className="text-gray-600">No hay posts para esta categoría.</p>
            ) : (
                <div className="grid gap-4">
                    {posts.map(post => (
                        <div key={post.slug} className="border p-4 rounded-md">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500">{post.readTime} • {post.difficulty}</p>
                            <p className="mt-2 text-gray-700">{post.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
