import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  amount: number;

  //Preciza da entidade de user
  @Column()
  user: string;
}

export default Stock;
