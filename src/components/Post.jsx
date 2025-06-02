export const Post = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">titulo</h1>
      <p className="text-sm text-gray-500 mb-6">fecha</p>
      <div className="prose prose-lg dark:prose-invert">
        {/* Suponiendo que el contenido viene en HTML seguro */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      </div>
    </div>
  )
}
