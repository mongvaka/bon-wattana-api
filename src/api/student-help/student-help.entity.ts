import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('student_help')
export class StudentHelp extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  activityName?: string;

  @Column({nullable: true})
  startDate?: Date;

  @Column({nullable: true})
  endDate?: Date;

  @Column({nullable: true})
  resultHelpType?: number;

  @Column({nullable: true})
  resultText?: string;
}
@ViewEntity({
    name:'student_help_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student_help.id", "id")
        .addSelect("student_help.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("student_help.activityName", "activityName")
        .addSelect("student_help.startDate", "startDate")
        .addSelect("student_help.endDate", "endDate")
        .addSelect("student_help.resultHelpType", "resultHelpType")
        .addSelect("student_help.resultText", "resultText")
        .from(StudentHelp, "student_help")
        .leftJoin(Student, "student_id","student_id.Id = student_help.studentId")
})
export class VwStudentHelpList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    activityName: string;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    endDate: Date;

    @ViewColumn()
    resultHelpType: number;

    @ViewColumn()
    resultText: string;
}

@ViewEntity({
  name:'student_help_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_help.id", "value")
  .addSelect("CONCAT(student_help.endDate , ' ' , student_help.resultHelpType)", "label")
      .from(StudentHelp, "student_help")
})
export class VwStudentHelpDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'student_help_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_help.id", "id")
        .addSelect("student_help.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("student_help.activityName", "activityName")
        .addSelect("student_help.startDate", "startDate")
        .addSelect("student_help.endDate", "endDate")
        .addSelect("student_help.resultHelpType", "resultHelpType")
        .addSelect("student_help.resultText", "resultText")
      .from(StudentHelp, "student_help")
        .leftJoin(Student, "student_id","student_id.Id = student_help.studentId")
})
export class VwStudentHelpItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    activityName: string;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    endDate: Date;

    @ViewColumn()
    resultHelpType: number;

    @ViewColumn()
    resultText: string;
}
