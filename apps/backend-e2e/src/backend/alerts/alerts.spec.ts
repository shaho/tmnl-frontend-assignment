import { AlertStatus } from './../../../../backend/src/alerts/dto/AlertStatus'
import { mock, MockProxy, mockReset } from 'jest-mock-extended'
import request from 'supertest'
import { Alert } from '../../../../backend/src/alerts/entities/alert.entity'
import { Repository } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { createProjectTestingModule } from '../../support/project-testing-module'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('Alerts e2e', () => {
  let app: INestApplication
  let alertRepository: MockProxy<Repository<Alert>>

  beforeAll(async () => {
    alertRepository = mock<Repository<Alert>>()
    const moduleRef = await createProjectTestingModule([Alert])
      .overrideProvider(getRepositoryToken(Alert))
      .useValue(alertRepository)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  beforeEach(() => {
    mockReset(alertRepository)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should retrieve a single alert successfully', async () => {
    const expectedData: Alert = {
      id: 'A',
      transactionId: 'N',
      description: 'D',
      createdAt: new Date(),
      status: AlertStatus.OPEN,
    }
    alertRepository.findOneBy.mockResolvedValue(expectedData)

    return request(app.getHttpServer()).get('/alerts/A').expect(200).expect(JSON.stringify(expectedData))
  })
})
