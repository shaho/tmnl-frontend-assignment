import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Button } from './button'

describe('Button component', () => {
  it('renders a button element', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('calls the onClick function when the button is clicked', () => {
    const onClickMock = jest.fn()
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>)
    const button = getByText('Click me')

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('renders a link element when provided with an href', () => {
    const { container } = render(
      <BrowserRouter>
        <Button href="/some-link">Link</Button>
      </BrowserRouter>
    )
    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/some-link')
    expect(link).toHaveTextContent('Link')
  })
})
