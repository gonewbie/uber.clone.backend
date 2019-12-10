import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'double precision', default: 0 })
  lat: number;

  @Column({ type: 'double precision', default: 0 })
  lng: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'boolean' })
  isFav: boolean;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
}

export default Place;