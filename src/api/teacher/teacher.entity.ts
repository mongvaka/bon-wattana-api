import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Country } from "src/api/country/country.entity";
import { Province } from "src/api/province/province.entity";
import { District } from "src/api/district/district.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";

@Entity('teacher')
export class Teacher extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  title?: number;

  @Column({nullable: true})
  firstname?: string;

  @Column({nullable: true})
  lastname?: string;

  @Column({nullable: false})
  position?: number;

  @Column({nullable: false})
  startWork?: Date;

  @Column({nullable: false})
  role?: number;

  @Column({nullable: false})
  specialRole?: number;

  @Column({nullable: false})
  accessDate?: Date;

  @Column({nullable: false})
  positionCode?: string;

  @Column({nullable: false})
  range?: number;

  @Column({nullable: false})
  sarary?: number;

  @Column({nullable: false})
  birthDate?: Date;

  @Column({nullable: false})
  personalCode?: string;

  @Column({nullable: false})
  major?: string;

  @Column({nullable: false})
  minor?: string;

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

  @Column({nullable: false})
  contractAddress?: string;

  @Column({nullable: false})
  contractCountryId?: number;

  @Column({nullable: false})
  contractProvinceId?: number;

  @Column({nullable: false})
  contractDistrictId?: number;

  @Column({nullable: false})
  contractSubDistrictId?: number;

  @Column({nullable: false})
  contractPostCode?: string;

  @Column({nullable: false})
  imageProfile?: string;
}
@ViewEntity({
    name:'teacher_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("teacher.id", "id")
        .addSelect("teacher.title", "title")
        .addSelect("teacher.firstname", "firstname")
        .addSelect("teacher.lastname", "lastname")
        .addSelect("teacher.position", "position")
        .addSelect("teacher.specialRole", "specialRole")
        .addSelect("teacher.range", "range")
        .addSelect("teacher.major", "major")
        .from(Teacher, "teacher")
})
export class VwTeacherList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstname: string;

    @ViewColumn()
    lastname: string;

    @ViewColumn()
    position: number;

    @ViewColumn()
    specialRole: number;

    @ViewColumn()
    range: number;

    @ViewColumn()
    major: string;
}

@ViewEntity({
  name:'teacher_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("teacher.id", "value")
  .addSelect("CONCAT(teacher.firstname , '[' , teacher.lastname, ']')", "label")
      .from(Teacher, "teacher")
})
export class VwTeacherDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'teacher_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("teacher.id", "id")
        .addSelect("teacher.title", "title")
        .addSelect("teacher.firstname", "firstname")
        .addSelect("teacher.lastname", "lastname")
        .addSelect("teacher.position", "position")
        .addSelect("teacher.startWork", "startWork")
        .addSelect("teacher.role", "role")
        .addSelect("teacher.specialRole", "specialRole")
        .addSelect("teacher.accessDate", "accessDate")
        .addSelect("teacher.positionCode", "positionCode")
        .addSelect("teacher.range", "range")
        .addSelect("teacher.sarary", "sarary")
        .addSelect("teacher.birthDate", "birthDate")
        .addSelect("teacher.personalCode", "personalCode")
        .addSelect("teacher.major", "major")
        .addSelect("teacher.minor", "minor")
        .addSelect("teacher.address", "address")
        .addSelect("teacher.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("teacher.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("teacher.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("teacher.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.name , '[' , sub_district_id.postCode, ']')", "subDistrictValue")
        .addSelect("teacher.postCode", "postCode")
        .addSelect("teacher.contractAddress", "contractAddress")
        .addSelect("teacher.contractCountryId", "contractCountryId")
        .addSelect("CONCAT(contract_country_id.code , '[' , contract_country_id.name, ']')", "contractCountryValue")
        .addSelect("teacher.contractProvinceId", "contractProvinceId")
        .addSelect("CONCAT(contract_province_id.code , '[' , contract_province_id.name, ']')", "contractProvinceValue")
        .addSelect("teacher.contractDistrictId", "contractDistrictId")
        .addSelect("CONCAT(contract_district_id.code , '[' , contract_district_id.name, ']')", "contractDistrictValue")
        .addSelect("teacher.contractSubDistrictId", "contractSubDistrictId")
        .addSelect("CONCAT(contract_sub_district_id.name , '[' , contract_sub_district_id.postCode, ']')", "contractSubDistrictValue")
        .addSelect("teacher.contractPostCode", "contractPostCode")
        .addSelect("teacher.imageProfile", "imageProfile")
      .from(Teacher, "teacher")
        .leftJoin(Country, "country_id","country_id.Id = teacher.countryId")
        .leftJoin(Province, "province_id","province_id.Id = teacher.provinceId")
        .leftJoin(District, "district_id","district_id.Id = teacher.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = teacher.subDistrictId")
        .leftJoin(Country, "contract_country_id","contract_country_id.Id = teacher.contractCountryId")
        .leftJoin(Province, "contract_province_id","contract_province_id.Id = teacher.contractProvinceId")
        .leftJoin(District, "contract_district_id","contract_district_id.Id = teacher.contractDistrictId")
        .leftJoin(SubDistrict, "contract_sub_district_id","contract_sub_district_id.Id = teacher.contractSubDistrictId")
})
export class VwTeacherItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstname: string;

    @ViewColumn()
    lastname: string;

    @ViewColumn()
    position: number;

    @ViewColumn()
    startWork: Date;

    @ViewColumn()
    role: number;

    @ViewColumn()
    specialRole: number;

    @ViewColumn()
    accessDate: Date;

    @ViewColumn()
    positionCode: string;

    @ViewColumn()
    range: number;

    @ViewColumn()
    sarary: number;

    @ViewColumn()
    birthDate: Date;

    @ViewColumn()
    personalCode: string;

    @ViewColumn()
    major: string;

    @ViewColumn()
    minor: string;

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

    @ViewColumn()
    contractAddress: string;

    @ViewColumn()
    contractCountryId: number;

    @ViewColumn()
    contractCountryValue: string;

    @ViewColumn()
    contractProvinceId: number;

    @ViewColumn()
    contractProvinceValue: string;

    @ViewColumn()
    contractDistrictId: number;

    @ViewColumn()
    contractDistrictValue: string;

    @ViewColumn()
    contractSubDistrictId: number;

    @ViewColumn()
    contractSubDistrictValue: string;

    @ViewColumn()
    contractPostCode: string;

    @ViewColumn()
    imageProfile: string;
}
