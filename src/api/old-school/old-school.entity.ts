import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Address } from "src/api/address/address.entity";

@Entity('old_school')
export class OldSchool extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: false})
  addressId?: number;
}
@ViewEntity({
    name:'old_school_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("old_school.id", "id")
        .addSelect("old_school.name", "name")
        .addSelect("old_school.addressId", "addressId")
        .addSelect("CONCAT(address_id.address , '[' , address_id.provinceId, ']')", "addressValue")
        .from(OldSchool, "old_school")
        .leftJoin(Address, "address_id","address_id.Id = old_school.addressId")
})
export class VwOldSchoolList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    addressId: number;

    @ViewColumn()
    addressValue: string;
}

@ViewEntity({
  name:'old_school_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("old_school.id", "value")
  .addSelect("CONCAT(old_school.name , '[' , old_school.addressId, ']')", "label")
      .from(OldSchool, "old_school")
})
export class VwOldSchoolDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'old_school_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("old_school.id", "id")
        .addSelect("old_school.name", "name")
        .addSelect("old_school.addressId", "addressId")
        .addSelect("CONCAT(address_id.address , '[' , address_id.provinceId, ']')", "addressValue")
      .from(OldSchool, "old_school")
        .leftJoin(Address, "address_id","address_id.Id = old_school.addressId")
})
export class VwOldSchoolItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    addressId: number;

    @ViewColumn()
    addressValue: string;
}
