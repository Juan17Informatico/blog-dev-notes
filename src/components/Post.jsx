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
      <div className="p-8 max-w-3xl mx-auto text-center">
        <div className="inline-block w-48 h-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Cargando post...</p>
      </div>
    );
  }

  const { content } = post;
  
  return (
    <div className="my-8 p-8 md:p-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:bg-gray-100 [&_pre]:text-gray-900 [&_pre]:dark:bg-gray-900 [&_pre]:dark:text-gray-100 [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-gray-100 [&_code]:text-sm [&_code]:dark:bg-gray-700">
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
