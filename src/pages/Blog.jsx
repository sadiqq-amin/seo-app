import { Link } from 'react-router-dom'
import posts from '../lib/posts'

function Blog() {
  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-10 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-line pb-6">
            <Link to={`/blog/${post.slug}`} className="font-medium hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-ink/60 mt-2">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Blog