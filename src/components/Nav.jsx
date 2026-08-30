import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Menu, X } from 'lucide-react'

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-line relative">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center">
            <Activity size={16} />
          </span>
          <span className="font-display text-lg tracking-tight">SitePulse</span>
        </Link>

        <div className="hidden sm:flex gap-8 text-sm text-ink/70">
          <Link to="/" className="hover:text-ink">Check</Link>
          <Link to="/compare" className="hover:text-ink">Compare</Link>
          <Link to="/blog" className="hover:text-ink">Blog</Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-9 h-9 rounded-full border border-line flex items-center justify-center sm:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-line flex flex-col text-sm">
          {[['Check', '/'], ['Compare', '/compare'], ['Blog', '/blog']].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="px-6 py-3 border-b border-line text-ink/70 hover:bg-line/20"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Nav