import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllPosts, deletePost } from '../../services/postService';
import { usePostsStore } from '../../store/postsStore';
import { DataTable } from '../components/DataTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const PostsPage = () => {
  const { posts, loading, error } = usePostsStore();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAllPosts().catch(() => {});
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;
    setDeleting(true);
    try {
      await deletePost(deleteConfirm.id);
      await fetchAllPosts();
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white max-w-xs truncate">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
          {row.original.slug}
        </code>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Categoría',
      cell: ({ row }) => (
        <Badge variant={row.original.category ? 'primary' : 'secondary'}>
          {(typeof row.original.category === 'object' ? row.original.category?.name : row.original.category) || 'Sin categoría'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`${row.original.slug}/edit`)}
            className="gap-1"
          >
            <Edit size={14} />
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteConfirm({ open: true, id: row.original.id })}
            className="gap-1"
          >
            <Trash2 size={14} />
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona todos tus posts en un solo lugar
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('new')}
          className="gap-2"
        >
          <Plus size={18} />
          Nuevo Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{posts?.length || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Posts Totales</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {new Set(posts?.map((p) => p.category)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categorías</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {posts?.filter((p) => !p.category).length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sin Categoría</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-gray-400">Cargando posts...</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lista de Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={posts || []}
              searchPlaceholder="Buscar por título..."
              pageSize={10}
            />
          </CardContent>
        </Card>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteConfirm.open}
        title="Eliminar Post"
        description="¿Estás seguro de que deseas eliminar este post? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
      />
    </div>
  );
};

export default PostsPage;
