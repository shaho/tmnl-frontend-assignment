import { Injectable } from '@nestjs/common'
import { CreateAlertDto } from './dto/create-alert.dto'
import { UpdateAlertDto } from './dto/update-alert.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Alert } from './entities/alert.entity'
import { Repository } from 'typeorm'
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { AlertStatus } from './dto/AlertStatus'

@Injectable()
export class AlertsService {
  public constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>
  ) {}

  async create(dto: CreateAlertDto) {
    const entity = new Alert()
    entity.description = dto.description
    entity.transactionId = dto.transactionId
    entity.createdAt = dto.createdAt
    entity.status = dto.status
    await this.alertRepository.save(entity)
  }

  async findAll(options: IPaginationOptions, filterStatus?: AlertStatus) {
    let builder = this.alertRepository.createQueryBuilder('alert').orderBy('alert.id', 'DESC')

    if (filterStatus !== undefined) {
      builder = builder.where('alert.status = :status', { status: filterStatus })
    }

    return paginate<Alert>(builder, options)
  }

  async findOne(id: string) {
    return this.alertRepository.findOneBy({ id })
  }

  update(id: string, updateAlertDto: UpdateAlertDto) {
    return this.alertRepository.update({ id }, updateAlertDto)
  }

  remove(id: string) {
    return this.alertRepository.delete({ id })
  }
}
