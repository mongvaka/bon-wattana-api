import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('parent')
export class Parent extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  title?: number;

  @Column({nullable: true})
  firstName?: string;

  @Column({nullable: true})
  lastName?: string;

  @Column({nullable: false})
  personalCode?: string;

  @Column({nullable: false})
  bloodType?: number;

  @Column({nullable: false})
  occupation?: string;

  @Column({nullable: false})
  income?: number;

  @Column({nullable: true})
  phoneNumber?: string;

  @Column({nullable: false})
  type?: number;

  @Column({nullable: true})
  studentId?: number;
}
@ViewEntity({
    name:'parent_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("parent.id", "id")
        .addSelect("parent.title", "title")
        .addSelect("parent.firstName", "firstName")
        .addSelect("parent.lastName", "lastName")
        .addSelect("parent.bloodType", "bloodType")
        .addSelect("parent.studentId", "studentId")
        .from(Parent, "parent")
})
export class VwParentList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;

    @ViewColumn()
    bloodType: number;

    @ViewColumn()
    studentId: number;
}

@ViewEntity({
  name:'parent_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("parent.id", "value")
  .addSelect("CONCAT(parent.firstName , '[' , parent.lastName, ']')", "label")
      .from(Parent, "parent")
})
export class VwParentDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'parent_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("parent.id", "id")
        .addSelect("parent.title", "title")
        .addSelect("parent.firstName", "firstName")
        .addSelect("parent.lastName", "lastName")
        .addSelect("parent.personalCode", "personalCode")
        .addSelect("parent.bloodType", "bloodType")
        .addSelect("parent.occupation", "occupation")
        .addSelect("parent.income", "income")
        .addSelect("parent.phoneNumber", "phoneNumber")
        .addSelect("parent.type", "type")
        .addSelect("parent.studentId", "studentId")
      .from(Parent, "parent")
})
export class VwParentItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;

    @ViewColumn()
    personalCode: string;

    @ViewColumn()
    bloodType: number;

    @ViewColumn()
    occupation: string;

    @ViewColumn()
    income: number;

    @ViewColumn()
    phoneNumber: string;

    @ViewColumn()
    type: number;

    @ViewColumn()
    studentId: number;
}
