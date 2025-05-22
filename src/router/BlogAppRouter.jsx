import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";

export const BlogAppRouter = () => {
    return (
        <>
            <Navbar />
            <main className="p-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<h1 className="max-w-4xl mx-auto">About</h1>} />
                    <Route path="*" element={<h1 className="max-w-4xl mx-auto">404 - Página no encontrada</h1>} />
                </Routes>
            </main>
        </>
    );
};
