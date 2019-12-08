import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne
} from 'typeorm';
import { verificationTypes } from '../types/types';
import User from './User';

const PHONE = 'PHONE';
const EMAIL = 'EMAIL';

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text', enum: [EMAIL, PHONE] })
  target: verificationTypes;

  @Column({ type: 'text' })
  payload: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'boolean' })
  used: string;

  @ManyToOne(type => User, user => user.verifications)
  user: User;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 10000).toString();
    } else if (this.target === EMAIL) {
      this.key = Math.random().toString(36).substr(2);
    }
  }
}

export default Verification;