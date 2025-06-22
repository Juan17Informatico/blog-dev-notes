import { Categories } from "../components/Categories";
import { Banner } from "../components/Banner";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Link, Mail, Users } from "lucide-react";
import { motion } from "framer-motion";
import { loadAllPosts } from "../helpers/loadPosts";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [articles, setArticles] = useState([]);
    const hasLoaded = useRef(false);

    useEffect(() => {
        if(!hasLoaded.current){
            hasLoaded.current = true;
            loadAllPosts().then(setArticles).catch(console.error);
        }
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
        }),
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Banner />
                </motion.div>

                {/* Sección de artículos */}
                <motion.section
                    className="py-16 px-4"
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="max-w-6xl mx-auto">
                        {/* Header de sección */}
                        <motion.div className="text-center mb-16" variants={fadeInUp} custom={0}>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                Últimos artículos
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Contenido destacado
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Artículos cuidadosamente seleccionados sobre las últimas tendencias
                                en tecnología
                            </p>
                        </motion.div>

                        {/* Grid de artículos */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, i) => (
                                <motion.article
                                    key={article.id}
                                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200"
                                    onMouseEnter={() => setHoveredCard(article.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    custom={i + 1}
                                >
                                    {/* Gradiente decorativo */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                                    <div className="p-8">
                                        {/* Categoría y metadata */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${article.categoryColor}`}
                                            >
                                                {article.category}
                                            </span>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <span>{article.readTime}</span>
                                                <span>•</span>
                                                <span>{article.difficulty}</span>
                                            </div>
                                        </div>

                                        {/* Título */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {/* Descripción */}
                                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                            {article.description}
                                        </p>

                                        {/* Call to action */}
                                        <div className="flex items-center justify-between">
                                            <NavLink
                                                to={`/post/${article.slug}`}
                                                className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                                                Leer más
                                                <ChevronRight
                                                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${hoveredCard === article.id
                                                        ? "translate-x-1"
                                                        : ""
                                                        }`}
                                                />
                                            </NavLink>

                                            <div className="flex space-x-2">
                                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                                    <Users className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </motion.article>
                            ))}
                        </div>

                        {/* Call to action final */}
                        <motion.div
                            className="text-center mt-16"
                            variants={fadeInUp}
                            custom={articles.length + 1}
                        >
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                Ver todos los artículos
                            </button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* También puedes animar esto */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={0}
                >
                    <Categories />
                </motion.div>
            </div>
        </>
    );
};
