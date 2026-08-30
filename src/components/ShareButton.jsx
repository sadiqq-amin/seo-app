import { useState } from 'react'

// Result ko copy karke share karne layak text bana deta hai
function ShareButton({ url, scores }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `SEO Checker report for ${url}:
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
    <button
      onClick={handleShare}
      className="mt-6 mx-auto block text-sm text-ink/60 border border-line rounded-md px-4 py-2 hover:bg-line/30 transition"
    >
      {copied ? 'Copied!' : 'Copy result to share'}
    </button>
  )
}

export default ShareButton