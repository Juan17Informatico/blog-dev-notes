import fm from 'front-matter';

const files = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default'
});

// 👉 Adaptación para cargar un post individual
export const loadPost = async (slug) => {
    const matchedFile = Object.keys(files).find(path => path.endsWith(`${slug}.md`));

    if (matchedFile) {
        // Si está disponible como módulo
        const resolver = files[matchedFile];
        const rawContent = await resolver();
        const { attributes, body } = fm(rawContent);

        return {
            ...attributes,
            slug,
            content: body,
        };
    } else {
        // Si está en /public/posts
        try {
            const res = await fetch(`/posts/${slug}.md`);
            if (!res.ok) throw new Error(`No se pudo cargar el post: ${slug}`);

            const rawContent = await res.text();
            const { attributes, body } = fm(rawContent);

            return {
                ...attributes,
                slug,
                content: body,
            };
        } catch (error) {
            throw new Error("Error al cargar el post: " + error.message);
        }
    }
};

// 👉 Adaptación para cargar todos los posts
export const loadAllPosts = async () => {
    if (Object.keys(files).length > 0) {
        // Si están disponibles como módulos (carpeta src)
        const posts = await Promise.all(
            Object.entries(files).map(async ([path, resolver]) => {
                const rawContent = await resolver();
                const { attributes, body } = fm(rawContent);

                return {
                    ...attributes,
                    content: body,
                    slug: path.split('/').pop().replace('.md', ''),
                    id: crypto.randomUUID(),
                };
            })
        );

        return posts;
    } else {
        // Si están en public/posts
        // 👉 Aquí deberías tener un "índice" con los nombres de los posts, por ejemplo un posts.json en public
        try {
            const res = await fetch('/posts/posts.json');
            if (!res.ok) throw new Error('No se pudo cargar la lista de posts');

            const fileNames = await res.json();

            const posts = await Promise.all(
                fileNames.map(async (fileName) => {
                    const response = await fetch(`/posts/${fileName}`);
                    const rawContent = await response.text();

                    const { attributes, body } = fm(rawContent);

                    return {
                        ...attributes,
                        content: body,
                        slug: fileName.replace('.md', ''),
                        id: crypto.randomUUID(),
                    };
                })
            );

            return posts;
        } catch (error) {
            throw new Error('Error al cargar la lista de posts: ' + error.message);
        }
    }
};
