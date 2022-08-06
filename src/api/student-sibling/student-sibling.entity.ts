import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('student_sibling')
export class StudentSibling extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  sudentId?: number;

  @Column({nullable: true})
  siblingId?: number;
}
@ViewEntity({
    name:'student_sibling_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student_sibling.id", "id")
        .addSelect("student_sibling.sudentId", "sudentId")
        .addSelect("CONCAT(sudent_id.studentCode , '[' , sudent_id.firstname, ']')", "sudentValue")
        .addSelect("student_sibling.siblingId", "siblingId")
        .addSelect("CONCAT(sibling_id.studentCode , '[' , sibling_id.firstname, ']')", "siblingValue")
        .from(StudentSibling, "student_sibling")
        .leftJoin(Student, "sudent_id","sudent_id.Id = student_sibling.sudentId")
        .leftJoin(Student, "sibling_id","sibling_id.Id = student_sibling.siblingId")
})
export class VwStudentSiblingList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    sudentId: number;

    @ViewColumn()
    sudentValue: string;

    @ViewColumn()
    siblingId: number;

    @ViewColumn()
    siblingValue: string;
}

@ViewEntity({
  name:'student_sibling_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_sibling.id", "value")
  .addSelect("CONCAT(student_sibling.sudentId , '[' , student_sibling.siblingId, ']')", "label")
      .from(StudentSibling, "student_sibling")
})
export class VwStudentSiblingDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'student_sibling_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student_sibling.id", "id")
        .addSelect("student_sibling.sudentId", "sudentId")
        .addSelect("CONCAT(sudent_id.studentCode , '[' , sudent_id.firstname, ']')", "sudentValue")
        .addSelect("student_sibling.siblingId", "siblingId")
        .addSelect("CONCAT(sibling_id.studentCode , '[' , sibling_id.firstname, ']')", "siblingValue")
      .from(StudentSibling, "student_sibling")
        .leftJoin(Student, "sudent_id","sudent_id.Id = student_sibling.sudentId")
        .leftJoin(Student, "sibling_id","sibling_id.Id = student_sibling.siblingId")
})
export class VwStudentSiblingItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    sudentId: number;

    @ViewColumn()
    sudentValue: string;

    @ViewColumn()
    siblingId: number;

    @ViewColumn()
    siblingValue: string;
}
