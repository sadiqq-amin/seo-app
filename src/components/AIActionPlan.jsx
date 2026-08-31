import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import generateActionPlan from '../lib/generateActionPlan'

function AIActionPlan({ url, issues }) {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setFailed(false)
    setPlan(null)

    generateActionPlan(url, issues)
      .then((result) => {
        if (!cancelled) setPlan(result)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url, issues])

  if (failed) return null // fallback: IssueList neeche already dikh raha hai

  return (
    <div className="mt-10 max-w-lg mx-auto w-full border border-line rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-signal" />
        <p className="text-xs tracking-widest text-ink/40">AI PRIORITY PLAN</p>
      </div>

      {loading && (
        <p className="text-sm text-ink/40 animate-pulse">Thinking through what to fix first...</p>
      )}

      {plan && (
        <p className="text-sm text-ink/70 leading-relaxed whitespace-pre-line">{plan}</p>
      )}
    </div>
  )
}

export default AIActionPlan