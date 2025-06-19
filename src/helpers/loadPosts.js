import fm from 'front-matter';

const files = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default'
});

export const loadPost = async (slug) => {
    const filePath = `/src/posts/${slug}.md`;

    try {
        const res = await fetch(filePath);
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
};


export const loadAllPosts = async () => {
    const files = import.meta.glob('../posts/*.md', {
        query: '?raw',
        import: 'default',
    });

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
};