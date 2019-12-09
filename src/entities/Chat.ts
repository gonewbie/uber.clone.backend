import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import Message from './Message';
import User from './User';

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[]

  @OneToMany(type => User, user => user.chat)
  participants: User[]

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
}

export default Chat;