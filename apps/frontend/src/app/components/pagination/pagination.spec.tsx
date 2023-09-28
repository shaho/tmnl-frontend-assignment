import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from './pagination'

describe('Pagination Component', () => {
  const setup = (currentPage: number) => {
    const onPageChange = jest.fn()
    render(<Pagination totalPages={10} currentPage={currentPage} onPageChange={onPageChange} />)
    return { onPageChange }
  }

  test('renders without crashing', () => {
    setup(1)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('displays the correct page number buttons', () => {
    setup(5)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
    expect(screen.queryByText('3')).not.toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.queryByText('7')).not.toBeInTheDocument()
    expect(screen.queryByText('8')).not.toBeInTheDocument()
    expect(screen.queryByText('9')).not.toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('Next and Previous buttons work correctly', () => {
    const { onPageChange } = setup(5)
    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(6)
    fireEvent.click(screen.getByText('Previous'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  test('current page is highlighted', () => {
    setup(5)
    expect(screen.getByText('5')).toHaveClass('bg-blue-500 text-white')
  })

  test('renders ellipsis correctly between non-consecutive pages', () => {
    setup(5)
    const ellipsisElements = screen.getAllByText('...')
    expect(ellipsisElements).toHaveLength(2)
  })
})
