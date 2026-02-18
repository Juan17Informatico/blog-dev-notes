import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, fetchCategoryById, updateCategory } from '../../services/categoriesService';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Save } from 'lucide-react';

export const CategoryEditor = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCategoryById(id)
        .then((cat) => {
          setName(cat.name || cat);
        })
        .catch((err) => {
          setError('Error al cargar la categoría');
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    setSaving(true);
    try {
      const data = { name: name.trim() };
      if (id) {
        await updateCategory(id, data);
      } else {
        await createCategory(data);
      }
      navigate('/admin/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la categoría');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600 dark:text-gray-400">Cargando categoría...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {id ? 'Editar Categoría' : 'Nueva Categoría'}
        </h1>
        <Button variant="outline" onClick={() => navigate('/admin/categories')}>
          Volver
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información de la Categoría</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: React, JavaScript, Web..."
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/categories')}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={saving} className="gap-2">
            <Save size={18} />
            {saving ? 'Guardando...' : (id ? 'Actualizar Categoría' : 'Crear Categoría')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEditor;
