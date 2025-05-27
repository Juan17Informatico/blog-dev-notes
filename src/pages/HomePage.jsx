import { Hero } from "../components/Hero";
import { LatestPosts } from "../components/LatestPosts";
import { Categories } from "../components/Categories";
import { FeaturedProjects } from "../components/FeaturedProjects";
import { AboutMe } from "../components/AboutMe";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";

export const HomePage = () => {
    return (
        <section className="bg-[#F9FAFB] min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Banner />

                <section className="space-y-6">
                    <article className="border border-[#E5E7EB] p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-semibold text-[#1E3A8A] hover:text-[#3B82F6] cursor-pointer">
                            Cómo construir una app moderna con React y Firebase
                        </h2>
                        <p className="text-[#4B5563] mt-2">
                            Un paso a paso para crear una aplicación moderna utilizando React, Firebase y Tailwind CSS.
                        </p>
                        <p className="mt-2 text-sm text-[#10B981] font-medium">
                            Guía práctica
                        </p>
                    </article>

                    <article className="border border-[#E5E7EB] p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-semibold text-[#1E3A8A] hover:text-[#3B82F6] cursor-pointer">
                            Mejores prácticas para organizar proyectos en Vite
                        </h2>
                        <p className="text-[#4B5563] mt-2">
                            Aprende cómo mantener tu código limpio y estructurado cuando trabajas con Vite y React.
                        </p>
                        <p className="mt-2 text-sm text-[#10B981] font-medium">
                            Tips de productividad
                        </p>
                    </article>
                </section>
            </div>
        </section>
    );
};
