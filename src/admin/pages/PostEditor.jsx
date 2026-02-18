import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostBySlug, updatePost } from '../../services/postService';
import { fetchAllCategories } from '../../services/categoriesService';
import { useCategoriesStore } from '../../store/categoriesStore';
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote,
  Save,
  Eye,
  FileText,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';

export const PostEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategoriesStore();

  const [tab, setTab] = useState('editor'); // 'editor' or 'preview'
  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar categorías
    fetchAllCategories().catch(() => {});

    if (slug) {
      setLoading(true);
      fetchPostBySlug(slug)
        .then((post) => {
          setPostId(post.id);
          setTitle(post.title || '');
          setDescription(post.description || '');
          setContent(post.content || post.body || '');
          console.log({post});
          
          // Handle category: extract ID if category exists, otherwise set empty
          let categoryIdValue = '';
          
          if (post.category !== null && post.category !== undefined) {
            if (typeof post.category === 'object') {
              categoryIdValue = post.category?.id || '';
            } else if (typeof post.category === 'number') {
              categoryIdValue = post.category;
            } else if (typeof post.category === 'string') {
              categoryIdValue = post.category;
            }
          }
          
          setCategoryId(categoryIdValue);
        })
        .catch((err) => {
          setError('Error al cargar el post');
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const insertMarkdown = (before, after = '') => {
    const textarea = document.getElementById('content-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newContent);
    setTimeout(() => {
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
      textarea.focus();
    }, 0);
  };

  const markdownTools = [
    { icon: <Heading1 size={18} />, label: 'H1', action: () => insertMarkdown('# ', '') },
    { icon: <Heading2 size={18} />, label: 'H2', action: () => insertMarkdown('## ', '') },
    { icon: <Bold size={18} />, label: 'Bold', action: () => insertMarkdown('**', '**') },
    { icon: <Italic size={18} />, label: 'Italic', action: () => insertMarkdown('*', '*') },
    { icon: <Code size={18} />, label: 'Code', action: () => insertMarkdown('`', '`') },
    { icon: <Quote size={18} />, label: 'Quote', action: () => insertMarkdown('> ', '') },
    { icon: <List size={18} />, label: 'List', action: () => insertMarkdown('- ', '') },
    { icon: <ListOrdered size={18} />, label: 'Ordered', action: () => insertMarkdown('1. ', '') },
    { icon: <LinkIcon size={18} />, label: 'Link', action: () => insertMarkdown('[text](', ')') },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título es requerido');
      return;
    }

    if (!description.trim()) {
      setError('La descripción es requerida');
      return;
    }

    if (!content.trim()) {
      setError('El contenido es requerido');
      return;
    }

    setSaving(true);
    try {
      const postData = { 
        title: title.trim(), 
        description: description.trim(),
        content,
        categoryId: categoryId ? Number(categoryId) : null
      };
      if (postId) {
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      navigate('/admin/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600 dark:text-gray-400">Cargando post...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {slug ? 'Editar Post' : 'Crear Nuevo Post'}
        </h1>
        <Button variant="outline" onClick={() => navigate('/admin/posts')}>
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
        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresa el título del post"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingresa una descripción breve del post"
                required
                className="min-h-20"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {categories && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Contenido *</CardTitle>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={tab === 'editor' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTab('editor')}
                  className="gap-2"
                >
                  <FileText size={16} />
                  Editor
                </Button>
                <Button
                  type="button"
                  variant={tab === 'preview' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTab('preview')}
                  className="gap-2"
                >
                  <Eye size={16} />
                  Vista Previa
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {tab === 'editor' ? (
              <div className="space-y-3">
                {/* Markdown Toolbar */}
                <div className="flex flex-wrap gap-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  {markdownTools.map((tool, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={tool.action}
                      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      title={tool.label}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>

                {/* Editor */}
                <Textarea
                  id="content-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe el contenido en Markdown... Soporta GFM (GitHub Flavored Markdown)"
                  className="font-mono text-sm min-h-96"
                />
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 min-h-96 overflow-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content || 'Empieza a escribir para ver la vista previa...'}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/posts')}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={saving} className="gap-2">
            <Save size={18} />
            {saving ? 'Guardando...' : (slug ? 'Actualizar Post' : 'Crear Post')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
