import { BrowserRouter } from "react-router-dom";
import { BlogAppRouter } from "./router/BlogAppRouter";

export const BlogApp = () => {
    return (
        <BrowserRouter>
            <BlogAppRouter />
        </BrowserRouter>
    );
};
