import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex gap-6 items-center sticky top-0 z-50">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-800"
                }
            >
                Inicio
            </NavLink>

            <NavLink
                to="/projects"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-800"
                }
            >
                Proyectos
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-800"
                }
            >
                Sobre mi
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-800"
                }
            >
                Contacto
            </NavLink>
        </nav>
    );
};
