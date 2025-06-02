import { useState } from "react";
import { useParams } from "react-router-dom";

const postDummy = {
  id: 1,
  title: 'La revolución de la Inteligencia Artificial en el desarrollo de software',
  date: '2025-06-01',
  author: 'Juan Catech',
  content: `
      <p>La inteligencia artificial (IA) ha transformado radicalmente la forma en que desarrollamos software. Herramientas como <strong>GitHub Copilot</strong>, <strong>ChatGPT</strong> y plataformas de generación de código asistido permiten a los desarrolladores escribir código más rápido, detectar errores en tiempo real y automatizar tareas repetitivas.</p>

      <h2>Impacto en la productividad</h2>
      <p>Gracias a la IA, los equipos de desarrollo pueden centrarse más en resolver problemas complejos de negocio y menos en tareas mecánicas. Esto se traduce en ciclos de entrega más cortos y una mejor calidad de código.</p>

      <h2>Desafíos éticos</h2>
      <p>Sin embargo, con este avance vienen desafíos, especialmente en torno a la <em>propiedad intelectual</em> del código generado, la <em>transparencia</em> de los algoritmos y la posible <strong>automatización excesiva</strong> que podría desplazar ciertos roles técnicos.</p>

      <p>En resumen, la IA no reemplaza a los desarrolladores, pero potencia enormemente su capacidad para crear soluciones más innovadoras y eficientes.</p>
    `
};

export const Post = () => {
  const { postId } = useParams(); // Obtener el ID del post desde la URL
  const [post, setPost] = useState(postDummy);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // if (loading) return <div className="p-4">Cargando...</div>;
  // if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  // if (!post) return <div className="p-4">Post no encontrado</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        Publicado por <span className="font-medium">{post.author}</span> el {new Date(post.date).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />
      <div className="prose prose-lg dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
