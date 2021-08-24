import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public content: string;

  @Column()
  public title: string;
}
