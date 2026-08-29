import UrlInputForm from './components/UrlInputForm'

function App() {
  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-3xl mb-2">SEO Checker</h1>
      <p className="text-ink/60 mb-10">Paste a link. Get an instant report.</p>
      <UrlInputForm />
    </main>
  )
}

export default App