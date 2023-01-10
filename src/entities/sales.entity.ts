import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sales")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer" })
  amount: number;

  @Column({ type: "float" })
  value: number;
  // Falta os joins com as tabelas, users, clients, products.
}
