import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sales } from './sales.entity'
import Stock from './stock.entity'

// import {Products} from './products.entity'

@Entity("product_sales")
export class Product_sales {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  product_id: string;

  @Column({ unique: true })
  sales_id: string;

  @ManyToOne((sales) => sales)
  sales: Sales

  @ManyToOne((stock) => stock)
  products: Stock
}
