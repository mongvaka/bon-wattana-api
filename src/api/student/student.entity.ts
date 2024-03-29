import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Gendar } from "src/api/gendar/gendar.entity";
import { Nationality } from "src/api/nationality/nationality.entity";
import { Ethnicity } from "src/api/ethnicity/ethnicity.entity";
import { Religion } from "src/api/religion/religion.entity";
import { Country } from "src/api/country/country.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";
import { District } from "src/api/district/district.entity";
import { Province } from "src/api/province/province.entity";
import { AliveWith } from "src/api/alive-with/alive-with.entity";
import { Classroom } from "src/api/classroom/classroom.entity";
import { ClassroomType } from "../classroom-type/classroom-type.entity";

@Entity('student')
export class Student extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentCode?: string;

  // @Column({nullable: true})
  // imageProfile?: string;

  @Column({nullable: true})
  status?: number;

  @Column({nullable: true})
  title?: number;

  @Column({nullable: true})
  firstname?: string;

  @Column({nullable: true})
  lastname?: string;
  @Column({nullable: true})
  personalCode?: string;

  @Column({nullable: true})
  firstnameEn?: string;

  @Column({nullable: true})
  lastnameEn?: string;

  @Column({nullable: true})
  gendarId?: number;

  @Column({nullable: true})
  birthDate?: Date;

  @Column({nullable: true})
  nationalityId?: number;

  @Column({nullable: true})
  ethnicityId?: number;

  @Column({nullable: true})
  religionId?: number;

  @Column({nullable: true})
  email?: string;

  @Column({nullable: true})
  phoneNumber?: string;

  @Column({nullable: true})
  specialAbility?: string;

  @Column({nullable: true})
  birthHospital?: string;

  @Column({nullable: true})
  birthCountryId?: number;

  @Column({nullable: true})
  birthProvinceId?: number;

  @Column({nullable: true})
  birthDistrictId?: number;

  @Column({nullable: true})
  birthSubDistrictId?: number;

  @Column({nullable: true})
  houseNumber?: string;

  @Column({nullable: true})
  village?: string;

  @Column({nullable: true})
  road?: string;

  @Column({nullable: true})
  countryId?: number;

  @Column({nullable: true})
  provinceId?: number;

  @Column({nullable: true})
  districtId?: number;

  @Column({nullable: true})
  subDistrictId?: number;

  @Column({nullable: true})
  contractHouseNumber?: string;

  @Column({nullable: true})
  contractVillage?: string;

  @Column({nullable: true})
  contractRoad?: string;

  @Column({nullable: true})
  contractCountryId?: number;

  @Column({nullable: true})
  contractProvinceId?: number;

  @Column({nullable: true})
  contractDistrictId?: number;

  @Column({nullable: true})
  contractSubDistrictId?: number;

  @Column({nullable: true})
  oldSchoolName?: string;

  @Column({nullable: true})
  oldSchoolCountryId?: number;

  @Column({nullable: true})
  oldSchoolProvinceId?: number;

  @Column({nullable: true})
  oldSchoolDistrictId?: number;

  @Column({nullable: true})
  oldSchoolSubDistrictId?: number;

  @Column({nullable: true})
  closeFriendInClass?: string;

  @Column({nullable: true})
  closeFriendInClassNickname?: string;

  @Column({nullable: true})
  closeFriendInClassSchool?: string;

  @Column({nullable: true})
  closeFriendInClassPhone?: string;

  @Column({nullable: true})
  closeFriendOtherClass?: string;

  @Column({nullable: true})
  closeFriendOtherClassNickname?: string;

  @Column({nullable: true})
  closeFriendOtherClassSchool?: string;

  @Column({nullable: true})
  closeFriendOtherClassPhone?: string;

  @Column({nullable: true})
  bloodType?: number;

  @Column({nullable: true})
  congenitalDisease?: string;

  @Column({nullable: true})
  height?: number;

  @Column({nullable: true})
  weight?: number;

  @Column({nullable: true})
  defect?: string;

  @Column({nullable: true})
  aliveWithId?: number;

  @Column({nullable: true})
  parentStatus?: number;

  @Column({nullable: true})
  classroomId?: number;

  @Column({nullable: true})
  fatherTitle?: number;

  @Column({nullable: true})
  fatherFirstname?: string;

  @Column({nullable: true})
  fatherLastname?: string;

  @Column({nullable: true})
  fatherPersonalCode?: string;

  @Column({nullable: true})
  fatherBloodType?: number;

  @Column({nullable: true})
  fatherIncome?: string;

  @Column({nullable: true})
  fatherOccupation?: string;

  @Column({nullable: true})
  fatherPhone?: string;

  @Column({nullable: true})
  motherTitle?: number;

  @Column({nullable: true})
  motherFirstname?: string;

  @Column({nullable: true})
  motherLastname?: string;

  @Column({nullable: true})
  motherPersonalCode?: string;

  @Column({nullable: true})
  motherBloodType?: number;

  @Column({nullable: true})
  motherIncome?: string;

  @Column({nullable: true})
  motherOccupation?: string;

  @Column({nullable: true})
  motherPhone?: string;

  @Column({nullable: true})
  parentTitle?: number;

  @Column({nullable: true})
  parentFirstname?: string;

  @Column({nullable: true})
  parentLastname?: string;

  @Column({nullable: true})
  parentPersonalCode?: string;

  @Column({nullable: true})
  parentBloodType?: number;

  @Column({nullable: true})
  parentIncome?: string;

  @Column({nullable: true})
  parentOccupation?: string;

  @Column({nullable: true})
  parentPhone?: string;
}
@ViewEntity({
    name:'student_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student.id", "id")
        .addSelect("student.studentCode", "studentCode")
        .addSelect("student.status", "status")
        .addSelect("student.firstname", "firstname")
        .addSelect("student.lastname", "lastname")
        .addSelect("student.gendarId", "gendarId")
        .addSelect("student.personalCode", "personalCode")
        .addSelect("student.classroomId", "classroomId")
        .addSelect("CONCAT(classroom_type.typeName ,'/', classroom.classroomName , '[' , classroom.mentorFirst, ']')", "classroomValue")
        .addSelect("CONCAT(gendar_id.gendarName , '[' , gendar_id.gendarDescription, ']')", "gendarValue")
        .from(Student, "student")
        .leftJoin(Gendar, "gendar_id","gendar_id.Id = student.gendarId")
        .leftJoin(Classroom, "classroom","classroom.Id = student.classroomId")
        .leftJoin(ClassroomType, "classroom_type","classroom_type.Id = classroom.classroomTypeId")

})
export class VwStudentList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentCode: string;

    @ViewColumn()
    status: number;

    @ViewColumn()
    firstname: string;

    @ViewColumn()
    lastname: string;

    @ViewColumn()
    gendarId: number;

    @ViewColumn()
    gendarValue: string;

    @ViewColumn()
    classroomId: number;

    @ViewColumn()
    classroomValue: string;
    @ViewColumn()
    personalCode: string;
    
}

@ViewEntity({
  name:'student_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student.id", "value")
  .addSelect("CONCAT(student.firstname , '[' , student.lastname, ']')", "label")
      .from(Student, "student")
})
export class VwStudentDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'student_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student.id", "id")
        .addSelect("student.studentCode", "studentCode")
        .addSelect("student.status", "status")
        .addSelect("student.title", "title")
        .addSelect("student.firstname", "firstname")
        .addSelect("student.lastname", "lastname")
        .addSelect("student.firstnameEn", "firstnameEn")
        .addSelect("student.lastnameEn", "lastnameEn")
        .addSelect("student.gendarId", "gendarId")
        .addSelect("CONCAT(gendar_id.gendarName , '[' , gendar_id.gendarDescription, ']')", "gendarValue")
        .addSelect("student.birthDate", "birthDate")
        .addSelect("student.nationalityId", "nationalityId")
        .addSelect("CONCAT(nationality_id.nationalityName , '[' , nationality_id.nationalityDescription, ']')", "nationalityValue")
        .addSelect("student.ethnicityId", "ethnicityId")
        .addSelect("CONCAT(ethnicity_id.ethnicityName , '[' , ethnicity_id.ethnicityDescription, ']')", "ethnicityValue")
        .addSelect("student.religionId", "religionId")
        .addSelect("CONCAT(religion_id.religionName , '[' , religion_id.religionDescription, ']')", "religionValue")
        .addSelect("student.email", "email")
        .addSelect("student.phoneNumber", "phoneNumber")
        .addSelect("student.specialAbility", "specialAbility")
        .addSelect("student.birthHospital", "birthHospital")
        .addSelect("student.birthCountryId", "birthCountryId")
        .addSelect("CONCAT(birth_country_id.code , '[' , birth_country_id.name, ']')", "birthCountryValue")
        .addSelect("student.birthProvinceId", "birthProvinceId")
        .addSelect("student.birthDistrictId", "birthDistrictId")
        .addSelect("student.birthSubDistrictId", "birthSubDistrictId")
        .addSelect("student.houseNumber", "houseNumber")
        .addSelect("student.village", "village")
        .addSelect("student.road", "road")
        .addSelect("student.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("student.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("student.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("student.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.code , '[' , sub_district_id.name, ']')", "subDistrictValue")
        .addSelect("student.contractHouseNumber", "contractHouseNumber")
        .addSelect("student.contractVillage", "contractVillage")
        .addSelect("student.contractRoad", "contractRoad")
        .addSelect("student.contractCountryId", "contractCountryId")
        .addSelect("CONCAT(contract_country_id.code , '[' , contract_country_id.name, ']')", "contractCountryValue")
        .addSelect("student.contractProvinceId", "contractProvinceId")
        .addSelect("CONCAT(contract_province_id.code , '[' , contract_province_id.name, ']')", "contractProvinceValue")
        .addSelect("student.contractDistrictId", "contractDistrictId")
        .addSelect("CONCAT(contract_district_id.code , '[' , contract_district_id.name, ']')", "contractDistrictValue")
        .addSelect("student.contractSubDistrictId", "contractSubDistrictId")
        .addSelect("CONCAT(contract_sub_district_id.code , '[' , contract_sub_district_id.name, ']')", "contractSubDistrictValue")
        .addSelect("student.oldSchoolName", "oldSchoolName")
        .addSelect("student.oldSchoolCountryId", "oldSchoolCountryId")
        .addSelect("student.oldSchoolProvinceId", "oldSchoolProvinceId")
        .addSelect("student.oldSchoolDistrictId", "oldSchoolDistrictId")
        .addSelect("student.oldSchoolSubDistrictId", "oldSchoolSubDistrictId")
        .addSelect("student.closeFriendInClass", "closeFriendInClass")
        .addSelect("student.closeFriendInClassNickname", "closeFriendInClassNickname")
        .addSelect("student.closeFriendInClassSchool", "closeFriendInClassSchool")
        .addSelect("student.closeFriendInClassPhone", "closeFriendInClassPhone")
        .addSelect("student.closeFriendOtherClass", "closeFriendOtherClass")
        .addSelect("student.closeFriendOtherClassNickname", "closeFriendOtherClassNickname")
        .addSelect("student.closeFriendOtherClassSchool", "closeFriendOtherClassSchool")
        .addSelect("student.closeFriendOtherClassPhone", "closeFriendOtherClassPhone")
        .addSelect("student.bloodType", "bloodType")
        .addSelect("student.congenitalDisease", "congenitalDisease")
        .addSelect("student.height", "height")
        .addSelect("student.weight", "weight")
        .addSelect("student.defect", "defect")
        .addSelect("student.aliveWithId", "aliveWithId")
        .addSelect("CONCAT(alive_with_id.aliveWithName , '[' , alive_with_id.aliveWithDescription, ']')", "aliveWithValue")
        .addSelect("student.parentStatus", "parentStatus")
        .addSelect("student.classroomId", "classroomId")
        .addSelect("CONCAT(classroom_id.classroomTypeId , '[' , classroom_id.mentorFirst, ']')", "classroomValue")
        .addSelect("student.fatherTitle", "fatherTitle")
        .addSelect("student.fatherFirstname", "fatherFirstname")
        .addSelect("student.fatherLastname", "fatherLastname")
        .addSelect("student.fatherPersonalCode", "fatherPersonalCode")
        .addSelect("student.fatherBloodType", "fatherBloodType")
        .addSelect("student.fatherIncome", "fatherIncome")
        .addSelect("student.fatherOccupation", "fatherOccupation")
        .addSelect("student.fatherPhone", "fatherPhone")
        .addSelect("student.motherTitle", "motherTitle")
        .addSelect("student.motherFirstname", "motherFirstname")
        .addSelect("student.motherLastname", "motherLastname")
        .addSelect("student.motherPersonalCode", "motherPersonalCode")
        .addSelect("student.motherBloodType", "motherBloodType")
        .addSelect("student.motherIncome", "motherIncome")
        .addSelect("student.motherOccupation", "motherOccupation")
        .addSelect("student.motherPhone", "motherPhone")
        .addSelect("student.parentTitle", "parentTitle")
        .addSelect("student.parentFirstname", "parentFirstname")
        .addSelect("student.parentLastname", "parentLastname")
        .addSelect("student.parentPersonalCode", "parentPersonalCode")
        .addSelect("student.parentBloodType", "parentBloodType")
        .addSelect("student.parentIncome", "parentIncome")
        .addSelect("student.parentOccupation", "parentOccupation")
        .addSelect("student.parentPhone", "parentPhone")
        .addSelect("student.personalCode", "personalCode")
      .from(Student, "student")
        .leftJoin(Gendar, "gendar_id","gendar_id.Id = student.gendarId")
        .leftJoin(Nationality, "nationality_id","nationality_id.Id = student.nationalityId")
        .leftJoin(Ethnicity, "ethnicity_id","ethnicity_id.Id = student.ethnicityId")
        .leftJoin(Religion, "religion_id","religion_id.Id = student.religionId")
        .leftJoin(Country, "birth_country_id","birth_country_id.Id = student.birthCountryId")
        .leftJoin(Country, "country_id","country_id.Id = student.countryId")
        .leftJoin(SubDistrict, "province_id","province_id.Id = student.provinceId")
        .leftJoin(District, "district_id","district_id.Id = student.districtId")
        .leftJoin(Province, "sub_district_id","sub_district_id.Id = student.subDistrictId")
        .leftJoin(Country, "contract_country_id","contract_country_id.Id = student.contractCountryId")
        .leftJoin(SubDistrict, "contract_province_id","contract_province_id.Id = student.contractProvinceId")
        .leftJoin(District, "contract_district_id","contract_district_id.Id = student.contractDistrictId")
        .leftJoin(Province, "contract_sub_district_id","contract_sub_district_id.Id = student.contractSubDistrictId")
        .leftJoin(AliveWith, "alive_with_id","alive_with_id.Id = student.aliveWithId")
        .leftJoin(Classroom, "classroom_id","classroom_id.Id = student.classroomId")
})
export class VwStudentItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentCode: string;

    @ViewColumn()
    personalCode: string;

    @ViewColumn()
    status: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstname: string;

    @ViewColumn()
    lastname: string;

    @ViewColumn()
    firstnameEn: string;

    @ViewColumn()
    lastnameEn: string;

    @ViewColumn()
    gendarId: number;

    @ViewColumn()
    gendarValue: string;

    @ViewColumn()
    birthDate: Date;

    @ViewColumn()
    nationalityId: number;

    @ViewColumn()
    nationalityValue: string;

    @ViewColumn()
    ethnicityId: number;

    @ViewColumn()
    ethnicityValue: string;

    @ViewColumn()
    religionId: number;

    @ViewColumn()
    religionValue: string;

    @ViewColumn()
    email: string;

    @ViewColumn()
    phoneNumber: string;

    @ViewColumn()
    specialAbility: string;

    @ViewColumn()
    birthHospital: string;

    @ViewColumn()
    birthCountryId: number;

    @ViewColumn()
    birthCountryValue: string;

    @ViewColumn()
    birthProvinceId: string;

    @ViewColumn()
    birthDistrictId: string;

    @ViewColumn()
    birthSubDistrictId: string;

    @ViewColumn()
    houseNumber: string;

    @ViewColumn()
    village: string;

    @ViewColumn()
    road: string;

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
    contractHouseNumber: string;

    @ViewColumn()
    contractVillage: string;

    @ViewColumn()
    contractRoad: string;

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
    oldSchoolName: string;

    @ViewColumn()
    oldSchoolCountryId: string;

    @ViewColumn()
    oldSchoolProvinceId: string;

    @ViewColumn()
    oldSchoolDistrictId: string;

    @ViewColumn()
    oldSchoolSubDistrictId: string;

    @ViewColumn()
    closeFriendInClass: string;

    @ViewColumn()
    closeFriendInClassNickname: string;

    @ViewColumn()
    closeFriendInClassSchool: string;

    @ViewColumn()
    closeFriendInClassPhone: string;

    @ViewColumn()
    closeFriendOtherClass: string;

    @ViewColumn()
    closeFriendOtherClassNickname: string;

    @ViewColumn()
    closeFriendOtherClassSchool: string;

    @ViewColumn()
    closeFriendOtherClassPhone: string;

    @ViewColumn()
    bloodType: number;

    @ViewColumn()
    congenitalDisease: string;

    @ViewColumn()
    height: number;

    @ViewColumn()
    weight: number;

    @ViewColumn()
    defect: string;

    @ViewColumn()
    aliveWithId: number;

    @ViewColumn()
    aliveWithValue: string;

    @ViewColumn()
    parentStatus: number;

    @ViewColumn()
    classroomId: number;

    @ViewColumn()
    classroomValue: string;

    @ViewColumn()
    fatherTitle: number;

    @ViewColumn()
    fatherFirstname: string;

    @ViewColumn()
    fatherLastname: string;

    @ViewColumn()
    fatherPersonalCode: string;

    @ViewColumn()
    fatherBloodType: number;

    @ViewColumn()
    fatherIncome: string;

    @ViewColumn()
    fatherOccupation: string;

    @ViewColumn()
    fatherPhone: string;

    @ViewColumn()
    motherTitle: number;

    @ViewColumn()
    motherFirstname: string;

    @ViewColumn()
    motherLastname: string;

    @ViewColumn()
    motherPersonalCode: string;

    @ViewColumn()
    motherBloodType: number;

    @ViewColumn()
    motherIncome: string;

    @ViewColumn()
    motherOccupation: string;

    @ViewColumn()
    motherPhone: string;

    @ViewColumn()
    parentTitle: number;

    @ViewColumn()
    parentFirstname: string;

    @ViewColumn()
    parentLastname: string;

    @ViewColumn()
    parentPersonalCode: string;

    @ViewColumn()
    parentBloodType: number;

    @ViewColumn()
    parentIncome: string;

    @ViewColumn()
    parentOccupation: string;

    @ViewColumn()
    parentPhone: string;
}
