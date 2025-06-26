import { Code, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toggleDarkMode } from "../helpers/toggleDarkMode";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const currentTheme = document.documentElement.classList.contains('dark');
        setIsDark(currentTheme);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        setIsDark(!isDark);
    };

    const linkClass =
        "px-3 py-2 rounded-xl font-medium transition-colors duration-300 hover:text-blue-600";
    const activeClass = "text-blue-600";

    const getLinkClass = ({ isActive }) =>
        `${linkClass} ${isActive ? activeClass : "text-gray-700"}`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-xl"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            JuanCaTech
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink to="/" className={getLinkClass}>
                            Inicio
                        </NavLink>
                        <a href="https://www.juancatech.dev" className="text-gray-700" target="_blank" rel="noopener noreferrer">
                            Proyectos
                        </a>
                        <NavLink to="/about" className={getLinkClass}>
                            Sobre mí
                        </NavLink>

                        {/* Botón de Dark Mode */}
                        <button
                            onClick={handleToggleDarkMode}
                            className="ml-4 p-2 rounded-xl transition-colors duration-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="py-4 space-y-2 bg-white/90 backdrop-blur-xl rounded-2xl mx-4 mb-4 shadow-xl border border-gray-200/50">
                        <NavLink to="/" className={getLinkClass}>
                            Inicio
                        </NavLink>
                        <NavLink to="/projects" className={getLinkClass}>
                            Proyectos
                        </NavLink>
                        <NavLink to="/about" className={getLinkClass}>
                            Sobre mí
                        </NavLink>

                        {/* Botón Dark Mode Mobile */}
                        <button
                            onClick={handleToggleDarkMode}
                            className="w-full flex justify-center p-2 rounded-xl transition-colors duration-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
