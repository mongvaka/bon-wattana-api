import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('scholarship')
export class Scholarship extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  scholarshipName?: string;

  @Column({nullable: false})
  getFrom?: string;

  @Column({nullable: false})
  type?: number;

  @Column({nullable: true})
  recieveDate?: Date;

  @Column({nullable: true})
  amount?: number;

  @Column({nullable: false})
  detail?: string;
}
@ViewEntity({
    name:'scholarship_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("scholarship.id", "id")
        .addSelect("scholarship.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("scholarship.scholarshipName", "scholarshipName")
        .addSelect("scholarship.getFrom", "getFrom")
        .addSelect("scholarship.type", "type")
        .addSelect("scholarship.recieveDate", "recieveDate")
        .addSelect("scholarship.amount", "amount")
        .addSelect("scholarship.detail", "detail")
        .from(Scholarship, "scholarship")
        .leftJoin(Student, "student_id","student_id.Id = scholarship.studentId")
})
export class VwScholarshipList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    scholarshipName: string;

    @ViewColumn()
    getFrom: string;

    @ViewColumn()
    type: number;

    @ViewColumn()
    recieveDate: Date;

    @ViewColumn()
    amount: number;

    @ViewColumn()
    detail: string;
}

@ViewEntity({
  name:'scholarship_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("scholarship.id", "value")
  .addSelect("CONCAT(scholarship.scholarshipName , '[' , scholarship.type, ']')", "label")
      .from(Scholarship, "scholarship")
})
export class VwScholarshipDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'scholarship_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("scholarship.id", "id")
        .addSelect("scholarship.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("scholarship.scholarshipName", "scholarshipName")
        .addSelect("scholarship.getFrom", "getFrom")
        .addSelect("scholarship.type", "type")
        .addSelect("scholarship.recieveDate", "recieveDate")
        .addSelect("scholarship.amount", "amount")
        .addSelect("scholarship.detail", "detail")
      .from(Scholarship, "scholarship")
        .leftJoin(Student, "student_id","student_id.Id = scholarship.studentId")
})
export class VwScholarshipItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    scholarshipName: string;

    @ViewColumn()
    getFrom: string;

    @ViewColumn()
    type: number;

    @ViewColumn()
    recieveDate: Date;

    @ViewColumn()
    amount: number;

    @ViewColumn()
    detail: string;
}
