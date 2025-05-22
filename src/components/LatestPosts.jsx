const posts = [
    { title: "Domina React desde cero", category: "Web Dev" },
    { title: "¿Qué es la IA explicada fácil?", category: "IA/Robots" },
    { title: "Top 5 juegos indie del año", category: "Juegos" },
];

export const LatestPosts = () => {
    return (
        <section className="p-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Últimos artículos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {posts.map((post, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-[#1E293B] p-4 rounded shadow"
                    >
                        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <p className="text-sm text-[#4B5563] dark:text-[#94A3B8]">
                            {post.category}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
