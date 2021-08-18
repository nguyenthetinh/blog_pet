import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({unique: true})
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public age: number;
  
  @Column()
  public sex: string;

  @Column()
  public address: string;
}
