import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import posts from '../lib/posts'

function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-bg text-ink px-6 pt-16 text-center">
        <p>Post not found.</p>
        <Link to="/blog" className="text-signal underline">Back to blog</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-16">
      <div className="max-w-2xl mx-auto pb-16">
        <Link to="/blog" className="text-sm text-ink/50 hover:underline">← Back to blog</Link>
        <p className="text-xs tracking-widest text-ink/40 mt-6 mb-3">{post.category?.toUpperCase()}</p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-3">{post.title}</h1>
        <p className="text-sm text-ink/40 mb-10">{post.date}</p>

        <article className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-signal">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  )
}

export default BlogPost