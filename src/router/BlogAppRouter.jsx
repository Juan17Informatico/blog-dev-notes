import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";
import { AboutMe } from "../components/AboutMe";
import { Footer } from "../components/Footer";
import { Post } from "../components/Post";
import { CategoryPage } from "../pages/CategoryPage";

export const BlogAppRouter = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-1 pt-16">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/post/:post" element={<Post />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};
