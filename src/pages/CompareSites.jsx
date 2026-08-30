import { useState } from 'react'
import usePageSpeed from '../hooks/usePageSpeed'
import parseReport from '../lib/parseReport'
import ScoreRing from '../components/ScoreRing'
import LoadingState from '../components/LoadingState'

// Ek column — ek site ka result dikhata hai
function SiteColumn({ placeholder, url, setUrl, loading, error, report }) {
  return (
    <div className="flex-1 min-w-[240px]">
      {error && <p className="text-bad text-sm mb-3">{error}</p>}
      {loading && (
        <div className="flex flex-col gap-3">
          <div className="w-full h-12 rounded-md border-4 border-line animate-pulse" />
        </div>
      )}

      {report && (
        <div>
          {[
            ['Performance', report.performance],
            ['SEO', report.seo],
            ['Accessibility', report.accessibility],
            ['Best Practices', report.bestPractices],
          ].map(([label, score]) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-line">
              <span className="text-sm text-ink/70">{label}</span>
              <ScoreRing score={score} size={48} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CompareSites() {
  const [urlA, setUrlA] = useState('')
  const [urlB, setUrlB] = useState('')
  const siteA = usePageSpeed()
  const siteB = usePageSpeed()

  function handleCompare(e) {
    e.preventDefault()
    if (!urlA || !urlB) return
    siteA.checkSite(urlA)
    siteB.checkSite(urlB)
  }

  const reportA = siteA.data ? parseReport(siteA.data) : null
  const reportB = siteB.data ? parseReport(siteB.data) : null

  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-2xl mb-2 text-center">Compare two sites</h1>
        <p className="text-ink/60 text-center mb-10">See how two websites stack up, side by side.</p>

        <form onSubmit={handleCompare} className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1 flex items-center border border-line rounded-md overflow-hidden">
            <span className="px-3 text-ink/40 font-mono text-sm">https://</span>
            <input
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              placeholder="site-one.com"
              className="flex-1 py-3 pr-3 font-mono text-sm bg-transparent outline-none"
            />
          </div>
          <div className="flex-1 flex items-center border border-line rounded-md overflow-hidden">
            <span className="px-3 text-ink/40 font-mono text-sm">https://</span>
            <input
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              placeholder="site-two.com"
              className="flex-1 py-3 pr-3 font-mono text-sm bg-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={siteA.loading || siteB.loading}
            className="px-6 py-3 rounded-md bg-signal text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            Compare
          </button>
        </form>

        <div className="flex flex-col sm:flex-row gap-10">
          <SiteColumn placeholder="site-one.com" url={urlA} setUrl={setUrlA} loading={siteA.loading} error={siteA.error} report={reportA} />
          <SiteColumn placeholder="site-two.com" url={urlB} setUrl={setUrlB} loading={siteB.loading} error={siteB.error} report={reportB} />
        </div>
      </div>
    </main>
  )
}

export default CompareSites