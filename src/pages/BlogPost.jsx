import { useParams, Link } from 'react-router-dom'
import posts from '../lib/posts'

function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-bg text-ink px-6 pt-10 text-center">
        <p>Post not found.</p>
        <Link to="/blog" className="text-signal underline">Back to blog</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-10 max-w-2xl mx-auto">
      <Link to="/blog" className="text-sm text-ink/60 hover:underline">← Back to blog</Link>
      <h1 className="font-display text-2xl mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-ink/40 mb-8">{post.date}</p>
      <div className="whitespace-pre-line text-ink/80 leading-relaxed">
        {post.content}
      </div>
    </main>
  )
}

export default BlogPost