import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";

@Entity('sar_crud_assessment')
export class SarCrudAssessment extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  teacherId?: number;

  @Column({nullable: true})
  refId?: string;

  @Column({nullable: true})
  schoolyear?: string;

  @Column({nullable: true})
  result?: string;

  @Column({nullable: true})
  assessment?: number;

  @Column({nullable: true})
  totalStudent?: number;

  @Column({nullable: true})
  class?: string;
  @Column({nullable: true})
  assessment1?: string;
  @Column({nullable: true})
  assessment2?: string;
  @Column({nullable: true})
  assessment3?: string;
  @Column({nullable: true})
  assessment4?: string;
}
@ViewEntity({
    name:'sar_crud_assessment_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("sar_crud_assessment.id", "id")
        .addSelect("sar_crud_assessment.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar_crud_assessment.refId", "refId")
        .addSelect("sar_crud_assessment.schoolyear", "schoolyear")
        .addSelect("sar_crud_assessment.result", "result")
        .addSelect("sar_crud_assessment.assessment", "assessment")
        .addSelect("sar_crud_assessment.totalStudent", "totalStudent")
        .addSelect("sar_crud_assessment.class", "class")
        .addSelect("sar_crud_assessment.assessment1", "assessment1")
        .addSelect("sar_crud_assessment.assessment2", "assessment2")
        .addSelect("sar_crud_assessment.assessment3", "assessment3")
        .addSelect("sar_crud_assessment.assessment4", "assessment4")
        .from(SarCrudAssessment, "sar_crud_assessment")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar_crud_assessment.teacherId")
})
export class VwSarCrudAssessmentList {
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
    result: string;

    @ViewColumn()
    assessment: number;

    @ViewColumn()
    totalStudent: number;

    @ViewColumn()
    class: string;
    @ViewColumn()
    assessment1: string;
        
    @ViewColumn()
    assessment2: string;
        
    @ViewColumn()
    assessment3: string;
        
    @ViewColumn()
    assessment4: string;
}

@ViewEntity({
  name:'sar_crud_assessment_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar_crud_assessment.id", "value")
 // .addSelect("CONCAT(sar_crud_assessment.null , ' ' , sar_crud_assessment.null)", "label")
      .from(SarCrudAssessment, "sar_crud_assessment")
})
export class VwSarCrudAssessmentDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'sar_crud_assessment_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar_crud_assessment.id", "id")
        .addSelect("sar_crud_assessment.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar_crud_assessment.refId", "refId")
        .addSelect("sar_crud_assessment.schoolyear", "schoolyear")
        .addSelect("sar_crud_assessment.result", "result")
        .addSelect("sar_crud_assessment.assessment", "assessment")
        .addSelect("sar_crud_assessment.totalStudent", "totalStudent")
        .addSelect("sar_crud_assessment.class", "class")
        .addSelect("sar_crud_assessment.assessment1", "assessment1")
        .addSelect("sar_crud_assessment.assessment2", "assessment2")
        .addSelect("sar_crud_assessment.assessment3", "assessment3")
        .addSelect("sar_crud_assessment.assessment4", "assessment4")
      .from(SarCrudAssessment, "sar_crud_assessment")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar_crud_assessment.teacherId")
})
export class VwSarCrudAssessmentItem {

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
    result: string;

    @ViewColumn()
    assessment: number;

    @ViewColumn()
    totalStudent: number;

    @ViewColumn()
    class: string;

    @ViewColumn()
    assessment1: string;
        
    @ViewColumn()
    assessment2: string;
        
    @ViewColumn()
    assessment3: string;
        
    @ViewColumn()
    assessment4: string;
        
}
