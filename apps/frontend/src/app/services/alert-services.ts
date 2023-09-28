import axios from 'axios'

import { Alert, Pagination } from '../types'

export const getAlerts = (
  limit = 10,
  page = 1,
  filterStatus?: string
): Promise<{ items: Alert[]; meta: Pagination }> => {
  let url = `/api/alerts?limit=${limit}&page=${page}`
  if (filterStatus) {
    url = url + `&filterStatus=${filterStatus}`
  }
  return axios.get(url).then((response) => response.data)
}

export const getAlert = (alertId: Alert['id']) => axios.get(`/api/alerts/${alertId}`).then((response) => response.data)

export const addAlert = (alert: Alert) => axios.post('/api/alerts/', alert)
