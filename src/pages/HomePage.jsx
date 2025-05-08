export const HomePage = () => {
    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold">Bienvenido a mi blog</h1>
            {/* Utiliza el helper loadPosts para cargar las entradas aquí */}
            <p className="mt-4">Aquí encontrarás una variedad de artículos sobre diferentes temas.</p>
            <p className="mt-2">Explora y disfruta de la lectura.</p>
        </section>
    );
};
