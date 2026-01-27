import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { usePost } from "../hooks/useApi";

export const Post = () => {
  const { post: slug } = useParams();
  const { post } = usePost(slug);

  if (!post) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <p className="text-gray-500 dark:text-gray-400">Cargando post...</p>
      </div>
    );
  }

  const { title, readTime, difficulty, content } = post;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-lg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {readTime} • {difficulty}
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
