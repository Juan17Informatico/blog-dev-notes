export const Hero = () => {
    return (
        <section className="p-6 text-center md:text-left max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gray-300 rounded-md animate-pulse md:w-60 md:h-60" />
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                    Tech, Code & Cultura desde un Dev Integral
                </h1>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-[#3B82F6]">
                        Suscríbete
                    </button>
                    <button className="border border-[#1E3A8A] text-[#1E3A8A] px-4 py-2 rounded hover:bg-[#E5E7EB]">
                        Leer más
                    </button>
                </div>
            </div>
        </section>
    );
};
