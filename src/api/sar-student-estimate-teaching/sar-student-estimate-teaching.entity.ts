import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";

@Entity('sar_student_estimate_teaching')
export class SarStudentEstimateTeaching extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  teacherId?: number;

  @Column({nullable: true})
  refId?: string;

  @Column({nullable: true})
  schoolyear?: string;

  @Column({nullable: true})
  choice1?: number;

  @Column({nullable: true})
  choice2?: number;

  @Column({nullable: true})
  choice3?: number;

  @Column({nullable: true})
  choice4?: number;

  @Column({nullable: true})
  choice5?: number;

  @Column({nullable: true})
  choice6?: number;

  @Column({nullable: true})
  choice7?: number;

  @Column({nullable: true})
  choice8?: number;

  @Column({nullable: true})
  choice9?: number;

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
  result?: number;
}
@ViewEntity({
    name:'sar_student_estimate_teaching_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("sar_student_estimate_teaching.id", "id")
        .addSelect("sar_student_estimate_teaching.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar_student_estimate_teaching.refId", "refId")
        .addSelect("sar_student_estimate_teaching.schoolyear", "schoolyear")
        .addSelect("sar_student_estimate_teaching.choice1", "choice1")
        .addSelect("sar_student_estimate_teaching.choice2", "choice2")
        .addSelect("sar_student_estimate_teaching.choice3", "choice3")
        .addSelect("sar_student_estimate_teaching.choice4", "choice4")
        .addSelect("sar_student_estimate_teaching.choice5", "choice5")
        .addSelect("sar_student_estimate_teaching.choice6", "choice6")
        .addSelect("sar_student_estimate_teaching.choice7", "choice7")
        .addSelect("sar_student_estimate_teaching.choice8", "choice8")
        .addSelect("sar_student_estimate_teaching.choice9", "choice9")
        .addSelect("sar_student_estimate_teaching.choice10", "choice10")
        .addSelect("sar_student_estimate_teaching.choice11", "choice11")
        .addSelect("sar_student_estimate_teaching.choice12", "choice12")
        .addSelect("sar_student_estimate_teaching.choice13", "choice13")
        .addSelect("sar_student_estimate_teaching.choice14", "choice14")
        .addSelect("sar_student_estimate_teaching.choice15", "choice15")
        .addSelect("sar_student_estimate_teaching.choice16", "choice16")
        .addSelect("sar_student_estimate_teaching.choice17", "choice17")
        .from(SarStudentEstimateTeaching, "sar_student_estimate_teaching")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar_student_estimate_teaching.teacherId")
})
export class VwSarStudentEstimateTeachingList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    refId: string;

    @ViewColumn()
    schoolyear: string;

    @ViewColumn()
    choice1: number;

    @ViewColumn()
    choice2: number;

    @ViewColumn()
    choice3: number;

    @ViewColumn()
    choice4: number;

    @ViewColumn()
    choice5: number;

    @ViewColumn()
    choice6: number;

    @ViewColumn()
    choice7: number;

    @ViewColumn()
    choice8: number;

    @ViewColumn()
    choice9: number;

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
}

@ViewEntity({
  name:'sar_student_estimate_teaching_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar_student_estimate_teaching.id", "value")
 // .addSelect("CONCAT(sar_student_estimate_teaching.null , ' ' , sar_student_estimate_teaching.null)", "label")
      .from(SarStudentEstimateTeaching, "sar_student_estimate_teaching")
})
export class VwSarStudentEstimateTeachingDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'sar_student_estimate_teaching_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar_student_estimate_teaching.id", "id")
        .addSelect("sar_student_estimate_teaching.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar_student_estimate_teaching.refId", "refId")
        .addSelect("sar_student_estimate_teaching.schoolyear", "schoolyear")
        .addSelect("sar_student_estimate_teaching.choice1", "choice1")
        .addSelect("sar_student_estimate_teaching.choice2", "choice2")
        .addSelect("sar_student_estimate_teaching.choice3", "choice3")
        .addSelect("sar_student_estimate_teaching.choice4", "choice4")
        .addSelect("sar_student_estimate_teaching.choice5", "choice5")
        .addSelect("sar_student_estimate_teaching.choice6", "choice6")
        .addSelect("sar_student_estimate_teaching.choice7", "choice7")
        .addSelect("sar_student_estimate_teaching.choice8", "choice8")
        .addSelect("sar_student_estimate_teaching.choice9", "choice9")
        .addSelect("sar_student_estimate_teaching.choice10", "choice10")
        .addSelect("sar_student_estimate_teaching.choice11", "choice11")
        .addSelect("sar_student_estimate_teaching.choice12", "choice12")
        .addSelect("sar_student_estimate_teaching.choice13", "choice13")
        .addSelect("sar_student_estimate_teaching.choice14", "choice14")
        .addSelect("sar_student_estimate_teaching.choice15", "choice15")
        .addSelect("sar_student_estimate_teaching.choice16", "choice16")
        .addSelect("sar_student_estimate_teaching.choice17", "choice17")
        .addSelect("sar_student_estimate_teaching.choice18", "choice18")
        .addSelect("sar_student_estimate_teaching.choice19", "choice19")
        .addSelect("sar_student_estimate_teaching.choice20", "choice20")
        .addSelect("sar_student_estimate_teaching.result", "result")
      .from(SarStudentEstimateTeaching, "sar_student_estimate_teaching")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar_student_estimate_teaching.teacherId")
})
export class VwSarStudentEstimateTeachingItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    refId: string;

    @ViewColumn()
    schoolyear: string;

    @ViewColumn()
    choice1: number;

    @ViewColumn()
    choice2: number;

    @ViewColumn()
    choice3: number;

    @ViewColumn()
    choice4: number;

    @ViewColumn()
    choice5: number;

    @ViewColumn()
    choice6: number;

    @ViewColumn()
    choice7: number;

    @ViewColumn()
    choice8: number;

    @ViewColumn()
    choice9: number;

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
    result: number;
}
