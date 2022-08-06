import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('bmi_history')
export class BmiHistory extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  weight?: number;

  @Column({nullable: true})
  height?: number;

  @Column({nullable: true})
  studentId?: number;
}
@ViewEntity({
    name:'bmi_history_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("bmi_history.id", "id")
        .addSelect("bmi_history.weight", "weight")
        .addSelect("bmi_history.height", "height")
        .addSelect("bmi_history.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .from(BmiHistory, "bmi_history")
        .leftJoin(Student, "student_id","student_id.Id = bmi_history.studentId")
})
export class VwBmiHistoryList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    weight: number;

    @ViewColumn()
    height: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}

@ViewEntity({
  name:'bmi_history_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("bmi_history.id", "value")
  .addSelect("CONCAT(bmi_history.weight , '[' , bmi_history.height, ']')", "label")
      .from(BmiHistory, "bmi_history")
})
export class VwBmiHistoryDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'bmi_history_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("bmi_history.id", "id")
        .addSelect("bmi_history.weight", "weight")
        .addSelect("bmi_history.height", "height")
        .addSelect("bmi_history.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
      .from(BmiHistory, "bmi_history")
        .leftJoin(Student, "student_id","student_id.Id = bmi_history.studentId")
})
export class VwBmiHistoryItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    weight: number;

    @ViewColumn()
    height: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;
}
