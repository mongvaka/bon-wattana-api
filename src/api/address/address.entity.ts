import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Province } from "src/api/province/province.entity";
import { District } from "src/api/district/district.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";

@Entity('address')
export class Address extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  address?: string;

  @Column({nullable: true})
  provinceId?: number;

  @Column({nullable: true})
  districtId?: number;

  @Column({nullable: true})
  subDistrictId?: number;
}
@ViewEntity({
    name:'address_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("address.id", "id")
        .addSelect("address.address", "address")
        .addSelect("address.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("address.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("address.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.name , '[' , sub_district_id.postCode, ']')", "subDistrictValue")
        .from(Address, "address")
        .leftJoin(Province, "province_id","province_id.Id = address.provinceId")
        .leftJoin(District, "district_id","district_id.Id = address.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = address.subDistrictId")
})
export class VwAddressList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    address: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;

    @ViewColumn()
    districtId: number;

    @ViewColumn()
    districtValue: string;

    @ViewColumn()
    subDistrictId: number;

    @ViewColumn()
    subDistrictValue: string;
}

@ViewEntity({
  name:'address_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("address.id", "value")
  .addSelect("CONCAT(address.address , '[' , address.provinceId, ']')", "label")
      .from(Address, "address")
})
export class VwAddressDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'address_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("address.id", "id")
        .addSelect("address.address", "address")
        .addSelect("address.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("address.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("address.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.name , '[' , sub_district_id.postCode, ']')", "subDistrictValue")
      .from(Address, "address")
        .leftJoin(Province, "province_id","province_id.Id = address.provinceId")
        .leftJoin(District, "district_id","district_id.Id = address.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = address.subDistrictId")
})
export class VwAddressItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    address: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;

    @ViewColumn()
    districtId: number;

    @ViewColumn()
    districtValue: string;

    @ViewColumn()
    subDistrictId: number;

    @ViewColumn()
    subDistrictValue: string;
}
