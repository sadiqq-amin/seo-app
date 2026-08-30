const steps = [
  { n: '01', title: 'Enter your site', desc: "Paste your URL and we'll do the rest." },
  { n: '02', title: 'We analyze', desc: 'Our tool scans performance, SEO, and best practices.' },
  { n: '03', title: 'Get insights', desc: 'You get a clear report with scores and tips.' },
]

function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto mt-24 px-6">
      <h2 className="font-display text-2xl mb-8">How it works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.n}>
            <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center mb-3 font-mono text-sm">
              {step.n}
            </div>
            <p className="font-medium text-sm mb-1">{step.title}</p>
            <p className="text-sm text-ink/50">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks