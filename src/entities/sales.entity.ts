import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { date } from 'yup'

@Entity('sales')
export class Sales {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer' })
  amount: number

  @Column({ type: 'float' })
  value: number

  @CreateDateColumn()
  createdAt: Date

  // Join com as entities
  // Clientes one to many
  //  produtos tabela pivo one to many
}
