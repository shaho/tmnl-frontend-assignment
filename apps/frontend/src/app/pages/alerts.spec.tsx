import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AlertsPage } from './alerts'
import * as Services from '../services'

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

jest.mock('../services')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '' }),
}))

describe('<AlertsPage />', () => {
  beforeEach(() => {
    ;(useQuery as jest.Mock).mockReturnValue(() => ({
      data: {
        items: [],
        meta: { totalPages: 1 },
      },
      isLoading: false,
      isError: false,
    }))
    ;(Services.getAlert as jest.Mock).mockResolvedValue({ items: [], meta: { totalPages: 1 } })
  })

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertsPage />
      </BrowserRouter>
    )
  })

  it('display loading state', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    })
    render(
      <BrowserRouter>
        <AlertsPage />
      </BrowserRouter>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('display error state', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      isError: true,
      isLoading: false,
    })
    render(
      <BrowserRouter>
        <AlertsPage />
      </BrowserRouter>
    )
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })

  it('calls handle filter function', () => {
    render(
      <BrowserRouter>
        <AlertsPage />
      </BrowserRouter>
    )
    const button = screen.getByText('OPEN')
    act(() => {
      fireEvent.click(button)
    })
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('?status=OPEN', { replace: true })
  })
})
