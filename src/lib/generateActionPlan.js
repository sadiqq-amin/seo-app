// Ab ye seedha Gemini ko call nahi karta — apni khud ki serverless
// function (/api/action-plan) ko call karta hai, jo server pe safely
// asli Gemini API ko call karti hai. Isse API key browser mein kabhi nahi jaati.
async function generateActionPlan(url, issues) {
  if (!issues || issues.length === 0) return null

  const response = await fetch('/api/action-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, issues }),
  })

  if (!response.ok) {
    throw new Error('AI_REQUEST_FAILED')
  }

  const data = await response.json()

  if (!data.plan) {
    throw new Error('AI_NO_RESPONSE')
  }

  return data.plan
}

export default generateActionPlan