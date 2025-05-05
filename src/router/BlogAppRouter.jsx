import { Route, Routes } from "react-router-dom";

export const BlogAppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/posts/:slug" element={<h1>Posts</h1>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
};
