import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Address } from "./address.entity";
import { Post } from "src/posts/entities/post.entity";
import { PublicFile } from "src/files/publicFile.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({unique: true})
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public age: number;
  
  @Column()
  public sex: string;

  @Column({
    nullable: true
  })
  @Exclude()
  public currentHashedRefreshToken?: string

  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true
  })
  @JoinColumn()
  public avatar?: PublicFile;

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  public comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdDate: Date;
 
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedDate: Date;
  
}
