import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
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
  const report = data ? parseReport(data) : null

  function handleSubmit(e) {
    e.preventDefault()
    if (!url) return
    checkSite(url, strategy)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center border border-line rounded-full overflow-hidden bg-white pl-5 pr-1.5 py-1.5">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your website URL"
          className="flex-1 py-2 font-mono text-sm bg-transparent outline-none min-w-0"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Checking...' : 'Check my site'}
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="flex justify-center gap-2 mt-4 text-sm">
        <button type="button" onClick={() => setStrategy('mobile')}
          className={`px-3 py-1 rounded-full ${strategy === 'mobile' ? 'bg-ink text-white' : 'text-ink/50 border border-line'}`}>
          Mobile
        </button>
        <button type="button" onClick={() => setStrategy('desktop')}
          className={`px-3 py-1 rounded-full ${strategy === 'desktop' ? 'bg-ink text-white' : 'text-ink/50 border border-line'}`}>
          Desktop
        </button>
      </div>

      <p className="text-center text-xs text-ink/40 mt-3">No signup required • Instant results</p>

      {error && <p className="mt-4 text-bad text-sm text-center">{error}</p>}
      {loading && <LoadingState />}
      {report && <ReportCard scores={report} />}
      {report && <IssueList issues={report.issues} />}
      {report && <ShareButton url={url} scores={report} />}
    </div>
  )
}

export default UrlInputForm