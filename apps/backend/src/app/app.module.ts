import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlertsModule } from '../alerts/alerts.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AlertsModule,
  ],
})
export class AppModule {}
