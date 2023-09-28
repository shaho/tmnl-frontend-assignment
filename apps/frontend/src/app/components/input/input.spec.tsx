import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('applies the provided placeholder to the input element', () => {
    const placeholderText = 'Enter your name'
    render(<Input placeholder={placeholderText} />)
    const inputElement = screen.getByPlaceholderText(placeholderText)
    expect(inputElement).toBeInTheDocument()
  })

  it('applies error styles when error prop is provided', () => {
    render(<Input error={{ message: 'Error message' }} />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('text-red-600')
    expect(inputElement).toHaveClass('border-red-500')
  })

  it('displays the error message when error prop is an object with a message', () => {
    const errorMessage = 'Error message'
    render(<Input error={{ message: errorMessage }} />)
    const errorMessageElement = screen.getByText(errorMessage)
    expect(errorMessageElement).toBeInTheDocument()
  })

  it('calls the ref function when provided', () => {
    const refFn = jest.fn()
    render(<Input ref={refFn} />)
    const inputElement = screen.getByRole('textbox')
    expect(refFn).toHaveBeenCalledWith(inputElement)
  })

  it('applies default type as "text" when no type is provided', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'text')
  })
})
