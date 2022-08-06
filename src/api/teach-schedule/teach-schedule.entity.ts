import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "src/api/teacher/teacher.entity";
// import { Course } from "src/api/course/course.entity";

@Entity('teach_schedule')
export class TeachSchedule extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  teacherId?: number;

  @Column({nullable: true})
  season?: number;

  @Column({nullable: true})
  year?: number;

  @Column({nullable: true})
  couseId?: number;

  @Column({nullable: true})
  className?: string;

  @Column({nullable: true})
  startTime?: string;

  @Column({nullable: true})
  endTime?: string;

  @Column({nullable: true})
  sectionType?: number;

  @Column({nullable: true})
  inDay?: Date;
}
@ViewEntity({
    name:'teach_schedule_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("teach_schedule.id", "id")
        .addSelect("teach_schedule.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , '[' , teacher_id.lastname, ']')", "teacherValue")
        .addSelect("teach_schedule.season", "season")
        .addSelect("teach_schedule.year", "year")
        .addSelect("teach_schedule.couseId", "couseId")
        // .addSelect("CONCAT(couse_id.null , '[' , couse_id.null, ']')", "couseValue")
        .addSelect("teach_schedule.className", "className")
        .from(TeachSchedule, "teach_schedule")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = teach_schedule.teacherId")
        // .leftJoin(Course, "couse_id","couse_id.Id = teach_schedule.couseId")
})
export class VwTeachScheduleList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    season: number;

    @ViewColumn()
    year: number;

    @ViewColumn()
    couseId: number;

    // @ViewColumn()
    // couseValue: string;

    @ViewColumn()
    className: string;
}

@ViewEntity({
  name:'teach_schedule_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("teach_schedule.id", "value")
  .addSelect("CONCAT(teach_schedule.year , '[' , teach_schedule.couseId, ']')", "label")
      .from(TeachSchedule, "teach_schedule")
})
export class VwTeachScheduleDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'teach_schedule_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("teach_schedule.id", "id")
        .addSelect("teach_schedule.teacherId", "teacherId")
        .addSelect("CONCAT(teacher_id.firstname , '[' , teacher_id.lastname, ']')", "teacherValue")
        .addSelect("teach_schedule.season", "season")
        .addSelect("teach_schedule.year", "year")
        .addSelect("teach_schedule.couseId", "couseId")
        // .addSelect("CONCAT(couse_id.null , '[' , couse_id.null, ']')", "couseValue")
        .addSelect("teach_schedule.className", "className")
        .addSelect("teach_schedule.startTime", "startTime")
        .addSelect("teach_schedule.endTime", "endTime")
        .addSelect("teach_schedule.sectionType", "sectionType")
        .addSelect("teach_schedule.inDay", "inDay")
      .from(TeachSchedule, "teach_schedule")
        .leftJoin(Teacher, "teacher_id","teacher_id.Id = teach_schedule.teacherId")
        // .leftJoin(Course, "couse_id","couse_id.Id = teach_schedule.couseId")
})
export class VwTeachScheduleItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherValue: string;

    @ViewColumn()
    season: number;

    @ViewColumn()
    year: number;

    @ViewColumn()
    couseId: number;

    // @ViewColumn()
    // couseValue: string;

    @ViewColumn()
    className: string;

    @ViewColumn()
    startTime: string;

    @ViewColumn()
    endTime: string;

    @ViewColumn()
    sectionType: number;

    @ViewColumn()
    inDay: Date;
}
