// Score ke neeche, plain-English mein batata hai kya galat hai
function IssueList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <p className="mt-8 text-sm text-good text-center">
        No major issues found — nice.
      </p>
    )
  }

  return (
    <div className="mt-12 max-w-lg mx-auto w-full">
      <p className="text-xs tracking-widest text-ink/40 mb-6">THINGS TO FIX</p>
      <div className="space-y-4">
        {issues.map((issue, i) => (
          <div
            key={issue.title}
            className="flex gap-4 p-4 rounded-xl border border-line"
          >
            <span className="w-7 h-7 shrink-0 rounded-full border border-line flex items-center justify-center font-mono text-xs text-ink/50 mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-[15px] font-medium leading-snug">{issue.title}</p>
              {issue.description && (
                <p className="text-sm text-ink/55 leading-relaxed mt-1.5">
                  {issue.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IssueList