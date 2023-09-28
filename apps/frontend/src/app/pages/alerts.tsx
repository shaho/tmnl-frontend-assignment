import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { getAlerts } from '../services'
import { Alerts, Filter, Button } from '../components'
import { AlertStatus } from '../types'

export function AlertsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const filterStatus = params.get('status') || undefined
  const currentPage = Number(params.get('page')) || 1
  const limit = 10

  const handlePageChange = (page: number) => {
    let url = `?page=${page}`
    if (filterStatus) {
      url += `&status=${filterStatus}`
    }
    navigate(url, { replace: true })
  }

  const handleFilter = (status: AlertStatus) => {
    navigate(`?status=${status}`, { replace: true })
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['alerts', currentPage, filterStatus],
    queryFn: () => getAlerts(limit, currentPage, filterStatus),
  })

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold">Alerts</h1>
      <div className="flex items-center justify-between">
        <Filter filterStatus={filterStatus as AlertStatus} onFilter={handleFilter} />
        <Button href="/alerts/new">Create new alert</Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div className="text-red">Something went wrong!</div>}
      {!isLoading && data && (
        <Alerts
          alerts={data.items}
          totalPages={data.meta.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
