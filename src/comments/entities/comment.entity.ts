import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  public post: Post

  @ManyToMany(() => User, (user: User) => user.comments)
  public user: User

  @CreateDateColumn({ type: 'timestamp' })
  public createdDate: Date;
 
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedDate: Date;
}
