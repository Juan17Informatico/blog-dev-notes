import { Code, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion"

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const AboutMe = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50/20 via-white to-purple-50/20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Encabezado */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Sobre mí
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Conoce al desarrollador detrás del blog
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Este es mi espacio personal donde comparto lo que aprendo y construyo como
                        desarrollador frontend. Trabajo principalmente con <strong>React</strong>,{" "}
                        <strong>Vite</strong> y <strong>TailwindCSS</strong>, pero también tengo
                        experiencia sólida en backend con <strong>Laravel</strong> y{" "}
                        <strong>PHP</strong>. El software en general es mi pasión, y cada línea de
                        código es una oportunidad para crecer.
                    </p>
                </motion.div>

                {/* Tarjetas informativas */}
                <div className="grid gap-8 md:grid-cols-3 text-left">
                    {/* ¿Quién soy? */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all"
                    >
                        <User className="text-blue-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Quién soy?</h3>
                        <p className="text-gray-600">
                            Soy un desarrollador de software autodidacta con una profunda pasión por
                            la creación de sistemas útiles, funcionales y bien diseñados. Me impulsa
                            una constante necesidad de aprender y mejorar cada día, tanto en el
                            frontend como en el backend.
                        </p>
                    </motion.div>

                    {/* Stack principal */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all"
                    >
                        <Code className="text-purple-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Stack principal
                        </h3>
                        <p className="text-gray-600">
                            Actualmente trabajo con <strong>React</strong>, <strong>Vite</strong>,{" "}
                            <strong>TailwindCSS</strong>, y en backend utilizo{" "}
                            <strong>Node.js</strong> con <strong>Express</strong>,{" "}
                            <strong>PostgreSQL</strong> y <strong>Prisma</strong> para mis proyectos
                            personales. En proyectos reales, desarrollo con <strong>Laravel</strong>{" "}
                            y <strong>PHP</strong>. Mi enfoque principal es el frontend, pero tengo
                            una visión integral del desarrollo de software.
                        </p>
                    </motion.div>

                    {/* ¿Por qué este blog? */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white border border-gray-100 rounded-3xl p-6 shadow hover:shadow-md transition-all"
                    >
                        <Sparkles className="text-pink-600 w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            ¿Por qué este blog?
                        </h3>
                        <p className="text-gray-600">
                            Porque creo firmemente que compartir el proceso de aprendizaje fortalece
                            el crecimiento. Aquí encontrarás guías, notas técnicas, reflexiones y
                            experimentos sobre desarrollo de software, inteligencia artificial,
                            videojuegos y tecnología en general.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
