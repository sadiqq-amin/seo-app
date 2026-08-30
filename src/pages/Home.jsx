import UrlInputForm from '../components/UrlInputForm'
import FeatureGrid from '../components/FeatureGrid'
import HowItWorks from '../components/HowItWorks'
import CtaBand from '../components/CtaBand'

function Home() {
  return (
    <main id="top" className="min-h-screen bg-bg text-ink">
      <div className="max-w-lg mx-auto px-6 pt-20 text-center">
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-tight mb-4">
          See what's really slowing your site down.
        </h1>
        <p className="text-ink/60 mb-10">
          Instant SEO & performance insights that help you rank higher and build better experiences.
        </p>
        <UrlInputForm />
      </div>

      <FeatureGrid />
      <HowItWorks />
      <CtaBand />
    </main>
  )
}

export default Home