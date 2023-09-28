import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getAlert } from '../services'
import { Alert } from '../types'
import { AlertDetails } from '../components/alert-details'

export function AlertPage() {
  const params = useParams<{ id: string }>()
  const { data, isLoading, isError, error } = useQuery<Alert, Error>({
    queryKey: ['alert', params],
    retry: false,
    queryFn: async () => {
      const alert = await getAlert(params.id)
      if (!alert) {
        throw new Error('Not found')
      }
      return alert
    },
  })

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div className="text-red">{error.message}</div>}

      {data && <AlertDetails alert={data} />}
    </>
  )
}
