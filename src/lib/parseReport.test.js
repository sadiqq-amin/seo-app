import { describe, it, expect } from 'vitest'
import parseReport from './parseReport'

function makeFakeApiResponse({ performance = 0.85, seo = 0.92, accessibility = 0.7, bestPractices = 0.88 } = {}) {
  return {
    lighthouseResult: {
      categories: {
        performance: { score: performance },
        seo: { score: seo },
        accessibility: { score: accessibility },
        'best-practices': { score: bestPractices },
      },
      audits: {
        'audit-1': { score: 0.3, title: 'Images missing alt text', description: 'Alt text helps screen readers. [Learn more]' },
        'audit-2': { score: 0.95, title: 'Uses HTTPS', description: 'Good.' },
        'audit-3': { score: null, title: 'Not applicable', description: 'N/A' },
      },
    },
  }
}

describe('parseReport', () => {
  it('converts scores from 0-1 to 0-100', () => {
    const result = parseReport(makeFakeApiResponse({ performance: 0.85 }))
    expect(result.performance).toBe(85)
  })

  it('rounds scores to the nearest whole number', () => {
    const result = parseReport(makeFakeApiResponse({ seo: 0.926 }))
    expect(result.seo).toBe(93)
  })

  it('only includes issues with a score below 0.9', () => {
    const result = parseReport(makeFakeApiResponse())
    expect(result.issues.length).toBe(1)
    expect(result.issues[0].title).toBe('Images missing alt text')
  })

  it('excludes audits with a null score (not applicable ones)', () => {
    const result = parseReport(makeFakeApiResponse())
    const titles = result.issues.map((i) => i.title)
    expect(titles).not.toContain('Not applicable')
  })

  it('strips Google\'s "[Learn more]" links from descriptions', () => {
    const result = parseReport(makeFakeApiResponse())
    expect(result.issues[0].description).not.toContain('[Learn more]')
  })

  it('throws a clear error when the response has no categories', () => {
    expect(() => parseReport({})).toThrow("Couldn't read the report data")
  })
})
