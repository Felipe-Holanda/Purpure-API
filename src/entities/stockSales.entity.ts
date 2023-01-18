import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sales } from './sales.entity'
import { Stock } from './stock.entity'

@Entity('stockSales')
export class StockSales {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Sales, (sales) => sales.stockSales)
  sale: Sales

  @ManyToOne(() => Stock, (stock) => stock.stockSales)
  stock: Stock
}
