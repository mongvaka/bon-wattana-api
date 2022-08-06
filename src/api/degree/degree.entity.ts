import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";
import { University } from "src/api/university/university.entity";

@Entity('degree')
export class Degree extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  teacherId?: number;

  @Column({nullable: true})
  degree?: string;

  @Column({nullable: true})
  universityId?: number;

  @Column({nullable: false})
  major?: string;

  @Column({nullable: false})
  faculty?: string;

  @Column({nullable: true})
  degreeName?: string;
}
@ViewEntity({
    name:'degree_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("degree.id", "id")
        .addSelect("degree.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , '[' , teacher_id.lastname, ']')", "teacherValue")
        .addSelect("degree.degree", "degree")
        .addSelect("degree.universityId", "universityId")
        .addSelect("CONCAT(university_id.universityName , '[' , university_id.countryId, ']')", "universityValue")
        .addSelect("degree.major", "major")
        .addSelect("degree.faculty", "faculty")
        .addSelect("degree.degreeName", "degreeName")
        .from(Degree, "degree")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = degree.teacherId")
        .leftJoin(University, "university_id","university_id.Id = degree.universityId")
})
export class VwDegreeList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    degree: string;

    @ViewColumn()
    universityId: number;

    @ViewColumn()
    universityValue: string;

    @ViewColumn()
    major: string;

    @ViewColumn()
    faculty: string;

    @ViewColumn()
    degreeName: string;
}

@ViewEntity({
  name:'degree_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("degree.id", "value")
  .addSelect("CONCAT(degree.degreeName , '[' , degree.universityId, ']')", "label")
      .from(Degree, "degree")
})
export class VwDegreeDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'degree_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("degree.id", "id")
        .addSelect("degree.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , '[' , teacher_id.lastname, ']')", "teacherValue")
        .addSelect("degree.degree", "degree")
        .addSelect("degree.universityId", "universityId")
        .addSelect("CONCAT(university_id.universityName , '[' , university_id.countryId, ']')", "universityValue")
        .addSelect("degree.major", "major")
        .addSelect("degree.faculty", "faculty")
        .addSelect("degree.degreeName", "degreeName")
      .from(Degree, "degree")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = degree.teacherId")
        .leftJoin(University, "university_id","university_id.Id = degree.universityId")
})
export class VwDegreeItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    degree: string;

    @ViewColumn()
    universityId: number;

    @ViewColumn()
    universityValue: string;

    @ViewColumn()
    major: string;

    @ViewColumn()
    faculty: string;

    @ViewColumn()
    degreeName: string;
}
