import { PrimaryGeneratedColumn, Column, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdDate: Date;
 
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedDate: Date;
}