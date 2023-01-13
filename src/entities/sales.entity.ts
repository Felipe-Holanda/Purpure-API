import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product_sales } from './product_sales.entity'
// import {Clients} from './clients.entity'

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

  // @ManyToOne((clients) => clients.id)
  // clients: Clients

  @OneToMany(() => Product_sales, (salesId) => salesId.sales_id)
  sales_id: Product_sales[]
}
