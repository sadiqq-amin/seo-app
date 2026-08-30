import { useState } from 'react'

function usePageSpeed() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function fetchOnce(url, strategy) {
    const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices&key=${apiKey}`

    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error('BAD_RESPONSE')
    }
    return response.json()
  }

  async function checkSite(url, strategy = 'mobile') {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      let result
      try {
        // Pehli koshish
        result = await fetchOnce(url, strategy)
      } catch (firstErr) {
        // Google ka API kabhi kabhi pehli baar flaky hota hai — ek dafa aur try karo
        await new Promise((r) => setTimeout(r, 1200))
        result = await fetchOnce(url, strategy)
      }
      setData(result)
    } catch (err) {
      setError("That URL didn't return a valid page. Double-check it starts with https://.")
    } finally {
      setLoading(false)
    }
  }

  return { checkSite, loading, error, data }
}

export default usePageSpeed