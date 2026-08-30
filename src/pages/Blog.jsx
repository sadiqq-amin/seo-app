import { useState } from 'react'
import { Link } from 'react-router-dom'
import posts from '../lib/posts'

const categories = ['All', 'SEO', 'Performance', 'Best Practices', 'Guides']

function Blog() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-16">
      <div className="max-w-3xl mx-auto pb-16">
        <p className="text-xs tracking-widest text-ink/40 mb-4">OUR BLOG</p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-10 max-w-xl">
          Insights to help you build faster, rank higher, and grow smarter.
        </h1>

        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm ${active === cat ? 'bg-ink text-white' : 'border border-line text-ink/60'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <div className="h-40 rounded-xl bg-gradient-to-br from-ink/5 to-ink/10 mb-4" />
              <p className="text-xs text-ink/40 mb-1">{post.date} · {post.category}</p>
              <p className="font-medium mb-1 group-hover:underline">{post.title}</p>
              <p className="text-sm text-ink/50">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-ink/40 text-sm">No posts in this category yet.</p>
        )}
      </div>
    </main>
  )
}

export default Blog