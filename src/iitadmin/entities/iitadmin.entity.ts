import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { RoleType } from './roleType';

@Entity()
export class IITadmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.PROGRAMS })
  office: RoleType;

  @Column()
  password: string;
}
