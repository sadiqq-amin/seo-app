import { Gauge, Wrench, ListChecks, ShieldCheck } from 'lucide-react'

const features = [
  { icon: Gauge, title: 'Performance Score', desc: 'Know how fast your site really is.' },
  { icon: ListChecks, title: 'SEO Insights', desc: 'Fix issues that hold you back in search.' },
  { icon: Wrench, title: 'Actionable Tips', desc: 'Clear steps to improve and grow.' },
  { icon: ShieldCheck, title: 'Privacy First', desc: 'Your data is never stored or shared.' },
]

function FeatureGrid() {
  return (
    <div className="max-w-3xl mx-auto mt-24 px-6">
      <p className="text-xs tracking-widest text-ink/40 mb-6">WHAT YOU GET</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title}>
            <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center mb-3">
              <Icon size={16} />
            </div>
            <p className="font-medium text-sm mb-1">{title}</p>
            <p className="text-sm text-ink/50">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureGrid