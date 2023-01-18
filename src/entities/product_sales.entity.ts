import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sales } from './sales.entity'
import Stock from './stock.entity'

@Entity('product_sales')
export class Product_sales {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Sales, (sales) => sales.product_sales)
  sales: Sales

  @ManyToOne(() => Stock, (stock) => stock.product_sales)
  products: Stock
}
