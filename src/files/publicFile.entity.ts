import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public url: string

  @Column()
  public key: string
}