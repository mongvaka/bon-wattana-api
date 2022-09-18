import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";
import { YearTerm } from "src/api/year-term/year-term.entity";

@Entity('depression')
export class Depression extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  yearTermId?: number;

  @Column({nullable: true})
  depressionCh1?: number;

  @Column({nullable: true})
  depressionCh2?: number;

  @Column({nullable: true})
  depressionCh3?: number;

  @Column({nullable: true})
  depressionCh4?: number;

  @Column({nullable: true})
  depressionCh5?: number;

  @Column({nullable: true})
  depressionCh6?: number;

  @Column({nullable: true})
  depressionCh7?: number;

  @Column({nullable: true})
  depressionCh8?: number;

  @Column({nullable: true})
  depressionCh9?: number;

  @Column({nullable: true})
  depressionCh10?: number;

  @Column({nullable: true})
  depressionCh11?: number;

  @Column({nullable: true})
  depressionCh12?: number;

  @Column({nullable: true})
  depressionCh13?: number;

  @Column({nullable: true})
  depressionCh14?: number;

  @Column({nullable: true})
  depressionCh15?: number;

  @Column({nullable: true})
  depressionCh16?: number;

  @Column({nullable: true})
  depressionCh17?: number;

  @Column({nullable: true})
  depressionCh18?: number;

  @Column({nullable: true})
  depressionCh19?: number;

  @Column({nullable: true})
  depressionCh20?: number;
}
@ViewEntity({
    name:'depression_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("depression.id", "id")
        .addSelect("depression.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .from(Depression, "depression")
        .leftJoin(Student, "student_id","student_id.Id = depression.studentId")
})
export class VwDepressionList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}

@ViewEntity({
  name:'depression_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("depression.id", "value")
  .addSelect("CONCAT(depression.depressionCh2 , ' ' , depression.depressionCh3)", "label")
      .from(Depression, "depression")
})
export class VwDepressionDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'depression_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("depression.id", "id")
        .addSelect("depression.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("depression.yearTermId", "yearTermId")
        .addSelect("CONCAT(year_term_id.year , ' ' , year_term_id.term)", "yearTermValue")
      .from(Depression, "depression")
        .leftJoin(Student, "student_id","student_id.Id = depression.studentId")
        .leftJoin(YearTerm, "year_term_id","year_term_id.Id = depression.yearTermId")
})
export class VwDepressionItem {

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
