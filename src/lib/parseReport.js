// Google ka JSON bohot bada aur messy hai — ye function usme se
// sirf wo 4 scores + kuch important issues nikal ke ek simple object banata hai.
function parseReport(rawData) {
  const categories = rawData?.lighthouseResult?.categories
  const audits = rawData?.lighthouseResult?.audits

  if (!categories) {
    throw new Error("Couldn't read the report data. Try a different URL.")
  }

  function toPercent(score) {
    return Math.round((score ?? 0) * 100)
  }

  // Audits jinka score kam hai (matlab problem hai) — unko issues bana dete hain
  function getIssues() {
    if (!audits) return []

    return Object.values(audits)
      .filter((audit) => audit.score !== null && audit.score < 0.9 && audit.title)
      .sort((a, b) => a.score - b.score) // sabse bada problem pehle
      .slice(0, 6) // sirf top 6 dikhao, poori list nahi
      .map((audit) => ({
        title: audit.title,
        description: audit.description?.split('[')[0]?.trim() || '', // Google ke links wagera hata dete hain
      }))
  }

  return {
    performance: toPercent(categories.performance?.score),
    seo: toPercent(categories.seo?.score),
    accessibility: toPercent(categories.accessibility?.score),
    bestPractices: toPercent(categories['best-practices']?.score),
    issues: getIssues(),
  }
}

export default parseReport