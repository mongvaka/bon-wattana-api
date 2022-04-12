import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BasicData} from "../shared/entities/basic-data";
import {DepartmentCode} from "./department-code.entity";
import {Users} from "./users.entity";

@Entity('TYPE_CODE')
export class TypeCode extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint', name: 'ID'})
  id: number;

  @Column({name: 'NAME', nullable: false, length: 65})
  name: string;

  @ManyToMany(() => DepartmentCode)
  @JoinTable({
    name: "TYPE_CODE_HAS_DEPARTMENT_CODE",
    joinColumn: {
      name: "TYPE_CODE_ID",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "DEPARTMENT_CODE_ID",
      referencedColumnName: "id"
    }
  })
  departmentCodes: DepartmentCode[]
}