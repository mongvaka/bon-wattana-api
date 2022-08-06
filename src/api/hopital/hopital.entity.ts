import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Address } from "src/api/address/address.entity";

@Entity('hopital')
export class Hopital extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: false})
  addressId?: number;
}
@ViewEntity({
    name:'hopital_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("hopital.id", "id")
        .addSelect("hopital.name", "name")
        .addSelect("hopital.addressId", "addressId")
        .addSelect("CONCAT(address_id.address , '[' , address_id.provinceId, ']')", "addressValue")
        .from(Hopital, "hopital")
        .leftJoin(Address, "address_id","address_id.Id = hopital.addressId")
})
export class VwHopitalList {
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
  name:'hopital_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("hopital.id", "value")
  .addSelect("CONCAT(hopital.name , '[' , hopital.addressId, ']')", "label")
      .from(Hopital, "hopital")
})
export class VwHopitalDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'hopital_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("hopital.id", "id")
        .addSelect("hopital.name", "name")
        .addSelect("hopital.addressId", "addressId")
        .addSelect("CONCAT(address_id.address , '[' , address_id.provinceId, ']')", "addressValue")
      .from(Hopital, "hopital")
        .leftJoin(Address, "address_id","address_id.Id = hopital.addressId")
})
export class VwHopitalItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    addressId: number;

    @ViewColumn()
    addressValue: string;
}
