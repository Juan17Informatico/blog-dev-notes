import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const categories = [
    {
        id: "frontend",
        name: "Frontend",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    {
        id: "backend",
        name: "Backend",
        color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    {
        id: "devops",
        name: "DevOps",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    {
        id: "design",
        name: "Diseño",
        color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
};

export const CategoryPage = () => {
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        document.title = "Categorías | Blog Dev";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                    <NavLink to="/" className="hover:underline">
                        Inicio
                    </NavLink>
                    <span className="mx-2">{">"}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Categorías</span>
                </div>

                {/* Encabezado */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-4 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300">
                        Explora el contenido
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Categorías
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        Encuentra artículos organizados por áreas de conocimiento.
                    </p>
                </motion.div>

                {/* Barra de categorías */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    {categories.map((cat, i) => (
                        <motion.div key={cat.id} variants={fadeInUp} custom={i}>
                            <NavLink
                                to={`/categoria/${cat.id}`}
                                onMouseEnter={() => setHovered(cat.id)}
                                onMouseLeave={() => setHovered(null)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 dark:shadow-black/20 ${cat.color}`}
                            >
                                {cat.name}
                                <ChevronRight
                                    className={`w-4 h-4 transition-transform duration-300 ${
                                        hovered === cat.id ? "translate-x-1" : ""
                                    }`}
                                />
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Placeholder para contenido de categoría */}
                <motion.div
                    className="text-center text-gray-500 dark:text-gray-400 italic"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    custom={categories.length + 1}
                >
                    Selecciona una categoría para ver los artículos relacionados.
                </motion.div>
            </div>
        </div>
    );
};
