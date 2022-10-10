import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('student_scolar')
export class StudentScolar extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  amount?: number;

  @Column({nullable: true})
  year?: string;

  @Column({nullable: true})
  getFrom?: string;
}
@ViewEntity({
    name:'student_scolar_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student_scolar.id", "id")
        .addSelect("student_scolar.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("student_scolar.name", "name")
        .addSelect("student_scolar.amount", "amount")
        .addSelect("student_scolar.year", "year")
        .addSelect("student_scolar.getFrom", "getFrom")
        .from(StudentScolar, "student_scolar")
        .leftJoin(Student, "student_id","student_id.Id = student_scolar.studentId")
})
export class VwStudentScolarList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    amount: number;

    @ViewColumn()
    year: string;

    @ViewColumn()
    getFrom: string;
}

@ViewEntity({
  name:'student_scolar_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_scolar.id", "value")
  .addSelect("CONCAT(student_scolar.name , ' ' , student_scolar.amount)", "label")
      .from(StudentScolar, "student_scolar")
})
export class VwStudentScolarDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'student_scolar_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_scolar.id", "id")
        .addSelect("student_scolar.studentId", "studentId")
        .addSelect("student_id.classroomId", "classroomId")
        .addSelect("student_id.classroomTypeId", "classroomTypeId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("student_scolar.name", "name")
        .addSelect("student_scolar.amount", "amount")
        .addSelect("student_scolar.year", "year")
        .addSelect("student_scolar.getFrom", "getFrom")
      .from(StudentScolar, "student_scolar")
        .leftJoin(Student, "student_id","student_id.Id = student_scolar.studentId")
})
export class VwStudentScolarItem {

  @ViewColumn()
    id: number;
    @ViewColumn()
    classroomTypeId: number;
    @ViewColumn()
    classroomId: number;
    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    amount: number;

    @ViewColumn()
    year: string;

    @ViewColumn()
    getFrom: string;
}
