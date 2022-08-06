import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Country } from "src/api/country/country.entity";
import { Province } from "src/api/province/province.entity";
import { District } from "src/api/district/district.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";

@Entity('university')
export class University extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  universityName?: string;

  @Column({nullable: false})
  address?: string;

  @Column({nullable: false})
  countryId?: number;

  @Column({nullable: false})
  provinceId?: number;

  @Column({nullable: false})
  districtId?: number;

  @Column({nullable: false})
  subDistrictId?: number;

  @Column({nullable: false})
  postCode?: string;
}
@ViewEntity({
    name:'university_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("university.id", "id")
        .addSelect("university.universityName", "universityName")
        .addSelect("university.address", "address")
        .addSelect("university.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("university.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .from(University, "university")
        .leftJoin(Country, "country_id","country_id.Id = university.countryId")
        .leftJoin(Province, "province_id","province_id.Id = university.provinceId")
})
export class VwUniversityList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    universityName: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    countryId: number;

    @ViewColumn()
    countryValue: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;
}

@ViewEntity({
  name:'university_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("university.id", "value")
  .addSelect("CONCAT(university.universityName , '[' , university.countryId, ']')", "label")
      .from(University, "university")
})
export class VwUniversityDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'university_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("university.id", "id")
        .addSelect("university.universityName", "universityName")
        .addSelect("university.address", "address")
        .addSelect("university.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("university.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("university.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("university.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.name , '[' , sub_district_id.postCode, ']')", "subDistrictValue")
        .addSelect("university.postCode", "postCode")
      .from(University, "university")
        .leftJoin(Country, "country_id","country_id.Id = university.countryId")
        .leftJoin(Province, "province_id","province_id.Id = university.provinceId")
        .leftJoin(District, "district_id","district_id.Id = university.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = university.subDistrictId")
})
export class VwUniversityItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    universityName: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    countryId: number;

    @ViewColumn()
    countryValue: string;

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

    @ViewColumn()
    postCode: string;
}
