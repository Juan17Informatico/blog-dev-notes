import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const Post = () => {
  const { post: slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // <--- ahora sí existe
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost(slug).then(setPost).catch(console.error);
  }, [slug]);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!post) return <div className="p-4">Post no encontrado</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        {post.category} • {post.readTime} • {post.difficulty}
      </p>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />
      <div className="prose prose-lg dark:prose-invert">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
