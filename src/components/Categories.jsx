export const Categories = () => {
  const categoryList = [
    { name: "Web Dev", color: "bg-blue-100 text-blue-700" },
    { name: "IA y Robots", color: "bg-purple-100 text-purple-700" },
    { name: "Juegos", color: "bg-green-100 text-green-700" },
    { name: "Cultura Tech", color: "bg-yellow-100 text-yellow-700" },
    { name: "Proyectos", color: "bg-pink-100 text-pink-700" },
    { name: "Tutoriales", color: "bg-violet-100 text-violet-700" },
  ];

  return (
    <section className="py-20 px-4 bg-white bg-vi">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-pink-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
          Explora por temática
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Categorías
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categoryList.map((cat, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 ${cat.color} hover:scale-105`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
