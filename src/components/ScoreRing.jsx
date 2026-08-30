// Ek score ka circle banata hai. Rang score ke hisab se badalta hai.
function ScoreRing({ label, score }) {
  const size = 96
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  let colorVar = 'var(--color-bad)'
  if (score >= 90) colorVar = 'var(--color-good)'
  else if (score >= 50) colorVar = 'var(--color-warn)'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorVar}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <span className="font-mono text-lg -mt-16">{score}</span>
      <span className="text-sm text-ink/60 mt-14">{label}</span>
    </div>
  )
}

export default ScoreRing