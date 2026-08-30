import { useState } from 'react'
import { X, Globe, ArrowRight } from 'lucide-react'
import usePageSpeed from '../hooks/usePageSpeed'
import parseReport from '../lib/parseReport'
import ScoreRing from '../components/ScoreRing'

const categoryLabel = { FAST: 'Good', AVERAGE: 'Needs improvement', SLOW: 'Poor' }
const categoryColor = { FAST: 'text-good', AVERAGE: 'text-warn', SLOW: 'text-bad' }

function formatVital(v) {
  if (!v) return '—'
  if (v.unit === 'ms' && v.raw >= 1000) return `${(v.raw / 1000).toFixed(1)} s`
  if (v.unit === 'ms') return `${Math.round(v.raw)} ms`
  return v.raw.toFixed(2)
}

// lower is better for LCP/INP/CLS (kam time/shift = achha)
function diffVital(a, b) {
  if (!a || !b) return { text: '—', color: 'text-ink/40' }
  const d = a.raw - b.raw
  if (d === 0) return { text: '±0', color: 'text-ink/40' }
  const abs = Math.abs(d)
  const formatted =
    a.unit === 'ms' && abs >= 1000 ? `${(abs / 1000).toFixed(1)} s` :
    a.unit === 'ms' ? `${Math.round(abs)} ms` :
    abs.toFixed(2)
  // negative d matlab site A tez/behtar hai (kam value)
  const color = d < 0 ? 'text-good' : 'text-bad'
  return { text: `${d > 0 ? '+' : '−'}${formatted}`, color }
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
  const bothLoading = siteA.loading || siteB.loading
  const bothReady = reportA && reportB

  const rows = bothReady ? [
    ['Performance', reportA.performance, reportB.performance],
    ['SEO', reportA.seo, reportB.seo],
    ['Accessibility', reportA.accessibility, reportB.accessibility],
    ['Best Practices', reportA.bestPractices, reportB.bestPractices],
  ] : []

  const vitalsRows = bothReady ? [
    ['LCP', reportA.coreWebVitals?.lcp, reportB.coreWebVitals?.lcp],
    ['INP', reportA.coreWebVitals?.inp, reportB.coreWebVitals?.inp],
    ['CLS', reportA.coreWebVitals?.cls, reportB.coreWebVitals?.cls],
  ] : []

  const hasVitals = vitalsRows.some(([, a, b]) => a || b)

  return (
    <main className="min-h-screen bg-bg text-ink px-6 pt-16">
      <div className="max-w-2xl mx-auto pb-16">
        <p className="text-xs tracking-widest text-ink/40 mb-4">COMPARE</p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-3">
          Compare two sites.<br />Side by side.
        </h1>
        <p className="text-ink/60 mb-10">
          See how websites stack up across performance, SEO, and best practices.
        </p>

        <form onSubmit={handleCompare} className="space-y-3 mb-10">
          {[['Website 1', urlA, setUrlA], ['Website 2', urlB, setUrlB]].map(([label, value, setter]) => (
            <div key={label}>
              <label className="text-sm text-ink/50 mb-1 block">{label}</label>
              <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5">
                <Globe size={14} className="text-ink/30 shrink-0" />
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 font-mono text-sm bg-transparent outline-none min-w-0"
                />
                {value && (
                  <button type="button" onClick={() => setter('')}>
                    <X size={14} className="text-ink/30" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={bothLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium disabled:opacity-50"
          >
            {bothLoading ? 'Comparing...' : 'Compare sites'} <ArrowRight size={14} />
          </button>
        </form>

        {(siteA.error || siteB.error) && (
          <p className="text-bad text-sm mb-6">{siteA.error || siteB.error}</p>
        )}

        {bothReady && (
          <>
            <div className="border border-line rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6 text-sm font-medium">
                <span className="truncate max-w-[35%]">{urlA}</span>
                <span className="text-ink/30 text-xs">vs</span>
                <span className="truncate max-w-[35%] text-right">{urlB}</span>
              </div>

              {rows.map(([label, a, b], i) => (
                <div key={label} className={`flex items-center justify-between py-4 ${i !== rows.length - 1 ? 'border-b border-line' : ''}`}>
                  <div className={a > b ? 'scale-105' : 'opacity-70'}>
                    <ScoreRing score={a} size={48} />
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-ink/70 block">{label}</span>
                    {a !== b && (
                      <span className="text-xs text-ink/30">
                        {a > b ? '← ahead' : 'ahead →'}
                      </span>
                    )}
                  </div>
                  <div className={b > a ? 'scale-105' : 'opacity-70'}>
                    <ScoreRing score={b} size={48} />
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-line rounded-xl p-6">
              <p className="font-medium text-sm mb-4">Core Web Vitals</p>

              {!hasVitals && (
                <p className="text-ink/40 text-sm">Not enough real-world traffic data available for these sites yet.</p>
              )}

              {hasVitals && (
                <div className="text-sm">
                  <div className="grid grid-cols-4 text-ink/40 text-xs mb-3">
                    <span></span>
                    <span className="truncate">{urlA}</span>
                    <span className="truncate">{urlB}</span>
                    <span>Difference</span>
                  </div>
                  {vitalsRows.map(([label, a, b]) => {
                    const diff = diffVital(a, b)
                    return (
                      <div key={label} className="grid grid-cols-4 items-center py-2.5 border-t border-line">
                        <span className="text-ink/60">{label}</span>
                        <span>
                          {formatVital(a)}{' '}
                          {a && <span className={`text-xs ${categoryColor[a.category] || ''}`}>{categoryLabel[a.category] || ''}</span>}
                        </span>
                        <span>
                          {formatVital(b)}{' '}
                          {b && <span className={`text-xs ${categoryColor[b.category] || ''}`}>{categoryLabel[b.category] || ''}</span>}
                        </span>
                        <span className={`font-medium ${diff.color}`}>{diff.text}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default CompareSites