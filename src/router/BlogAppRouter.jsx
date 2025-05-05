import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";

export const BlogAppRouter = () => {
    return (
        <>
            <Navbar />
            <main className="p-4 max-w-4xl mx-auto">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts/:slug" element={<h1>Posts</h1>} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </main>
        </>
    );
};
