import { BasicData } from "../shared/entities/basic-data";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TypeCode} from "./type-code.entity";

@Entity('DEPARTMENT_CODE')
export class DepartmentCode extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint', name: 'ID'})
  id: number;

  @Column({name: 'NAME', nullable: false, length: 65})
  name: string;
}