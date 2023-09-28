import { AlertsService } from './alerts.service'
import { MockProxy } from 'jest-mock-extended/lib/Mock'
import { Alert } from './entities/alert.entity'
import { Repository } from 'typeorm'
import { mock } from 'jest-mock-extended'
import { AlertStatus } from './dto/AlertStatus'

describe('AlertsService', () => {
  let service: AlertsService
  let repository: MockProxy<Repository<Alert>>

  beforeEach(async () => {
    repository = mock<Repository<Alert>>()
    service = new AlertsService(repository)
  })

  it('should create an Alert successfully', async () => {
    repository.save.mockResolvedValue({
      id: 'A',
      transactionId: 'N',
      description: 'D',
      createdAt: new Date(),
      status: AlertStatus.OPEN,
    })
    await expect(
      service.create({
        description: 'D',
        transactionId: 'N',
        createdAt: new Date(),
        status: AlertStatus.OPEN,
      })
    ).resolves.not.toThrow()
  })

  it('should throw an error if the creation of an Alert fails', async () => {
    repository.save.mockReturnValue(Promise.reject('failure'))
    await expect(
      service.create({
        description: 'D',
        transactionId: 'N',
        createdAt: new Date(),
        status: AlertStatus.OPEN,
      })
    ).rejects.toEqual('failure')
  })
})
