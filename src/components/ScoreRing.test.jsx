import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ScoreRing from './ScoreRing'

describe('ScoreRing', () => {
  it('displays the score number', () => {
    render(<ScoreRing score={82} />)
    expect(screen.getByText('82')).toBeInTheDocument()
  })

  it('displays the label when provided', () => {
    render(<ScoreRing score={82} label="Performance" />)
    expect(screen.getByText('Performance')).toBeInTheDocument()
  })

  it('does not render a label element when label is empty', () => {
    render(<ScoreRing score={82} />)
    expect(screen.queryByText('Performance')).not.toBeInTheDocument()
  })
})