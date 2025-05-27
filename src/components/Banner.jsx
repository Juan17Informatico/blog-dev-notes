export const Banner = () => {
  return (
    <section className="bg-white py-12 rounded-xl shadow-md mb-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">

        {/* Texto del banner */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenido a JuanCaTech
          </h1>
          <p className="text-lg text-gray-600">
            Explora artículos, tutoriales y noticias sobre tecnología, ciencia e informática.
            Todo desde una perspectiva personal y práctica.
          </p>
        </div>

        {/* Imagen ilustrativa */}
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/400x250?text=Tech+Blog"
            alt="Banner ilustrativo del blog"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};
