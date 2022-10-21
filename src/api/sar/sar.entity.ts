import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";

@Entity('sar')
export class Sar extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  teacherId?: number;

  @Column({nullable: true})
  refId?: string;

  @Column({nullable: true})
  schoolyear?: string;

    @Column({nullable: true})
  sarCoursesYearTermToTalSubject?:number
    @Column({nullable: true})
sarCoursesYearTermToTalActivities?:number
  @Column({nullable: true})
sarCoursesYearTermToTalHour?:number
  @Column({nullable: true})
sarCoursesYearTerm2ToTalSubject?:number
  @Column({nullable: true})
sarCoursesYearTerm2ToTalActivities?:number
  @Column({nullable: true})
sarCoursesYearTerm2ToTalHour?:number
  @Column({nullable: true})
sarselfdevelopmentToTalTimes?:number
  @Column({nullable: true})
sarselfdevelopmentToTaldays?:number
  @Column({nullable: true})
sarselfdevelopmentToTalHour?:number
  @Column({nullable: true})
sarselfdevelopmentToTalTimes2?:number
  @Column({nullable: true})
sacompetencyassessmentresult? :string
  @Column({nullable: true})
sarcrudassessmentresult? :string
  @Column({nullable: true})
sarattributeassessmentresult? :string

}
@ViewEntity({
    name:'sar_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("sar.id", "id")
        .addSelect("sar.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar.refId", "refId")
        .addSelect("sar.schoolyear", "schoolyear")
        .from(Sar, "sar")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar.teacherId")
})
export class VwSarList {
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
}

@ViewEntity({
  name:'sar_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar.id", "value")
  //.addSelect("CONCAT(sar.null , ' ' , sar.null)", "label")
      .from(Sar, "sar")
})
export class VwSarDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'sar_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("sar.id", "id")
        .addSelect("sar.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , ' ' , teacher_id.lastname)", "teacherValue")
        .addSelect("sar.refId", "refId")
        .addSelect("sar.schoolyear", "schoolyear")
        .addSelect("sar.sarCoursesYearTermToTalSubject", "sarCoursesYearTermToTalSubject")
        .addSelect("sar.sarCoursesYearTermToTalActivities", "sarCoursesYearTermToTalActivities")
        .addSelect("sar.sarCoursesYearTermToTalHour", "sarCoursesYearTermToTalHour")
        .addSelect("sar.sarCoursesYearTerm2ToTalSubject", "sarCoursesYearTerm2ToTalSubject")
        .addSelect("sar.sarCoursesYearTerm2ToTalActivities", "sarCoursesYearTerm2ToTalActivities")
        .addSelect("sar.sarCoursesYearTerm2ToTalHour", "sarCoursesYearTerm2ToTalHour")
        .addSelect("sar.sarselfdevelopmentToTalTimes", "sarselfdevelopmentToTalTimes")
        .addSelect("sar.sarselfdevelopmentToTaldays", "sarselfdevelopmentToTaldays")
        .addSelect("sar.sarselfdevelopmentToTalHour", "sarselfdevelopmentToTalHour")
        .addSelect("sar.sarselfdevelopmentToTalTimes2", "sarselfdevelopmentToTalTimes2")
        .addSelect("sar.sacompetencyassessmentresult", "sacompetencyassessmentresult")
        .addSelect("sar.sarcrudassessmentresult", "sarcrudassessmentresult")
        .addSelect("sar.sarattributeassessmentresult", "sarattributeassessmentresult")
      .from(Sar, "sar")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = sar.teacherId")
})
export class VwSarItem {

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
    sarCoursesYearTermToTalSubject:number
       @ViewColumn()
  sarCoursesYearTermToTalActivities:number
     @ViewColumn()
  sarCoursesYearTermToTalHour:number
     @ViewColumn()
  sarCoursesYearTerm2ToTalSubject:number
     @ViewColumn()
  sarCoursesYearTerm2ToTalActivities:number
     @ViewColumn()
  sarCoursesYearTerm2ToTalHour:number
     @ViewColumn()
  sarselfdevelopmentToTalTimes:number
     @ViewColumn()
  sarselfdevelopmentToTaldays:number
     @ViewColumn()
  sarselfdevelopmentToTalHour:number
     @ViewColumn()
  sarselfdevelopmentToTalTimes2:number
     @ViewColumn()
  sacompetencyassessmentresult :string
     @ViewColumn()
  sarcrudassessmentresult :string
     @ViewColumn()
  sarattributeassessmentresult :string
}
