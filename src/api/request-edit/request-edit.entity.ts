import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";

@Entity('request_edit')
export class RequestEdit extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  requestType?: number;

  @Column({nullable: true})
  dataToEdit?: string;

  @Column({nullable: true})
  requestStatus?: number;
}
@ViewEntity({
    name:'request_edit_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("request_edit.id", "id")
        .addSelect("request_edit.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("request_edit.requestType", "requestType")
        .addSelect("request_edit.dataToEdit", "dataToEdit")
        .addSelect("request_edit.requestStatus", "requestStatus")
        .from(RequestEdit, "request_edit")
        .leftJoin(Student, "student_id","student_id.Id = request_edit.studentId")
})
export class VwRequestEditList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    requestType: number;

    @ViewColumn()
    dataToEdit: string;

    @ViewColumn()
    requestStatus: number;
}

@ViewEntity({
  name:'request_edit_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("request_edit.id", "value")
  .addSelect("CONCAT(request_edit.studentId , '[' , request_edit.requestType, ']')", "label")
      .from(RequestEdit, "request_edit")
})
export class VwRequestEditDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'request_edit_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("request_edit.id", "id")
        .addSelect("request_edit.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("request_edit.requestType", "requestType")
        .addSelect("request_edit.dataToEdit", "dataToEdit")
        .addSelect("request_edit.requestStatus", "requestStatus")
      .from(RequestEdit, "request_edit")
        .leftJoin(Student, "student_id","student_id.Id = request_edit.studentId")
})
export class VwRequestEditItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    requestType: number;

    @ViewColumn()
    dataToEdit: string;

    @ViewColumn()
    requestStatus: number;
}
