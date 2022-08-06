import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Hopital } from "src/api/hopital/hopital.entity";
import { Country } from "src/api/country/country.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";
import { District } from "src/api/district/district.entity";
import { Province } from "src/api/province/province.entity";
import { OldSchool } from "src/api/old-school/old-school.entity";
import { Teacher } from "src/api/teacher/teacher.entity";

@Entity('student')
export class Student extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: false})
  studentCode?: string;

  @Column({nullable: true})
  status?: number;

  @Column({nullable: true})
  title?: number;

  @Column({nullable: true})
  firstname?: string;

  @Column({nullable: true})
  lastname?: string;

  @Column({nullable: true})
  gendar?: number;

  @Column({nullable: false})
  birthDate?: Date;

  @Column({nullable: false})
  nationality?: string;

  @Column({nullable: false})
  ethnicity?: string;

  @Column({nullable: false})
  religion?: string;

  @Column({nullable: false})
  email?: string;

  @Column({nullable: false})
  phoneNumber?: string;

  @Column({nullable: false})
  specialAbility?: string;

  @Column({nullable: false})
  birthHospitalId?: number;

  @Column({nullable: false})
  birthCountryId?: number;

  @Column({nullable: false})
  birthSubDistrictId?: string;

  @Column({nullable: false})
  birthDistrictId?: string;

  @Column({nullable: false})
  birthProvinceId?: string;

  @Column({nullable: true})
  address?: string;

  @Column({nullable: false})
  countryId?: number;

  @Column({nullable: true})
  subDistrictId?: number;

  @Column({nullable: true})
  districtId?: number;

  @Column({nullable: true})
  provinceId?: number;

  @Column({nullable: false})
  postCode?: string;

  @Column({nullable: false})
  contractAddress?: string;

  @Column({nullable: false})
  contractCountryId?: number;

  @Column({nullable: false})
  contractSubDistrictId?: number;

  @Column({nullable: false})
  contractDistrictId?: number;

  @Column({nullable: false})
  contractProvinceId?: number;

  @Column({nullable: false})
  contractPostCode?: string;

  @Column({nullable: false})
  oldSchoolId?: number;

  @Column({nullable: false})
  className?: number;

  @Column({nullable: false})
  mentorTeacherFirstId?: number;

  @Column({nullable: false})
  mentorTeacherSecondId?: number;

  @Column({nullable: false})
  closeFreindInClassId?: number;

  @Column({nullable: false})
  closeFreindOtherClassId?: number;

  @Column({nullable: false})
  bloodType?: number;

  @Column({nullable: true})
  liveWith?: number;

  @Column({nullable: false})
  parentStatus?: number;

  @Column({nullable: false})
  imageProfile?: string;

  @Column({nullable: false})
  room?: number;
}
@ViewEntity({
    name:'student_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("student.id", "id")
        .addSelect("student.studentCode", "studentCode")
        .addSelect("student.status", "status")
        .addSelect("student.firstname", "firstname")
        .addSelect("student.lastname", "lastname")
        .addSelect("student.gendar", "gendar")
        .from(Student, "student")
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
    gendar: number;
}

@ViewEntity({
  name:'student_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("student.id", "value")
  .addSelect("CONCAT(student.studentCode , '[' , student.firstname, ']')", "label")
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
        .addSelect("student.gendar", "gendar")
        .addSelect("student.birthDate", "birthDate")
        .addSelect("student.nationality", "nationality")
        .addSelect("student.ethnicity", "ethnicity")
        .addSelect("student.religion", "religion")
        .addSelect("student.email", "email")
        .addSelect("student.phoneNumber", "phoneNumber")
        .addSelect("student.specialAbility", "specialAbility")
        .addSelect("student.birthHospitalId", "birthHospitalId")
        .addSelect("CONCAT(birth_hospital_id.name , '[' , birth_hospital_id.addressId, ']')", "birthHospitalValue")
        .addSelect("student.birthCountryId", "birthCountryId")
        .addSelect("CONCAT(birth_country_id.code , '[' , birth_country_id.name, ']')", "birthCountryValue")
        .addSelect("student.birthSubDistrictId", "birthSubDistrictId")
        .addSelect("student.birthDistrictId", "birthDistrictId")
        .addSelect("student.birthProvinceId", "birthProvinceId")
        .addSelect("student.address", "address")
        .addSelect("student.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("student.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.name , '[' , sub_district_id.postCode, ']')", "subDistrictValue")
        .addSelect("student.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("student.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("student.postCode", "postCode")
        .addSelect("student.contractAddress", "contractAddress")
        .addSelect("student.contractCountryId", "contractCountryId")
        .addSelect("CONCAT(contract_country_id.code , '[' , contract_country_id.name, ']')", "contractCountryValue")
        .addSelect("student.contractSubDistrictId", "contractSubDistrictId")
        .addSelect("CONCAT(contract_sub_district_id.name , '[' , contract_sub_district_id.postCode, ']')", "contractSubDistrictValue")
        .addSelect("student.contractDistrictId", "contractDistrictId")
        .addSelect("CONCAT(contract_district_id.code , '[' , contract_district_id.name, ']')", "contractDistrictValue")
        .addSelect("student.contractProvinceId", "contractProvinceId")
        .addSelect("CONCAT(contract_province_id.code , '[' , contract_province_id.name, ']')", "contractProvinceValue")
        .addSelect("student.contractPostCode", "contractPostCode")
        .addSelect("student.oldSchoolId", "oldSchoolId")
        .addSelect("CONCAT(old_school_id.name , '[' , old_school_id.addressId, ']')", "oldSchoolValue")
        .addSelect("student.className", "className")
        .addSelect("student.mentorTeacherFirstId", "mentorTeacherFirstId")
        .addSelect("CONCAT(mentor_teacher_first_id.firstname , '[' , mentor_teacher_first_id.lastname, ']')", "mentorTeacherFirstValue")
        .addSelect("student.mentorTeacherSecondId", "mentorTeacherSecondId")
        .addSelect("CONCAT(mentor_teacher_second_id.firstname , '[' , mentor_teacher_second_id.lastname, ']')", "mentorTeacherSecondValue")
        .addSelect("student.closeFreindInClassId", "closeFreindInClassId")
        .addSelect("CONCAT(close_freind_in_class_id.studentCode , '[' , close_freind_in_class_id.firstname, ']')", "closeFreindInClassValue")
        .addSelect("student.closeFreindOtherClassId", "closeFreindOtherClassId")
        .addSelect("CONCAT(close_freind_other_class_id.studentCode , '[' , close_freind_other_class_id.firstname, ']')", "closeFreindOtherClassValue")
        .addSelect("student.bloodType", "bloodType")
        .addSelect("student.liveWith", "liveWith")
        .addSelect("student.parentStatus", "parentStatus")
        .addSelect("student.imageProfile", "imageProfile")
        .addSelect("student.room", "room")
      .from(Student, "student")
        .leftJoin(Hopital, "birth_hospital_id","birth_hospital_id.Id = student.birthHospitalId")
        .leftJoin(Country, "birth_country_id","birth_country_id.Id = student.birthCountryId")
        .leftJoin(Country, "country_id","country_id.Id = student.countryId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = student.subDistrictId")
        .leftJoin(District, "district_id","district_id.Id = student.districtId")
        .leftJoin(Province, "province_id","province_id.Id = student.provinceId")
        .leftJoin(Country, "contract_country_id","contract_country_id.Id = student.contractCountryId")
        .leftJoin(SubDistrict, "contract_sub_district_id","contract_sub_district_id.Id = student.contractSubDistrictId")
        .leftJoin(District, "contract_district_id","contract_district_id.Id = student.contractDistrictId")
        .leftJoin(Province, "contract_province_id","contract_province_id.Id = student.contractProvinceId")
        .leftJoin(OldSchool, "old_school_id","old_school_id.Id = student.oldSchoolId")
        .leftJoin(Teacher, "mentor_teacher_first_id","mentor_teacher_first_id.Id = student.mentorTeacherFirstId")
        .leftJoin(Teacher, "mentor_teacher_second_id","mentor_teacher_second_id.Id = student.mentorTeacherSecondId")
        .leftJoin(Student, "close_freind_in_class_id","close_freind_in_class_id.Id = student.closeFreindInClassId")
        .leftJoin(Student, "close_freind_other_class_id","close_freind_other_class_id.Id = student.closeFreindOtherClassId")
})
export class VwStudentItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentCode: string;

    @ViewColumn()
    status: number;

    @ViewColumn()
    title: number;

    @ViewColumn()
    firstname: string;

    @ViewColumn()
    lastname: string;

    @ViewColumn()
    gendar: number;

    @ViewColumn()
    birthDate: Date;

    @ViewColumn()
    nationality: string;

    @ViewColumn()
    ethnicity: string;

    @ViewColumn()
    religion: string;

    @ViewColumn()
    email: string;

    @ViewColumn()
    phoneNumber: string;

    @ViewColumn()
    specialAbility: string;

    @ViewColumn()
    birthHospitalId: number;

    @ViewColumn()
    birthHospitalValue: string;

    @ViewColumn()
    birthCountryId: number;

    @ViewColumn()
    birthCountryValue: string;

    @ViewColumn()
    birthSubDistrictId: string;

    @ViewColumn()
    birthDistrictId: string;

    @ViewColumn()
    birthProvinceId: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    countryId: number;

    @ViewColumn()
    countryValue: string;

    @ViewColumn()
    subDistrictId: number;

    @ViewColumn()
    subDistrictValue: string;

    @ViewColumn()
    districtId: number;

    @ViewColumn()
    districtValue: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;

    @ViewColumn()
    postCode: string;

    @ViewColumn()
    contractAddress: string;

    @ViewColumn()
    contractCountryId: number;

    @ViewColumn()
    contractCountryValue: string;

    @ViewColumn()
    contractSubDistrictId: number;

    @ViewColumn()
    contractSubDistrictValue: string;

    @ViewColumn()
    contractDistrictId: number;

    @ViewColumn()
    contractDistrictValue: string;

    @ViewColumn()
    contractProvinceId: number;

    @ViewColumn()
    contractProvinceValue: string;

    @ViewColumn()
    contractPostCode: string;

    @ViewColumn()
    oldSchoolId: number;

    @ViewColumn()
    oldSchoolValue: string;

    @ViewColumn()
    className: number;

    @ViewColumn()
    mentorTeacherFirstId: number;

    @ViewColumn()
    mentorTeacherFirstValue: string;

    @ViewColumn()
    mentorTeacherSecondId: number;

    @ViewColumn()
    mentorTeacherSecondValue: string;

    @ViewColumn()
    closeFreindInClassId: number;

    @ViewColumn()
    closeFreindInClassValue: string;

    @ViewColumn()
    closeFreindOtherClassId: number;

    @ViewColumn()
    closeFreindOtherClassValue: string;

    @ViewColumn()
    bloodType: number;

    @ViewColumn()
    liveWith: number;

    @ViewColumn()
    parentStatus: number;

    @ViewColumn()
    imageProfile: string;

    @ViewColumn()
    room: number;
}
