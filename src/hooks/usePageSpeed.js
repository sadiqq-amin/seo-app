import { useState } from 'react'

// Ye hook API call, loading, aur error — sab sambhalta hai
function usePageSpeed() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function checkSite(url, strategy = 'mobile') {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices&key=${apiKey}`

      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error('That URL didn\'t return a valid page. Double-check it starts with https://.')
      }

      const json = await response.json()
      setData(json)
        } catch (err) {
      if (err.message.includes('valid page')) {
        setError(err.message)
      } else if (err instanceof TypeError) {
        setError("Couldn't connect — check your internet connection and try again.")
      } else {
        setError("Something went wrong while checking that site. Try again in a moment.")
      }
    } finally {
      setLoading(false)
    }
  }

  return { checkSite, loading, error, data }
}

export default usePageSpeed