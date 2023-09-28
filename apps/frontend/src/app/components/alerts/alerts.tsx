import { Alert } from '../../types'
import { Badge } from '../badge'
import { Button } from '../button'
import { Pagination, PaginationProps } from '../pagination'

type AlertsProps = {
  alerts: Alert[]
} & PaginationProps

export function Alerts({ alerts, totalPages, currentPage, onPageChange }: AlertsProps) {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full my-6 text-left" cellPadding={10} cellSpacing={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Transaction ID</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts?.map((alert: Alert) => (
              <tr key={alert.id} className="border-b last:border-none hover:bg-sky-100 hover:text-sky-900 ">
                <td>
                  <span className="text-base text-gray-500"> {alert.id}</span>
                </td>
                <td>
                  <span className="text-base text-gray-500 "> {alert.description}</span>
                </td>
                <td>
                  <span className="text-base text-gray-500"> {alert.transactionId}</span>
                </td>
                <td className="text-center">
                  <Badge type={alert.status}> {alert.status}</Badge>
                </td>
                <td className="text-center">
                  <Button href={`/alerts/${alert.id}`}> Show Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alerts?.length === 0 && (
          <div className="flex justify-center text-center">
            <h3 className="text-xl text-rose-600">No available alert</h3>
          </div>
        )}
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  )
}
