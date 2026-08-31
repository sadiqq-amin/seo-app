function LoadingState() {
  const labels = ['Performance', 'SEO', 'Accessibility', 'Best Practices']

  return (
    <div className="mt-10 flex gap-8 flex-wrap justify-center">
      {labels.map((label) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full border-4 border-line animate-pulse" />
          <span className="text-sm text-ink/40">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default LoadingState