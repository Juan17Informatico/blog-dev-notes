import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { loadPost } from "../helpers/loadPosts";
import rehypeRaw from "rehype-raw";

export const Post = () => {
  const { post: slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    loadPost(slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-4 text-gray-700 dark:text-gray-300">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500 dark:text-red-400">Error: {error}</div>;
  if (!post) return <div className="p-4 text-gray-700 dark:text-gray-300">Post no encontrado</div>;

  const { title, description, category, categoryColor, readTime, difficulty, content } = post;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-lg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {category} • {readTime} • {difficulty}
      </p>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
