import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BasicData} from "../shared/entities/basic-data";
@Entity('USERS')
export class Users extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;
  @Column({ nullable: true, length: 65})
  username: string;

  @Column({ nullable: true})
  password: string;
  @Column({ nullable: true})
  token: string;
  @Column({ nullable: true})
  firstname?:string;
  @Column({nullable: true})
  lastname?:string;
  @Column({nullable: true})
  type?:string;
}