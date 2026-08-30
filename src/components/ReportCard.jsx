import ScoreRing from './ScoreRing'

function ReportCard({ scores }) {
  return (
    <div className="mt-10 flex gap-8 flex-wrap justify-center">
      <ScoreRing label="Performance" score={scores.performance} />
      <ScoreRing label="SEO" score={scores.seo} />
      <ScoreRing label="Accessibility" score={scores.accessibility} />
      <ScoreRing label="Best Practices" score={scores.bestPractices} />
    </div>
  )
}

export default ReportCard