import { AlertStatus, alertStatuses } from '../../types'

type Props = {
  filterStatus?: AlertStatus
  onFilter: (status: AlertStatus) => void
}
export function Filter({ filterStatus, onFilter }: Props) {
  return (
    <div className="flex items-center">
      <h3 className="mr-3 text-lg font-semibold text-gray-600">Filter By Status:</h3>
      {alertStatuses.map((status, index) => (
        <button
          className={`px-3 py-2 border rounded m-1 text-sm ${
            status === filterStatus ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
          key={index}
          onClick={() => onFilter(status)}
        >
          {status}
        </button>
      ))}
    </div>
  )
}
