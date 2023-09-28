export const alertStatuses = ['OPEN', 'CLOSED'] as const

export type AlertStatus = typeof alertStatuses[number]

export type Alert = {
  id?: string
  transactionId: string
  description: string
  status: AlertStatus
}

export type Pagination = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
