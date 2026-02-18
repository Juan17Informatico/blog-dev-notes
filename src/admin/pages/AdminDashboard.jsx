import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { fetchAllPosts } from '../../services/postService';
import { fetchAllCategories } from '../../services/categoriesService';
import { usePostsStore } from '../../store/postsStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Plus, FileText, Folder, TrendingUp, Clock, Edit } from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { posts } = usePostsStore();
  const { categories } = useCategoriesStore();

  useEffect(() => {
    fetchAllPosts().catch(() => {});
    fetchAllCategories().catch(() => {});
  }, []);

  const recentPosts = posts?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ¡Bienvenido de vuelta!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Aquí está un resumen de tu actividad de blog
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Posts */}
        <Card className="hover:shadow-lg transition">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Posts Totales
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {posts?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/posts')}
                className="w-full"
              >
                Ver Posts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card className="hover:shadow-lg transition">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Categorías
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {categories?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Folder className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/categories')}
                className="w-full"
              >
                Ver Categorías
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts sin Categoría */}
        <Card className="hover:shadow-lg transition">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Sin Categorizar
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {posts?.filter((p) => !p.category).length || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <TrendingUp className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-450">
                Organiza tus posts
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <Card className="hover:shadow-lg transition bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="pt-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  Acciones Rápidas
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate('/admin/posts/new')}
                className="mt-4 gap-2 w-full"
              >
                <Plus size={16} />
                Nuevo Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Posts Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay posts todavía
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/admin/posts/new')}
              >
                Crear tu primer post
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => navigate(`/admin/posts/${post.slug}/edit`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {typeof post.content === 'string' ? post.content?.substring(0, 100) : JSON.stringify(post.content)?.substring(0, 100)}...
                      </p>
                      {post.category && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                            {typeof post.category === 'object' ? post.category.name : post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <Edit size={16} className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Puedes crear, editar y organizar tus posts usando la tabla de gestión mejorada.
            Utiliza el editor de markdown con vista previa en tiempo real para crear posts
            profesionales.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/admin/posts')}>
              Ver Documentación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
