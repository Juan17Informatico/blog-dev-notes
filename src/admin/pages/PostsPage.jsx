import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllPosts, deletePost } from '../../services/postService';
import { usePostsStore } from '../../store/postsStore';

export const PostsPage = () => {
    const { posts, loading, error, setPosts } = usePostsStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllPosts().then((fetched) => {
            // postsStore updated by service
        }).catch(() => {});
    }, []);

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deletePost(slug);
            await fetchAllPosts();
        } catch (err) {}
    };

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Posts</h2>
                <div>
                    <Link to="new" className="px-3 py-1 bg-blue-600 text-white rounded">New Post</Link>
                </div>
            </header>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            <div className="space-y-3">
                {(posts || []).map((post) => (
                    <div key={post.slug} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center">
                        <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-100">{post.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{post.slug}</div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => navigate(`posts/${post.slug}/edit`)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(post.slug)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
