import { Fragment } from 'react'

export type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const getDisplayedPages = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    const displayedPages = pageNumbers.filter((pageNumber) => {
      if (pageNumber === 1 || pageNumber === totalPages) return true

      return Math.abs(currentPage - pageNumber) <= 1
    })

    return displayedPages
  }

  const displayedPages = getDisplayedPages()

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-3 py-2 border rounded ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-300'
                : 'text-blue-500 hover:bg-blue-500 hover:text-white'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {displayedPages.map((number, index, array) => (
          <Fragment key={number}>
            <li className="mx-1">
              <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-2 border rounded ${
                  number === currentPage ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {number}
              </button>
            </li>
            {array[index + 1] - number > 1 && <li className="mx-1">...</li>}
          </Fragment>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages
                ? 'cursor-not-allowed  text-gray-300'
                : 'text-blue-500 hover:bg-blue-500 hover:text-white'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
