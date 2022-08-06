import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('estimate_group')
export class EstimateGroup extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  groupName?: string;

  @Column({nullable: true})
  estimateType?: number;

  @Column({nullable: true})
  calssLevel?: number;
}
@ViewEntity({
    name:'estimate_group_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("estimate_group.id", "id")
        .addSelect("estimate_group.groupName", "groupName")
        .addSelect("estimate_group.estimateType", "estimateType")
        .addSelect("estimate_group.calssLevel", "calssLevel")
        .from(EstimateGroup, "estimate_group")
})
export class VwEstimateGroupList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    groupName: string;

    @ViewColumn()
    estimateType: number;

    @ViewColumn()
    calssLevel: number;
}

@ViewEntity({
  name:'estimate_group_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_group.id", "value")
  .addSelect("CONCAT(estimate_group.groupName , '[' , estimate_group.calssLevel, ']')", "label")
      .from(EstimateGroup, "estimate_group")
})
export class VwEstimateGroupDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'estimate_group_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("estimate_group.id", "id")
        .addSelect("estimate_group.groupName", "groupName")
        .addSelect("estimate_group.estimateType", "estimateType")
        .addSelect("estimate_group.calssLevel", "calssLevel")
      .from(EstimateGroup, "estimate_group")
})
export class VwEstimateGroupItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    groupName: string;

    @ViewColumn()
    estimateType: number;

    @ViewColumn()
    calssLevel: number;
}
