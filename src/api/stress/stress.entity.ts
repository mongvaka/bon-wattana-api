import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";
import { YearTerm } from "src/api/year-term/year-term.entity";

@Entity('stress')
export class Stress extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  yearTermId?: number;

  @Column({nullable: true})
  stressCh1?: number;

  @Column({nullable: true})
  stressCh2?: number;

  @Column({nullable: true})
  stressCh3?: number;

  @Column({nullable: true})
  stressCh4?: number;

  @Column({nullable: true})
  stressCh5?: number;

  @Column({nullable: true})
  stressCh6?: number;

  @Column({nullable: true})
  stressCh7?: number;

  @Column({nullable: true})
  stressCh8?: number;

  @Column({nullable: true})
  stressCh9?: number;

  @Column({nullable: true})
  stressCh10?: number;

  @Column({nullable: true})
  stressCh11?: number;

  @Column({nullable: true})
  stressCh12?: number;

  @Column({nullable: true})
  stressCh13?: number;

  @Column({nullable: true})
  stressCh14?: number;

  @Column({nullable: true})
  stressCh15?: number;

  @Column({nullable: true})
  stressCh16?: number;

  @Column({nullable: true})
  stressCh17?: number;

  @Column({nullable: true})
  stressCh18?: number;

  @Column({nullable: true})
  stressCh19?: number;

  @Column({nullable: true})
  stressCh20?: number;
}
@ViewEntity({
    name:'stress_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("stress.id", "id")
        .addSelect("stress.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .from(Stress, "stress")
        .leftJoin(Student, "student_id","student_id.Id = stress.studentId")
})
export class VwStressList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}

@ViewEntity({
  name:'stress_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("stress.id", "value")
  .addSelect("CONCAT(stress.stressCh2 , ' ' , stress.stressCh3)", "label")
      .from(Stress, "stress")
})
export class VwStressDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'stress_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("stress.id", "id")
        .addSelect("stress.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("stress.yearTermId", "yearTermId")
        .addSelect("CONCAT(year_term_id.year , ' ' , year_term_id.term)", "yearTermValue")
      .from(Stress, "stress")
        .leftJoin(Student, "student_id","student_id.Id = stress.studentId")
        .leftJoin(YearTerm, "year_term_id","year_term_id.Id = stress.yearTermId")
})
export class VwStressItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    yearTermId: number;

    @ViewColumn()
    yearTermValue: string;
}
