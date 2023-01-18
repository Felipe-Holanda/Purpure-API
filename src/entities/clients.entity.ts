import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Sales } from './sales.entity'
import { User } from './users.entity'

@Entity('Clients')
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  document: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone: string

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => User, (user) => user.clients)
  user: User

  @OneToMany(() => Sales, (sales) => sales.clients)
  sales: Sales[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
