import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BasicData} from "../shared/entities/basic-data";

@Entity('USERS')
export class Users extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint', name: 'ID'})
  id: number;

  @Column({name: 'USERNAME', nullable: false, length: 65})
  username: string;
  @Column({name: 'PASSWORD', nullable: false})
  password: string;
  @Column({name: 'TOKEN', nullable: true})
  token: string;

}