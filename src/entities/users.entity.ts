import { Exclude } from 'class-transformer'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { hashSync } from 'bcryptjs'
import { Stock } from './stock.entity'
import { Clients } from './clients.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comercialName: string

  @Column({ unique: true })
  cnpj: string

  @Column()
  @Exclude()
  password: string

  @Column({ unique: true })
  email: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => Stock, (stock) => stock.user)
  stock: Stock

  @OneToMany(() => Clients, (clients) => clients.user)
  clients: Clients

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
