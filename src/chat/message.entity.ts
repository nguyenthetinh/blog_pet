import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
 
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public content: string;
 
  @ManyToOne(() => User)
  public author: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdDate: Date;
 
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedDate: Date;
}