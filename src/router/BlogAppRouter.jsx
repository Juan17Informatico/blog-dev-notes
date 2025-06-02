import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";
import { AboutMe } from "../components/AboutMe";
import { Footer } from "../components/Footer";
import { Post } from "../components/Post";

export const BlogAppRouter = () => {
    return (
        <>
            <Navbar />
            <main className="p-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/post/:post" element={<Post />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};
