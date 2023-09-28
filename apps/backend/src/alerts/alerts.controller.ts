import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'
import { AlertsService } from './alerts.service'
import { CreateAlertDto } from './dto/create-alert.dto'
import { UpdateAlertDto } from './dto/update-alert.dto'
import { Pagination } from 'nestjs-typeorm-paginate'
import { Alert } from './entities/alert.entity'
import { ApiQuery } from '@nestjs/swagger'
import { ApiOkResponsePaginated } from '../util/swagger'
import { AlertStatus } from './dto/AlertStatus'

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto)
  }

  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'filterStatus', type: 'string', required: false })
  @ApiOkResponsePaginated(Alert)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(Number.MAX_VALUE), ParseIntPipe) limit = Number.MAX_VALUE,
    @Query('filterStatus') filterStatus: AlertStatus
  ): Promise<Pagination<Alert>> {
    limit = limit > Number.MAX_VALUE ? Number.MAX_VALUE : limit
    return this.alertsService.findAll({ page, limit }, filterStatus)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.update(id, updateAlertDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(id)
  }
}
