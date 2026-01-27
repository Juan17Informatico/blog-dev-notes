/**
 * EJEMPLOS DE USO - API INTEGRATION
 * 
 * Este archivo contiene ejemplos de cómo usar los hooks y servicios
 * en diferentes escenarios. Puedes eliminar este archivo una vez
 * que entiendas cómo integrar todo.
 */

// ============================================
// EJEMPLO 1: Cargar todos los posts
// ============================================
// import { useEffect } from 'react';
// import { usePosts } from '../hooks/useApi';
//
// export const ExamplePostsList = () => {
//   const { posts, loading, error, loadPosts } = usePosts();
//
//   useEffect(() => {
//     loadPosts();
//   }, [loadPosts]);
//
//   if (loading) return <div>Cargando posts...</div>;
//   if (error) return <div>Error: {error}</div>;
//
//   return (
//     <ul>
//       {posts.map(post => (
//         <li key={post.slug}>{post.title}</li>
//       ))}
//     </ul>
//   );
// };

// ============================================
// EJEMPLO 2: Cargar un post individual
// ============================================
// import { usePost } from '../hooks/useApi';
// import ReactMarkdown from 'react-markdown';
//
// export const ExamplePostDetail = ({ slug }) => {
//   const { post, loading, error } = usePost(slug);
//
//   if (loading) return <div>Cargando post...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!post) return <div>Post no encontrado</div>;
//
//   return (
//     <article>
//       <h1>{post.title}</h1>
//       <ReactMarkdown>{post.content}</ReactMarkdown>
//     </article>
//   );
// };

// ============================================
// EJEMPLO 3: Filtrar posts por categoría
// ============================================
// import { useEffect } from 'react';
// import { usePosts } from '../hooks/useApi';
//
// export const ExampleCategoryFilter = ({ category }) => {
//   const { filteredPosts, loadPosts, filterByCategory } = usePosts();
//
//   useEffect(() => {
//     loadPosts().then(() => {
//       filterByCategory(category);
//     });
//   }, [category, loadPosts, filterByCategory]);
//
//   return (
//     <div>
//       <h2>Posts en {category}</h2>
//       <ul>
//         {filteredPosts.map(post => (
//           <li key={post.slug}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// ============================================
// EJEMPLO 4: Cargar categorías
// ============================================
// import { useEffect } from 'react';
// import { useCategories } from '../hooks/useApi';
//
// export const ExampleCategories = () => {
//   const { categories, loading, error, loadCategories } = useCategories();
//
//   useEffect(() => {
//     loadCategories();
//   }, [loadCategories]);
//
//   if (loading) return <div>Cargando categorías...</div>;
//   if (error) return <div>Error: {error}</div>;
//
//   return (
//     <div>
//       <h2>Categorías</h2>
//       <ul>
//         {categories.map(category => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// ============================================
// EJEMPLO 5: Login de usuario
// ============================================
// import { useState } from 'react';
// import { login } from '../services/authService';
// import { useAuthStore } from '../store/authStore';
//
// export const ExampleLoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { loading, error } = useAuthStore();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       console.log('Login exitoso');
//     } catch (err) {
//       console.error('Login fallido', err);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Contraseña"
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Iniciando sesión...' : 'Login'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// };

// ============================================
// EJEMPLO 6: Usar Zustand stores directamente
// ============================================
// import { useAuthStore } from '../store/authStore';
// import { usePostsStore } from '../store/postsStore';
// import { useCategoriesStore } from '../store/categoriesStore';
//
// export const ExampleStoresDirectly = () => {
//   // Auth Store
//   const { user, isAuthenticated } = useAuthStore();
//
//   // Posts Store
//   const { posts, currentPost } = usePostsStore();
//
//   // Categories Store
//   const { categories, selectedCategory } = useCategoriesStore();
//
//   return (
//     <div>
//       <p>Usuario: {user?.name || 'Anónimo'}</p>
//       <p>Posts cargados: {posts.length}</p>
//       <p>Categorías: {categories.length}</p>
//     </div>
//   );
// };

// ============================================
// EJEMPLO 7: Inicializar autenticación en App
// ============================================
// import { useAuthInit } from '../hooks/useAuthInit';
//
// export const App = () => {
//   // Verifica y carga la autenticación al iniciar la app
//   useAuthInit();
//
//   return (
//     <div>
//       {/* Tu app aquí */}
//     </div>
//   );
// };

// ============================================
// EJEMPLO 8: Usar servicios directamente
// ============================================
// import { fetchAllPosts, createPost, deletePost } from '../services/postService';
//
// // En un componente o función asincrónica:
// const handleCreatePost = async () => {
//   try {
//     const newPost = await createPost({
//       title: 'Nuevo post',
//       content: '# Contenido',
//       category: 'Web Dev'
//     });
//     console.log('Post creado:', newPost);
//   } catch (error) {
//     console.error('Error creando post:', error);
//   }
// };
//
// const handleDeletePost = async (slug) => {
//   try {
//     await deletePost(slug);
//     console.log('Post eliminado');
//   } catch (error) {
//     console.error('Error eliminando post:', error);
//   }
// };

// Archivo de ejemplos de integración - Puedes eliminar este archivo después de entender los patrones
