import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function ShareButton({ url, scores }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `SitePulse report for ${url}:
Performance: ${scores.performance}
SEO: ${scores.seo}
Accessibility: ${scores.accessibility}
Best Practices: ${scores.bestPractices}

Check your own site: ${window.location.origin}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-10 max-w-lg mx-auto w-full flex justify-center">
      <button
        onClick={handleShare}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
          copied ? 'bg-good text-white' : 'border border-line text-ink/70 hover:bg-line/30'
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied to clipboard' : 'Copy result to share'}
      </button>
    </div>
  )
}

export default ShareButton