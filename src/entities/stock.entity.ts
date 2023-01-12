import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

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

  @ManyToOne(() => User, (user) => user.stock)
  user: User;
}

export default Stock;
