import fm from 'front-matter';

const files = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default'
});

export const loadPost = async (slug) => {
    const content = await import(`../posts/${slug}.md?raw`);
    const { attributes, body } = fm(content.default);

    return {
        ...attributes,
        slug,
        content: body,
    };
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