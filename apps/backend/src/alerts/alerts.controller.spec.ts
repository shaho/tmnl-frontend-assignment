import { AlertsController } from './alerts.controller'
import { AlertsService } from './alerts.service'
import { mock } from 'jest-mock-extended'
import { MockProxy } from 'jest-mock-extended/lib/Mock'
import { AlertStatus } from './dto/AlertStatus'

describe('AlertsController', () => {
  let controller: AlertsController
  let service: MockProxy<AlertsService>

  beforeEach(async () => {
    service = mock<AlertsService>()
    controller = new AlertsController(service)
  })

  it('should create an Alert successfully', async () => {
    service.create.mockReturnValue(Promise.resolve())
    await expect(
      controller.create({
        description: 'D',
        transactionId: 'N',
        createdAt: new Date(),
        status: AlertStatus.OPEN,
      })
    ).resolves.not.toThrow()
  })

  it('should throw an error if the creation of an Alert fails', async () => {
    service.create.mockReturnValue(Promise.reject('failure'))
    await expect(
      controller.create({
        description: 'D',
        transactionId: 'N',
        createdAt: new Date(),
        status: AlertStatus.OPEN,
      })
    ).rejects.toEqual('failure')
  })
})
