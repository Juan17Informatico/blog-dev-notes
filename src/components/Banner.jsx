import { ChevronRight, Zap } from "lucide-react";
import { useState } from "react";

export const Banner = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <section className="relative overflow-hidden pt-24 pb-16">
            {/* Background con gradiente animado */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-40 animate-bounce" />
            <div
                className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-50"
                style={{ animationDelay: "1s" }}
            />

            <div className="relative max-w-6xl mx-auto px-4" onMouseMove={handleMouseMove}>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Contenido principal */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
                                <Zap className="w-4 h-4 mr-2" />
                                Tecnología • Innovación • Código
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold">
                                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                    Bienvenido a
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    JuanCaTech
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                                Explora el futuro de la tecnología a través de artículos profundos,
                                tutoriales prácticos y análisis de las últimas tendencias en
                                desarrollo y ciencia de datos.
                            </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="flex items-center justify-center">
                                    Explorar Artículos
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1 transition-all duration-300">
                                Ver Proyectos
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">50+</div>
                                <div className="text-sm text-gray-600">Artículos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">15k+</div>
                                <div className="text-sm text-gray-600">Lectores</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">25+</div>
                                <div className="text-sm text-gray-600">Proyectos</div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen/Ilustración */}
                    <div className="flex-1 relative">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
                                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                                    <div className="grid grid-cols-3 gap-4 p-8">
                                        <div className="h-20 bg-blue-200 rounded-xl animate-pulse" />
                                        <div
                                            className="h-20 bg-purple-200 rounded-xl animate-pulse"
                                            style={{ animationDelay: "0.5s" }}
                                        />
                                        <div
                                            className="h-20 bg-indigo-200 rounded-xl animate-pulse"
                                            style={{ animationDelay: "1s" }}
                                        />
                                        <div
                                            className="h-20 bg-pink-200 rounded-xl animate-pulse"
                                            style={{ animationDelay: "1.5s" }}
                                        />
                                        <div
                                            className="h-20 bg-cyan-200 rounded-xl animate-pulse"
                                            style={{ animationDelay: "2s" }}
                                        />
                                        <div
                                            className="h-20 bg-emerald-200 rounded-xl animate-pulse"
                                            style={{ animationDelay: "2.5s" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
