import { BrowserRouter } from "react-router-dom";
import { BlogAppRouter } from "./router/BlogAppRouter";

export const BlogApp = () => {
    const saved = localStorage.getItem('theme');

    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    return (
        <BrowserRouter basename="/blog-dev-notes">
            <BlogAppRouter />
        </BrowserRouter>
    );
};
