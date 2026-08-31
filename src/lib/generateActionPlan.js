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