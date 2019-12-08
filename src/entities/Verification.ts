import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { verificationTypes } from '../types/types';


@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text', enum: ['EMAIL', 'PHONE'] })
  target: verificationTypes;

  @Column({ type: 'text' })
  payload: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'boolean' })
  used: string;

  @CreateDateColumn() createAt: string;

  @UpdateDateColumn() updateAt: string;
}

export default Verification;