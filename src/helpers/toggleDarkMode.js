export const toggleDarkMode = () => {
    const root = document.documentElement;

    if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};
