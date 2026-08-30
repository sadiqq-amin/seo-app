import ScoreRing from './ScoreRing'

function ReportCard({ scores }) {
  const rows = [
    { label: 'Performance', score: scores.performance },
    { label: 'SEO', score: scores.seo },
    { label: 'Accessibility', score: scores.accessibility },
    { label: 'Best Practices', score: scores.bestPractices },
  ]

  return (
    <div className="mt-10 max-w-lg mx-auto w-full">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between py-4 ${
            i !== rows.length - 1 ? 'border-b border-line' : ''
          }`}
        >
          <span className="font-display text-sm text-ink/70">{row.label}</span>
          <ScoreRing score={row.score} size={56} />
        </div>
      ))}
    </div>
  )
}

export default ReportCard