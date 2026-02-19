import { useEffect, useState, useRef, useCallback } from "react";
import { usePosts, useCategories } from "../hooks/useApi";
import { ChevronRight, Mail, Users, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const POSTS_PER_PAGE = 12;

export const AllPostsPage = () => {
    const { posts, loading, error, loadPosts } = usePosts();
    const { categories, loadCategories } = useCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [displayedPostsCount, setDisplayedPostsCount] = useState(POSTS_PER_PAGE);
    const [hoveredCard, setHoveredCard] = useState(null);
    const observerTarget = useRef(null);

    // Cargar posts y categorías
    useEffect(() => {
        loadPosts();
        loadCategories();
    }, [loadPosts, loadCategories]);

    // Filtrar posts basado en búsqueda y categoría
    const filteredPosts = useCallback(() => {
        let result = posts;

        // Filtrar por búsqueda
        if (searchTerm.trim()) {
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (post.description &&
                        post.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filtrar por categoría
        if (selectedCategory) {
            result = result.filter((post) => {
                if (Array.isArray(post.category)) {
                    return post.category.includes(selectedCategory);
                }
                return post.category === selectedCategory;
            });
        }

        return result;
    }, [posts, searchTerm, selectedCategory]);

    const allFilteredPosts = filteredPosts();
    const displayedPosts = allFilteredPosts.slice(0, displayedPostsCount);

    // Infinite scroll usando Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && displayedPostsCount < allFilteredPosts.length) {
                    setDisplayedPostsCount((prev) => prev + POSTS_PER_PAGE);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [displayedPostsCount, allFilteredPosts.length]);

    // Resetear el contador de posts cuando cambian los filtros
    useEffect(() => {
        setDisplayedPostsCount(POSTS_PER_PAGE);
    }, [searchTerm, selectedCategory]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            {/* Header */}
            <motion.section
                className="py-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Todos los artículos
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Explora nuestra completa colección de contenido sobre tecnología y desarrollo
                    </p>
                </div>
            </motion.section>

            {/* Contenido principal */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Búsqueda y filtros */}
                    <motion.div
                        className="mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* Barra de búsqueda */}
                        <div className="relative mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Buscar artículos por título o descripción..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filtro de categorías */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                                Filtrar por categoría
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === null
                                            ? "bg-blue-600 text-white dark:bg-blue-500"
                                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400"
                                    }`}
                                >
                                    Todas las categorías
                                </button>
                                {categories.map((cat, index) => {
                                    const categoryName = typeof cat === "string" ? cat : cat?.name;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedCategory(categoryName)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                                selectedCategory === categoryName
                                                    ? "bg-blue-600 text-white dark:bg-blue-500"
                                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400"
                                            }`}
                                        >
                                            {categoryName}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Resumen de resultados */}
                        {allFilteredPosts.length > 0 && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
                                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{displayedPosts.length}</span> de{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">{allFilteredPosts.length}</span> artículos
                            </p>
                        )}
                    </motion.div>

                    {/* Grid de artículos */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading && (
                            <div className="col-span-full text-center py-16">
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mt-4">Cargando artículos...</p>
                            </div>
                        )}

                        {!loading && error && (
                            <div className="col-span-full text-center py-16">
                                <p className="text-red-500 dark:text-red-400 text-lg">Error: {error}</p>
                            </div>
                        )}

                        {!loading && displayedPosts.length === 0 && (
                            <div className="col-span-full text-center py-16">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    {searchTerm || selectedCategory
                                        ? "No hay artículos que coincidan con tu búsqueda"
                                        : "No hay artículos disponibles"}
                                </p>
                            </div>
                        )}

                        {displayedPosts.map((article, i) => {
                            const categoryName =
                                typeof article.category === "string"
                                    ? article.category
                                    : article.category?.name || "Sin categoría";

                            return (
                                <motion.article
                                    key={article.id}
                                    className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
                                    onMouseEnter={() => setHoveredCard(article.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    custom={i % POSTS_PER_PAGE}
                                >
                                    {/* Gradiente decorativo */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                                    <div className="p-8">
                                        {/* Categoría y metadata */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.categoryColor}`}>
                                                {categoryName}
                                            </span>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                                <span>{article.readTime}</span>
                                                <span>•</span>
                                                <span>{article.difficulty}</span>
                                            </div>
                                        </div>

                                        {/* Título */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {/* Descripción */}
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                                            {article.description}
                                        </p>

                                        {/* Call to action */}
                                        <div className="flex items-center justify-between">
                                            <NavLink
                                                to={`/post/${article.slug}`}
                                                className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                                            >
                                                Leer más
                                                <ChevronRight
                                                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                                                        hoveredCard === article.id ? "translate-x-1" : ""
                                                    }`}
                                                />
                                            </NavLink>

                                            <div className="flex space-x-2">
                                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                    <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                </button>
                                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                    <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Infinite scroll observer */}
                    {!loading && displayedPostsCount < allFilteredPosts.length && (
                        <div ref={observerTarget} className="flex justify-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                <p className="text-gray-500 dark:text-gray-400">Cargando más artículos...</p>
                            </div>
                        </div>
                    )}

                    {/* Mensaje cuando se alcanza el final */}
                    {!loading && displayedPostsCount >= allFilteredPosts.length && allFilteredPosts.length > 0 && (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-gray-500 dark:text-gray-400">
                                Has alcanzado el final de los artículos
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};
