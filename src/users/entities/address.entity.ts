import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public street: string

  @Column()
  public city: string

  @Column()
  public country: string

  @OneToOne(() => User, (user: User) => user.address)
  public user: User

  @CreateDateColumn({ type: 'timestamp' })
  public createdDate: Date;
 
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedDate: Date;
}