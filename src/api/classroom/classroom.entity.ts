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
  classroomName?: string;

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
        .addSelect("classroom.classroomName", "classroomName")
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
    @ViewColumn()
    classroomName?: string;
}

@ViewEntity({
  name:'classroom_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("classroom.id", "value")
  .addSelect("CONCAT(classroom_type.typeName , '/' , classroom.classroomName  , '[' , classroom.mentorFirst, ']')", "label")
  .from(Classroom, "classroom")
  .innerJoin(ClassroomType,'classroom_type','classroom_type.id = classroom.classroomTypeId')
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
        .addSelect("classroom.classroomName", "classroomName")
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
    @ViewColumn()
    classroomName?: string;
}
