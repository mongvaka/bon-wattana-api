import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { ClassroomType } from "src/api/classroom-type/classroom-type.entity";

@Entity('classroom')
export class Classroom extends BasicData {

  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  classroomTypeId?: number;

  @Column({nullable: true})
  mentorFirst?: string;

  @Column({nullable: true})
  mentoeSecond?: string;
}
@ViewEntity({
    name:'classroom_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("classroom.id", "id")
        .addSelect("classroom.classroomTypeId", "classroomTypeId")
        .addSelect("CONCAT(classroom_type_id.typeName , '[' , classroom_type_id.typeDescription, ']')", "classroomTypeValue")
        .addSelect("classroom.mentorFirst", "mentorFirst")
        .addSelect("classroom.mentoeSecond", "mentoeSecond")
        .from(Classroom, "classroom")
        .leftJoin(ClassroomType, "classroom_type_id","classroom_type_id.Id = classroom.classroomTypeId")
})
export class VwClassroomList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    classroomTypeId: number;

    @ViewColumn()
    classroomTypeValue: string;

    @ViewColumn()
    mentorFirst: string;

    @ViewColumn()
    mentoeSecond: string;
}

@ViewEntity({
  name:'classroom_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("classroom.id", "value")
  .addSelect("CONCAT(classroom.classroomTypeId , '[' , classroom.mentorFirst, ']')", "label")
      .from(Classroom, "classroom")
})
export class VwClassroomDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'classroom_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("classroom.id", "id")
        .addSelect("classroom.classroomTypeId", "classroomTypeId")
        .addSelect("CONCAT(classroom_type_id.typeName , '[' , classroom_type_id.typeDescription, ']')", "classroomTypeValue")
        .addSelect("classroom.mentorFirst", "mentorFirst")
        .addSelect("classroom.mentoeSecond", "mentoeSecond")
      .from(Classroom, "classroom")
        .leftJoin(ClassroomType, "classroom_type_id","classroom_type_id.Id = classroom.classroomTypeId")
})
export class VwClassroomItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    classroomTypeId: number;

    @ViewColumn()
    classroomTypeValue: string;

    @ViewColumn()
    mentorFirst: string;

    @ViewColumn()
    mentoeSecond: string;
}
