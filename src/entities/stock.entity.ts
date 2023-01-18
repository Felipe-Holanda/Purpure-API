import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product_sales } from './product_sales.entity'
import { User } from './users.entity'

@Entity('products')
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

  @OneToMany(() => Product_sales, (product) => product.products)
  product_sales: Product_sales[]
}

export default Stock
