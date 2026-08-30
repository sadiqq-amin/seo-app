import { ArrowRight } from 'lucide-react'

function CtaBand() {
  return (
    <div className="mt-24 bg-ink text-white px-6 py-12">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xl font-display text-center sm:text-left">
          Built for creators, developers, marketers, and businesses.
        </p>
        <a href="#top" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-ink text-sm font-medium whitespace-nowrap">
          Start checking <ArrowRight size={14} />
        </a>
      </div>
    </div>
  )
}

export default CtaBand