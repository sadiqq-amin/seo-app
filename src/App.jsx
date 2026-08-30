import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CompareSites from './pages/CompareSites'

function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-line">
        <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg tracking-tight">SitePulse</Link>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-ink/70 hover:text-ink">Check</Link>
            <Link to="/compare" className="text-ink/70 hover:text-ink">Compare</Link>
            <Link to="/blog" className="text-ink/70 hover:text-ink">Blog</Link>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<CompareSites />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App