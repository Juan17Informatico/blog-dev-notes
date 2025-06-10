import fm from 'front-matter';

const files = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default'
});

export const loadPost = async (slug) => {
    const filePath = `/posts/${slug}.md`;

    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`No se pudo cargar el post: ${slug}`);

        const text = await res.text();

        // Extraer metadatos YAML entre los delimitadores ---
        const metaRegex = /^---\n([\s\S]*?)\n---/;
        const match = text.match(metaRegex);

        let metadata = {};
        let content = text;

        if (match) {
            const rawMeta = match[1];
            content = text.replace(metaRegex, "").trim();

            rawMeta.split("\n").forEach((line) => {
                const [key, ...rest] = line.split(":");
                if (key && rest.length > 0) {
                    metadata[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
                }
            });
        }

        return {
            ...metadata,
            slug,
            content,
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