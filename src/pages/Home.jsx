import UrlInputForm from '../components/UrlInputForm'

function Home() {
  return (
    <main className="min-h-screen bg-bg text-ink px-6">
      <div className="max-w-lg mx-auto pt-16 text-center">
        <h1 className="font-display text-4xl tracking-tight mb-3">SitePulse</h1>
        <p className="text-ink/60 mb-10">
          Paste a link. Get an instant read on how your site is really doing.
        </p>
        <UrlInputForm />
      </div>
    </main>
  )
}

export default Home