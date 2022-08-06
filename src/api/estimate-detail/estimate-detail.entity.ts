import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";
import { EstimateTemp } from "src/api/estimate-temp/estimate-temp.entity";

@Entity('estimate_detail')
export class EstimateDetail extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  estimateId?: number;

  @Column({nullable: true})
  value?: number;
}
@ViewEntity({
    name:'estimate_detail_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("estimate_detail.id", "id")
        .addSelect("estimate_detail.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("estimate_detail.estimateId", "estimateId")
        .addSelect("CONCAT(estimate_id.name , '[' , estimate_id.ratio, ']')", "estimateValue")
        .addSelect("estimate_detail.value", "value")
        .from(EstimateDetail, "estimate_detail")
        .leftJoin(Student, "student_id","student_id.Id = estimate_detail.studentId")
        .leftJoin(EstimateTemp, "estimate_id","estimate_id.Id = estimate_detail.estimateId")
})
export class VwEstimateDetailList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    estimateId: number;

    @ViewColumn()
    estimateValue: string;

    @ViewColumn()
    value: number;
}

@ViewEntity({
  name:'estimate_detail_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_detail.id", "value")
  .addSelect("CONCAT(estimate_detail.estimateId , '[' , estimate_detail.value, ']')", "label")
      .from(EstimateDetail, "estimate_detail")
})
export class VwEstimateDetailDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'estimate_detail_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_detail.id", "id")
        .addSelect("estimate_detail.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("estimate_detail.estimateId", "estimateId")
        .addSelect("CONCAT(estimate_id.name , '[' , estimate_id.ratio, ']')", "estimateValue")
        .addSelect("estimate_detail.value", "value")
      .from(EstimateDetail, "estimate_detail")
        .leftJoin(Student, "student_id","student_id.Id = estimate_detail.studentId")
        .leftJoin(EstimateTemp, "estimate_id","estimate_id.Id = estimate_detail.estimateId")
})
export class VwEstimateDetailItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    estimateId: number;

    @ViewColumn()
    estimateValue: string;

    @ViewColumn()
    value: number;
}
