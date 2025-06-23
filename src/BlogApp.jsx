import { BrowserRouter } from "react-router-dom";
import { BlogAppRouter } from "./router/BlogAppRouter";

export const BlogApp = () => {
    return (
        <BrowserRouter basename="/blog-dev-notes">
            <BlogAppRouter />
        </BrowserRouter>
    );
};
