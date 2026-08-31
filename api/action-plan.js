export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, issues } = req.body

  if (!issues || issues.length === 0) {
    return res.status(200).json({ plan: null })
  }

  const apiKey = process.env.GEMINI_API_KEY // note: bina VITE_ ke — sirf server padhega isse
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`

  const issuesText = issues
    .map((issue, i) => `${i + 1}. ${issue.title}${issue.description ? ' — ' + issue.description : ''}`)
    .join('\n')

  const prompt = `You are a senior web performance/SEO consultant. A website (${url}) has these issues, in no particular order:

${issuesText}

Pick the 3 MOST IMPACTFUL issues to fix first, and explain briefly (1-2 sentences each) WHY they matter more than the others and what fixing them will improve. Be direct and practical, no fluff. Format as a numbered list.`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    })

    if (!response.ok) {
      return res.status(502).json({ error: 'AI_REQUEST_FAILED' })
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return res.status(502).json({ error: 'AI_NO_RESPONSE' })
    }

    return res.status(200).json({ plan: text })
  } catch (err) {
    return res.status(500).json({ error: 'SERVER_ERROR' })
  }
}