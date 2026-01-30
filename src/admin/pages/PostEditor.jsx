import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostBySlug, updatePost } from '../../services/postService';

export const PostEditor = () => {
    const { slug } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            setLoading(true);
            fetchPostBySlug(slug).then((post) => {
                setTitle(post.title || '');
                setContent(post.content || post.body || '');
                setCategory(post.category || '');
            }).catch(() => {}).finally(() => setLoading(false));
        }
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = { title, content, category };
            if (slug) {
                await updatePost(slug, postData);
            } else {
                await createPost(postData);
            }
            navigate('/admin/posts');
        } catch (err) {
            // error handled in services
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{slug ? 'Edit Post' : 'New Post'}</h2>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
                    <div>
                        <label className="block text-sm mb-1">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Category</label>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded h-40" />
                    </div>

                    <div>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PostEditor;
