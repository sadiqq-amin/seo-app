// Score ke neeche, plain-English mein batata hai kya galat hai
function IssueList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <p className="mt-6 text-sm text-good text-center">
        No major issues found — nice.
      </p>
    )
  }

  return (
    <div className="mt-8 max-w-lg mx-auto">
      <h3 className="font-display text-sm text-ink/60 mb-3">Things to fix</h3>
      <ul className="space-y-3">
        {issues.map((issue) => (
          <li key={issue.title} className="border-b border-line pb-3">
            <p className="text-sm font-medium">{issue.title}</p>
            {issue.description && (
              <p className="text-sm text-ink/60 mt-1">{issue.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IssueList