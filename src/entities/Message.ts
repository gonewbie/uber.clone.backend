import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Chat from './Chat';
import User from './User';

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
}

export default Message;