import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";

@Entity('student_support')
export class StudentSupport extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  startDate?: Date;

  @Column({nullable: true})
  endDate?: Date;

  @Column({nullable: true})
  activityName?: string;

  @Column({nullable: true})
  performance?: number;

  @Column({nullable: true})
  department?: string;

  @Column({nullable: true})
  result?: string;

  @Column({nullable: true})
  teacherId?: number;
}
@ViewEntity({
    name:'student_support_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student_support.id", "id")
        .addSelect("student_support.startDate", "startDate")
        .addSelect("student_support.endDate", "endDate")
        .addSelect("student_support.activityName", "activityName")
        .addSelect("student_support.performance", "performance")
        .addSelect("student_support.department", "department")
        .addSelect("student_support.result", "result")
        .addSelect("student_support.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .from(StudentSupport, "student_support")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = student_support.teacherId")
})
export class VwStudentSupportList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    endDate: Date;

    @ViewColumn()
    activityName: string;

    @ViewColumn()
    performance: number;

    @ViewColumn()
    department: string;

    @ViewColumn()
    result: string;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;
}

@ViewEntity({
  name:'student_support_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_support.id", "value")
  .addSelect("CONCAT(student_support.activityName , ' ' , student_support.performance)", "label")
      .from(StudentSupport, "student_support")
})
export class VwStudentSupportDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'student_support_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_support.id", "id")
        .addSelect("student_support.startDate", "startDate")
        .addSelect("student_support.endDate", "endDate")
        .addSelect("student_support.activityName", "activityName")
        .addSelect("student_support.performance", "performance")
        .addSelect("student_support.department", "department")
        .addSelect("student_support.result", "result")
        .addSelect("student_support.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
      .from(StudentSupport, "student_support")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = student_support.teacherId")
})
export class VwStudentSupportItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    endDate: Date;

    @ViewColumn()
    activityName: string;

    @ViewColumn()
    performance: number;

    @ViewColumn()
    department: string;

    @ViewColumn()
    result: string;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;
}
