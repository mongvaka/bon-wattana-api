import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { ClassroomType } from "../classroom-type/classroom-type.entity";
import { Classroom } from "../classroom/classroom.entity";
import { Student } from "../student/student.entity";

@Entity('sdq_table')
export class SdqTable extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  atSemester?: string;

  @Column({nullable: true})
  atYear?: string;

  @Column({nullable: true})
  evaluateId?: number;

  @Column({nullable: true})
  evaluateDate?: Date;

  @Column({nullable: true})
  estimateType?: number;

  @Column({nullable: true})
  choice01?: number;

  @Column({nullable: true})
  choice02?: number;

  @Column({nullable: true})
  choice03?: number;

  @Column({nullable: true})
  choice04?: number;

  @Column({nullable: true})
  choice05?: number;

  @Column({nullable: true})
  choice06?: number;

  @Column({nullable: true})
  choice07?: number;

  @Column({nullable: true})
  choice08?: number;

  @Column({nullable: true})
  choice09?: number;

  @Column({nullable: true})
  choice10?: number;

  @Column({nullable: true})
  choice11?: number;

  @Column({nullable: true})
  choice12?: number;

  @Column({nullable: true})
  choice13?: number;

  @Column({nullable: true})
  choice14?: number;

  @Column({nullable: true})
  choice15?: number;

  @Column({nullable: true})
  choice16?: number;

  @Column({nullable: true})
  choice17?: number;

  @Column({nullable: true})
  choice18?: number;

  @Column({nullable: true})
  choice19?: number;

  @Column({nullable: true})
  choice20?: number;

  @Column({nullable: true})
  choice21?: number;

  @Column({nullable: true})
  choice22?: number;

  @Column({nullable: true})
  choice23?: number;

  @Column({nullable: true})
  choice24?: number;

  @Column({nullable: true})
  choice25?: number;

    @Column({nullable: true})
  emotionalBehaviorScore01: number;
 
    @Column({nullable: true})
  nomalBehaviorScore02: number;

    @Column({nullable: true})
  ADHDBehaviorScore03: number;

    @Column({nullable: true})
  friendBehaviorScore04: number;

    @Column({nullable: true})
  socialBehaviorScore05: number;

  @Column({nullable: true})
  emotionalBehaviorScore01_value: string;
 
    @Column({nullable: true})
  nomalBehaviorScore02_value: string;

    @Column({nullable: true})
  ADHDBehaviorScore03_value: string;

    @Column({nullable: true})
  friendBehaviorScore04_value: string;

    @Column({nullable: true})
  socialBehaviorScore05_value: string;
}
@ViewEntity({
    name:'sdq_table_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
    .select("student.id", "id")
    .addSelect("student.studentCode", "studentCode")
    .addSelect("CONCAT(student.firstname,' ',student.lastname) ", "nameValue")
    .addSelect("CONCAT(classroom_type.typeName,'/',classroom.name)", "classroomValue")
    .addSelect("student.classroomId", "classroomId")
    .addSelect("student.classroomTypeId", "classroomTypeId")
    .from(Student, "student")
    .leftJoin(Classroom, "classroom","classroom.Id = student.classroomId")
    .leftJoin(ClassroomType, "classroom_type","classroom_type.Id = student.classroomTypeId")
})
export class VwSdqTableList {
  @ViewColumn()
  id: number;
  @ViewColumn()
  nameValue: number;
  @ViewColumn()
  classroomId: number;
  @ViewColumn()
  classroomTypeId: number;
  @ViewColumn()
  studentCode: string;
  @ViewColumn()
  classroomValue: string;

  //SELECT id, "studentId", "atSemester", "atYear", "evaluateId", "evaluateDate", "estimateType", choice01, choice02, choice03, choice04, choice05, choice06, choice07, choice08, choice09, choice10, choice11, choice12, choice13, choice14, choice15, choice16, choice17, choice18, choice19, choice20, choice21, choice22, choice23, choice24, choice25, "emotionalBehaviorScore01", "nomalBehaviorScore02", "ADHDBehaviorScore03", "friendBehaviorScore04", "socialBehaviorScore05", "emotionalBehaviorScore01_value", "nomalBehaviorScore02_value", "ADHDBehaviorScore03_value", "friendBehaviorScore04_value", "socialBehaviorScore05_value"
 //FROM sdq_table;
 /*
  @ViewColumn()
  emotionalBehaviorScore01: number;
 
  @ViewColumn()
  nomalBehaviorScore02: number;

  @ViewColumn()
  ADHDBehaviorScore03: number;

  @ViewColumn()
  friendBehaviorScore04: number;

  @ViewColumn()
  socialBehaviorScore05: number;

  @ViewColumn()
  emotionalBehaviorScore01_value: string;
 
  @ViewColumn()
  nomalBehaviorScore02_value: string;

  @ViewColumn()
  ADHDBehaviorScore03_value: string;

  @ViewColumn()
  friendBehaviorScore04_value: string;

  @ViewColumn()
  socialBehaviorScore05_value: string;
 
  @ViewColumn()
  choice01: number;

  @ViewColumn()
  choice02: number;

  @ViewColumn()
  choice03: number;

  @ViewColumn()
  choice04: number;

  @ViewColumn()
  choice05: number;

  @ViewColumn()
  choice06: number;

  @ViewColumn()
  choice07: number;

  @ViewColumn()
  choice08: number;

  @ViewColumn()
  choice09: number;

  @ViewColumn()
  choice10: number;

  @ViewColumn()
  choice11: number;

  @ViewColumn()
  choice12: number;

  @ViewColumn()
  choice13: number;

  @ViewColumn()
  choice14: number;

  @ViewColumn()
  choice15: number;

  @ViewColumn()
  choice16: number;

  @ViewColumn()
  choice17: number;

  @ViewColumn()
  choice18: number;

  @ViewColumn()
  choice19: number;

  @ViewColumn()
  choice20: number;

  @ViewColumn()
  choice21: number;

  @ViewColumn()
  choice22: number;

  @ViewColumn()
  choice23: number;

  @ViewColumn()
  choice24: number;

  @ViewColumn()
  choice25: number;
  */

}

@ViewEntity({
  name:'sdq_table_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sdq_table.id", "value")
 // .addSelect("CONCAT(sdq_table.null , ' ' , sdq_table.null)", "label")
      .from(SdqTable, "sdq_table")
})
export class VwSdqTableDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'sdq_table_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sdq_table.id", "id")
        .addSelect("sdq_table.studentId", "studentId")
        .addSelect("sdq_table.atSemester", "atSemester")
        .addSelect("sdq_table.atYear", "atYear")
        .addSelect("sdq_table.evaluateId", "evaluateId")
        .addSelect("sdq_table.evaluateDate", "evaluateDate")
        .addSelect("sdq_table.estimateType", "estimateType")
        .addSelect("sdq_table.choice01", "choice01")
        .addSelect("sdq_table.choice02", "choice02")
        .addSelect("sdq_table.choice03", "choice03")
        .addSelect("sdq_table.choice04", "choice04")
        .addSelect("sdq_table.choice05", "choice05")
        .addSelect("sdq_table.choice06", "choice06")
        .addSelect("sdq_table.choice07", "choice07")
        .addSelect("sdq_table.choice08", "choice08")
        .addSelect("sdq_table.choice09", "choice09")
        .addSelect("sdq_table.choice10", "choice10")
        .addSelect("sdq_table.choice11", "choice11")
        .addSelect("sdq_table.choice12", "choice12")
        .addSelect("sdq_table.choice13", "choice13")
        .addSelect("sdq_table.choice14", "choice14")
        .addSelect("sdq_table.choice15", "choice15")
        .addSelect("sdq_table.choice16", "choice16")
        .addSelect("sdq_table.choice17", "choice17")
        .addSelect("sdq_table.choice18", "choice18")
        .addSelect("sdq_table.choice19", "choice19")
        .addSelect("sdq_table.choice20", "choice20")
        .addSelect("sdq_table.choice21", "choice21")
        .addSelect("sdq_table.choice22", "choice22")
        .addSelect("sdq_table.choice23", "choice23")
        .addSelect("sdq_table.choice24", "choice24")
        .addSelect("sdq_table.choice25", "choice25")
        .addSelect("CONCAT(student.firstname,' ',student.lastname) ", "nameValue")
      .from(SdqTable, "sdq_table")
      .leftJoin(Student, "student","student.Id = sdq_table.studentId")
/* .addSelect("student.studentCode", "studentCode")
    .addSelect("CONCAT(student.firstname,' ',student.lastname) ", "nameValue")
    .addSelect("CONCAT(classroom_type.typeName,'/',classroom.name)", "classroomValue")
    .addSelect("student.classroomId", "classroomId")
    .addSelect("student.classroomTypeId", "classroomTypeId")
    .from(Student, "student")
    .leftJoin(Classroom, "classroom","classroom.Id = student.classroomId")
    .leftJoin(ClassroomType, "classroom_type","classroom_type.Id = student.classroomTypeId")
}) */
})
export class VwSdqTableItem {
  @ViewColumn()
  nameValue: string;

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    atSemester: string;

    @ViewColumn()
    atYear: string;

    @ViewColumn()
    evaluateId: number;

    @ViewColumn()
    evaluateDate: Date;

    @ViewColumn()
    estimateType: number;

    @ViewColumn()
    choice01: number;

    @ViewColumn()
    choice02: number;

    @ViewColumn()
    choice03: number;

    @ViewColumn()
    choice04: number;

    @ViewColumn()
    choice05: number;

    @ViewColumn()
    choice06: number;

    @ViewColumn()
    choice07: number;

    @ViewColumn()
    choice08: number;

    @ViewColumn()
    choice09: number;

    @ViewColumn()
    choice10: number;

    @ViewColumn()
    choice11: number;

    @ViewColumn()
    choice12: number;

    @ViewColumn()
    choice13: number;

    @ViewColumn()
    choice14: number;

    @ViewColumn()
    choice15: number;

    @ViewColumn()
    choice16: number;

    @ViewColumn()
    choice17: number;

    @ViewColumn()
    choice18: number;

    @ViewColumn()
    choice19: number;

    @ViewColumn()
    choice20: number;

    @ViewColumn()
    choice21: number;

    @ViewColumn()
    choice22: number;

    @ViewColumn()
    choice23: number;

    @ViewColumn()
    choice24: number;

    @ViewColumn()
    choice25: number;
}
