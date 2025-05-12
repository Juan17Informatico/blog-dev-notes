import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const HomePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Toggle para mostrar u ocultar el formulario
    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        title: Yup.string()
            .min(5, "El título debe tener al menos 5 caracteres")
            .required("El título es obligatorio"),
        content: Yup.string()
            .min(20, "El contenido debe tener al menos 20 caracteres")
            .required("El contenido es obligatorio"),
    });

    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold">Bienvenido a mi blog</h1>
            {/* Utiliza el helper loadPosts para cargar las entradas aquí */}
            <p className="mt-4">
                Aquí encontrarás una variedad de artículos sobre diferentes temas.
            </p>
            <p className="mt-2">Explora y disfruta de la lectura.</p>

            {/* Botón para mostrar el formulario */}
            <button
                onClick={toggleForm}
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Agregar nuevo post
            </button>

            {/* Formulario visible solo cuando se hace clic */}
            {isFormVisible && (
                <div className="mt-6 p-6 border rounded shadow-lg bg-white">
                    <h2 className="text-xl font-semibold mb-4">Crear un nuevo post</h2>

                    <Formik
                        initialValues={{
                            title: "",
                            content: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Aquí iría la lógica para enviar el nuevo post
                            console.log("Nuevo post:", values);
                            toggleForm(); // Cerrar el formulario al enviarlo
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Título
                                    </label>
                                    <Field
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Contenido
                                    </label>
                                    <Field
                                        id="content"
                                        name="content"
                                        as="textarea"
                                        rows="4"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="content"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Crear post
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </section>
    );
};
