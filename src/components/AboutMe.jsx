import { Code, Sparkles, User } from "lucide-react";

export const AboutMe = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50/20 via-white to-purple-50/20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Encabezado */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                    Sobre mí
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Conoce al desarrollador detrás del blog
                </h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    Este blog es mi espacio personal donde comparto lo que aprendo mientras
                    desarrollo con React, TailwindCSS y otras tecnologías modernas. Escribo para no
                    olvidar, para compartir y para crecer junto a otros desarrolladores.
                </p>

                {/* Tarjetas informativas */}
                <div className="grid gap-8 md:grid-cols-3 text-left">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all">
                        <User className="text-blue-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Quién soy?</h3>
                        <p className="text-gray-600">
                            Soy un desarrollador web autodidacta, con pasión por la creación de
                            interfaces limpias y funcionales. Siempre estoy buscando nuevas formas
                            de mejorar mis habilidades.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all">
                        <Code className="text-purple-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Stack principal
                        </h3>
                        <p className="text-gray-600">
                            Trabajo principalmente con React, Vite y TailwindCSS en el frontend.
                            Actualmente estoy explorando Node.js, Express y Prisma para el backend.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all">
                        <Sparkles className="text-pink-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            ¿Por qué este blog?
                        </h3>
                        <p className="text-gray-600">
                            Porque creo que compartir el proceso de aprendizaje fortalece el
                            conocimiento. Aquí escribo guías, notas, experimentos y reflexiones
                            sobre desarrollo web moderno.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
