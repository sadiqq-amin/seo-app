import { useState } from 'react'
import usePageSpeed from '../hooks/usePageSpeed'
import parseReport from '../lib/parseReport'
import ReportCard from './ReportCard'
import LoadingState from './LoadingState'
import IssueList from './IssueList'
import ShareButton from './ShareButton'

function UrlInputForm() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState('mobile')
  const { checkSite, loading, error, data } = usePageSpeed()

  function handleSubmit(e) {
    e.preventDefault()
    if (!url) return
    checkSite(url, strategy)
  }
  const report = data ? parseReport(data) : null

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit}>
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

        <div className="flex gap-2 mt-3 text-sm">
          <button
            type="button"
            onClick={() => setStrategy('mobile')}
            className={`px-3 py-1 rounded-md ${strategy === 'mobile' ? 'bg-signal text-white' : 'text-ink/60 border border-line'}`}
          >
            Mobile
          </button>
          <button
            type="button"
            onClick={() => setStrategy('desktop')}
            className={`px-3 py-1 rounded-md ${strategy === 'desktop' ? 'bg-signal text-white' : 'text-ink/60 border border-line'}`}
          >
            Desktop
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-3 rounded-md bg-signal text-white font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check my site'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-bad text-sm">{error}</p>
      )}

      {loading && <LoadingState />}
            {report && <ReportCard scores={report} />}
      {report && <IssueList issues={report.issues} />}
            {report && <ShareButton url={url} scores={report} />}
    </div>
  )
}

export default UrlInputForm