export const loadPosts = async () => {
    const files = import.meta.glob("../posts/*.md", { as: "raw" });

    const posts = [];

    for (const path in files) {
        const slug = path.split("/").pop().replace(".md", "");
        const rawContent = await files[path]();
        const { data, content } = matter(rawContent);

        posts.push({
            slug,
            content,
            ...data, // title, date, tags
        });
    }

    // Ordenamos por fecha descendente
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
