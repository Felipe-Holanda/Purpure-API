import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { StockSales } from './stockSales.entity'
import { User } from './users.entity'

@Entity('stock')
class Stock {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  stock: number

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => User, (user) => user.stock)
  user: User

  @OneToMany(() => StockSales, (stockSales) => stockSales.stock)
  stockSales: StockSales[]
}

export { Stock }
