import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { AlertStatus } from '../dto/AlertStatus'

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    nullable: true,
  })
  public transactionId: string

  @Column({
    nullable: true,
  })
  public description: string

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date

  @Column({
    type: 'text',
    enum: AlertStatus,
    nullable: false,
    default: AlertStatus.OPEN,
  })
  public status: AlertStatus
}
