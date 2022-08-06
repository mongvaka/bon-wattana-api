import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('congenitial_disease')
export class CongenitialDisease extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  studentId?: number;
}
@ViewEntity({
    name:'congenitial_disease_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("congenitial_disease.id", "id")
        .addSelect("congenitial_disease.name", "name")
        .addSelect("congenitial_disease.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .from(CongenitialDisease, "congenitial_disease")
        .leftJoin(Student, "student_id","student_id.Id = congenitial_disease.studentId")
})
export class VwCongenitialDiseaseList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}

@ViewEntity({
  name:'congenitial_disease_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("congenitial_disease.id", "value")
  .addSelect("CONCAT(congenitial_disease.name , '[' , congenitial_disease.studentId, ']')", "label")
      .from(CongenitialDisease, "congenitial_disease")
})
export class VwCongenitialDiseaseDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'congenitial_disease_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("congenitial_disease.id", "id")
        .addSelect("congenitial_disease.name", "name")
        .addSelect("congenitial_disease.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
      .from(CongenitialDisease, "congenitial_disease")
        .leftJoin(Student, "student_id","student_id.Id = congenitial_disease.studentId")
})
export class VwCongenitialDiseaseItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}
