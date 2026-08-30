function parseReport(rawData) {
  const categories = rawData?.lighthouseResult?.categories
  const audits = rawData?.lighthouseResult?.audits
  const cwv = rawData?.loadingExperience?.metrics 

  if (!categories) {
    throw new Error("Couldn't read the report data. Try a different URL.")
  }

  function toPercent(score) {
    return Math.round((score ?? 0) * 100)
  }

  function getIssues() {
    if (!audits) return []
    return Object.values(audits)
      .filter((audit) => audit.score !== null && audit.score < 0.9 && audit.title)
      .sort((a, b) => a.score - b.score)
      .slice(0, 6)
      .map((audit) => ({
        title: audit.title,
        description: audit.description?.split('[')[0]?.trim() || '',
      }))
  }

  function getCoreWebVitals() {
    if (!cwv) return null
    const lcp = cwv.LARGEST_CONTENTFUL_PAINT_MS
    const inp = cwv.INTERACTION_TO_NEXT_PAINT
    const cls = cwv.CUMULATIVE_LAYOUT_SHIFT_SCORE

    return {
      lcp: lcp ? { raw: lcp.percentile, unit: 'ms', category: lcp.category } : null,
      inp: inp ? { raw: inp.percentile, unit: 'ms', category: inp.category } : null,
      cls: cls ? { raw: cls.percentile / 100, unit: '', category: cls.category } : null,
    }
  }

  return {
    performance: toPercent(categories.performance?.score),
    seo: toPercent(categories.seo?.score),
    accessibility: toPercent(categories.accessibility?.score),
    bestPractices: toPercent(categories['best-practices']?.score),
    issues: getIssues(),
    coreWebVitals: getCoreWebVitals(),
  }
}

export default parseReport