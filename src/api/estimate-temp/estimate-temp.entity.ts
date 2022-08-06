import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { EstimateGroup } from "src/api/estimate-group/estimate-group.entity";

@Entity('estimate_temp')
export class EstimateTemp extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: false})
  ratio?: number;

  @Column({nullable: true})
  estimateGroupId?: number;
}
@ViewEntity({
    name:'estimate_temp_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("estimate_temp.id", "id")
        .addSelect("estimate_temp.name", "name")
        .addSelect("estimate_temp.ratio", "ratio")
        .addSelect("estimate_temp.estimateGroupId", "estimateGroupId")
        .addSelect("CONCAT(estimate_group_id.groupName , '[' , estimate_group_id.calssLevel, ']')", "estimateGroupValue")
        .from(EstimateTemp, "estimate_temp")
        .leftJoin(EstimateGroup, "estimate_group_id","estimate_group_id.Id = estimate_temp.estimateGroupId")
})
export class VwEstimateTempList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    ratio: number;

    @ViewColumn()
    estimateGroupId: number;

    @ViewColumn()
    estimateGroupValue: string;
}

@ViewEntity({
  name:'estimate_temp_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_temp.id", "value")
  .addSelect("CONCAT(estimate_temp.name , '[' , estimate_temp.ratio, ']')", "label")
      .from(EstimateTemp, "estimate_temp")
})
export class VwEstimateTempDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'estimate_temp_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_temp.id", "id")
        .addSelect("estimate_temp.name", "name")
        .addSelect("estimate_temp.ratio", "ratio")
        .addSelect("estimate_temp.estimateGroupId", "estimateGroupId")
        .addSelect("CONCAT(estimate_group_id.groupName , '[' , estimate_group_id.calssLevel, ']')", "estimateGroupValue")
      .from(EstimateTemp, "estimate_temp")
        .leftJoin(EstimateGroup, "estimate_group_id","estimate_group_id.Id = estimate_temp.estimateGroupId")
})
export class VwEstimateTempItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    ratio: number;

    @ViewColumn()
    estimateGroupId: number;

    @ViewColumn()
    estimateGroupValue: string;
}
