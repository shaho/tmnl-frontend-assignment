import React from 'react'
import { render } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge component', () => {
  it('renders without crashing', () => {
    render(<Badge type="OPEN">Open</Badge>)
  })
  it('renders correct badge type', () => {
    const { getByText } = render(<Badge type="OPEN">Open</Badge>)
    const badge = getByText('Open')
    expect(badge).toHaveClass('bg-indigo-500')
  })

  it('applies correct class for OPEN type', () => {
    const { getByText } = render(<Badge type="OPEN">Open</Badge>)
    const badge = getByText('Open')
    expect(badge).toHaveClass('bg-indigo-500')
  })

  it('displays children correctly', () => {
    const { getByText } = render(<Badge type="OPEN">Test</Badge>)
    const badge = getByText('Test')
    expect(badge).toHaveTextContent('Test')
  })
})
