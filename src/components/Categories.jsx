import {
  Code,
  Bot,
  Gamepad2,
  Cpu,
  FolderKanban,
  BookOpenCheck,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useCategories } from "../hooks/useApi";

// const categoryList = [
//   {
//     name: "Frontend",
//     icon: Code,
//     color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
//   },
//   {
//     name: "Inteligencia Artificial",
//     icon: Bot,
//     color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
//   },
//   {
//     name: "Backend",
//     icon: Gamepad2,
//     color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
//   },
//   {
//     name: "Cultura Tech",
//     icon: Cpu,
//     color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
//   },
//   {
//     name: "Proyectos",
//     icon: FolderKanban,
//     color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
//   },
//   {
//     name: "Tutoriales",
//     icon: BookOpenCheck,
//     color: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
//   },
// ];

export const Categories = () => {
  const { categories, loading, error, loadCategories } = useCategories();
  const color = useRef("bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300");

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-pink-100 text-yellow-800 rounded-full text-sm font-medium mb-4 dark:from-yellow-900 dark:to-pink-900 dark:text-yellow-300">
          Explora por temática
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 dark:text-white">
          Categorías
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Cargando categorías...</p>
          ) : error ? (
            <p className="text-red-500 dark:text-red-400">Error: {error}</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No hay categorías disponibles</p>
          ) : (
            categories.map((cat, index) => {
              // Manejar categorías como string o como objeto
              const categoryName = typeof cat === 'string' ? cat : cat?.name;
              const categoryId = typeof cat === 'string' ? cat : cat?.id;
              const Icon = cat?.icon;
              
              return (
                <NavLink
                  key={categoryId || index}
                  to={`/categories/${categoryName}`}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 ${color.current} hover:scale-105`}
                >
                  {Icon && (<Icon className="w-4 h-4" />)}
                  {categoryName}
                </NavLink>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
