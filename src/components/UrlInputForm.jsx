import { useState } from 'react'

// Phase 0/1: sirf visual shell hai — real logic Phase 2 mein aayega
function UrlInputForm() {
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log('will check:', url) // placeholder — Phase 2 mein API call yahan lagegi
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex items-center border border-line rounded-md overflow-hidden">
        <span className="px-3 text-ink/40 font-mono text-sm">https://</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          className="flex-1 py-3 pr-3 font-mono text-sm bg-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-md bg-signal text-white font-medium hover:opacity-90 transition"
      >
        Check my site
      </button>
    </form>
  )
}

export default UrlInputForm