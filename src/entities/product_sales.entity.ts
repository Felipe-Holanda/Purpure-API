import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sales } from './sales.entity'
import Stock from './stock.entity'

// import {Products} from './products.entity'

@Entity("product_sales")
export class Product_sales {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Sales, (sales) => sales.id) 
  sales: Sales

  @ManyToOne(() => Stock, (stock) => stock.id)
  products: Stock
}
