function ScoreRing({ label = '', score, size = 96 }) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

    let colorVar = 'var(--color-bad)'
  if (score >= 90) colorVar = 'var(--color-good)'
  else if (score >= 70) colorVar = 'var(--color-warn)'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 absolute top-0 left-0">
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
        <span className="absolute inset-0 flex items-center justify-center font-mono text-lg">
          {score}
        </span>
      </div>
      {label && <span className="text-sm text-ink/60">{label}</span>}
    </div>
  )
}

export default ScoreRing