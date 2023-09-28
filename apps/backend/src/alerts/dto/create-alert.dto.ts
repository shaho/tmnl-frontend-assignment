import { AlertStatus } from './AlertStatus'

export class CreateAlertDto {
  description: string
  transactionId: string
  createdAt: Date
  status: AlertStatus
}
