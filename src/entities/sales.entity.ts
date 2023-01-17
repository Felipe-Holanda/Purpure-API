import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Clients } from './clients.entity'
import { Product_sales } from './product_sales.entity'

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

  @ManyToOne(() => Clients, (clients) => clients.id)
  clients: Clients

  @OneToMany(() => Product_sales, (product_sales) => product_sales.sales)
  product_sales: Product_sales
}
