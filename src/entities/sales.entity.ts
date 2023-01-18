import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { StockSales } from './stockSales.entity'
import { Clients } from './clients.entity'

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

  @ManyToOne(() => Clients, (clients) => clients.sales)
  client: Clients

  @OneToMany(() => StockSales, (stockSales) => stockSales.sale)
  stockSales: StockSales[]
}
