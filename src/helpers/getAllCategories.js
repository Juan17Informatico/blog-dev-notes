import { loadAllPosts } from "./loadPosts";

export const getAllCategories = async () => {
    const posts = await loadAllPosts();
    const categorySet = new Set();

    posts.forEach(post => {
        if (Array.isArray(post.category)) {
            post.category.forEach(cat => categorySet.add(cat));
        } else if (typeof post.category === "string") {
            categorySet.add(post.category);
        }
    });

    return Array.from(categorySet);
};
