import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sales } from './sales.entity'

// import {Products} from './products.entity'

@Entity('product_sales')
export class Product_sales {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  product_id: string

  @Column({ unique: true })
  sales_id: string

  @ManyToOne((sales) => sales.id)
  sales: Sales

  // @ManyToOne((products) => Stock)
  // products: Stock
}
