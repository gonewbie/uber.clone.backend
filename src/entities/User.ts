import { IsEmail } from 'class-validator';
import {
  BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity
} from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: 'text' })
  profilePhoto: string;

  @Column({ type: 'boolean', default: false })
  isDriving: boolean;

  @Column({ type: 'boolean', default: false })
  isRiding: boolean;

  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;

  @Column({ type: 'double precision', default: 0 })
  lastLat: number;

  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  get fullName() : string {
    return `${this.firstName} ${this.lastName}`
  }

  @CreateDateColumn() createAt: string;

  @UpdateDateColumn() updateAt: string;
}

export default User;