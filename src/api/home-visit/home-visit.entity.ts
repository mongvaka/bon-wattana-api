import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";
import { CongenitialDisease } from "src/api/congenitial-disease/congenitial-disease.entity";

@Entity('home_visit')
export class HomeVisit extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: false})
  siblingCount?: number;

  @Column({nullable: false})
  siblingOrder?: number;

  @Column({nullable: false})
  male?: boolean;

  @Column({nullable: false})
  female?: boolean;

  @Column({nullable: false})
  houseType?: number;

  @Column({nullable: false})
  aliveWith?: number;

  @Column({nullable: false})
  parentStatus?: number;

  @Column({nullable: false})
  netIncome?: number;

  @Column({nullable: false})
  getMoneyFrom?: number;

  @Column({nullable: false})
  moneyToSchool?: number;

  @Column({nullable: false})
  studentPartTime?: boolean;

  @Column({nullable: false})
  partTimeIncome?: number;

  @Column({nullable: false})
  timeStartPartTime?: string;

  @Column({nullable: false})
  timeEndPartTime?: string;

  @Column({nullable: false})
  parentFirstName?: string;

  @Column({nullable: false})
  parentLastName?: string;

  @Column({nullable: false})
  fatherFirstName?: string;

  @Column({nullable: false})
  motherFirstName?: string;

  @Column({nullable: false})
  fatherLastName?: string;

  @Column({nullable: false})
  motherLastName?: string;

  @Column({nullable: false})
  fatherOccupation?: string;

  @Column({nullable: false})
  motherOccupation?: string;

  @Column({nullable: false})
  parentOccupation?: string;

  @Column({nullable: false})
  nationality?: string;

  @Column({nullable: false})
  ethnicity?: string;

  @Column({nullable: false})
  religion?: string;

  @Column({nullable: false})
  bloodType?: number;

  @Column({nullable: false})
  weight?: number;

  @Column({nullable: false})
  height?: number;

  @Column({nullable: false})
  congenitalDiseaseId?: number;

  @Column({nullable: false})
  disabled?: string;

  @Column({nullable: false})
  phoneNumber?: string;

  @Column({nullable: false})
  facebook?: string;

  @Column({nullable: false})
  email?: string;
}
@ViewEntity({
    name:'home_visit_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("home_visit.id", "id")
        .addSelect("home_visit.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("home_visit.houseType", "houseType")
        .addSelect("home_visit.aliveWith", "aliveWith")
        .addSelect("home_visit.parentStatus", "parentStatus")
        .addSelect("home_visit.parentFirstName", "parentFirstName")
        .from(HomeVisit, "home_visit")
        .leftJoin(Student, "student_id","student_id.Id = home_visit.studentId")
})
export class VwHomeVisitList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    houseType: number;

    @ViewColumn()
    aliveWith: number;

    @ViewColumn()
    parentStatus: number;

    @ViewColumn()
    parentFirstName: string;
}

@ViewEntity({
  name:'home_visit_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("home_visit.id", "value")
  .addSelect("CONCAT(home_visit.studentId , '[' , home_visit.aliveWith, ']')", "label")
      .from(HomeVisit, "home_visit")
})
export class VwHomeVisitDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'home_visit_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("home_visit.id", "id")
        .addSelect("home_visit.studentId", "studentId")
        .addSelect("CONCAT(student_id.studentCode , '[' , student_id.firstname, ']')", "studentValue")
        .addSelect("home_visit.siblingCount", "siblingCount")
        .addSelect("home_visit.siblingOrder", "siblingOrder")
        .addSelect("home_visit.male", "male")
        .addSelect("home_visit.female", "female")
        .addSelect("home_visit.houseType", "houseType")
        .addSelect("home_visit.aliveWith", "aliveWith")
        .addSelect("home_visit.parentStatus", "parentStatus")
        .addSelect("home_visit.netIncome", "netIncome")
        .addSelect("home_visit.getMoneyFrom", "getMoneyFrom")
        .addSelect("home_visit.moneyToSchool", "moneyToSchool")
        .addSelect("home_visit.studentPartTime", "studentPartTime")
        .addSelect("home_visit.partTimeIncome", "partTimeIncome")
        .addSelect("home_visit.timeStartPartTime", "timeStartPartTime")
        .addSelect("home_visit.timeEndPartTime", "timeEndPartTime")
        .addSelect("home_visit.parentFirstName", "parentFirstName")
        .addSelect("home_visit.parentLastName", "parentLastName")
        .addSelect("home_visit.fatherFirstName", "fatherFirstName")
        .addSelect("home_visit.motherFirstName", "motherFirstName")
        .addSelect("home_visit.fatherLastName", "fatherLastName")
        .addSelect("home_visit.motherLastName", "motherLastName")
        .addSelect("home_visit.fatherOccupation", "fatherOccupation")
        .addSelect("home_visit.motherOccupation", "motherOccupation")
        .addSelect("home_visit.parentOccupation", "parentOccupation")
        .addSelect("home_visit.nationality", "nationality")
        .addSelect("home_visit.ethnicity", "ethnicity")
        .addSelect("home_visit.religion", "religion")
        .addSelect("home_visit.bloodType", "bloodType")
        .addSelect("home_visit.weight", "weight")
        .addSelect("home_visit.height", "height")
        .addSelect("home_visit.congenitalDiseaseId", "congenitalDiseaseId")
        .addSelect("CONCAT(congenital_disease_id.name , '[' , congenital_disease_id.studentId, ']')", "congenitalDiseaseValue")
        .addSelect("home_visit.disabled", "disabled")
        .addSelect("home_visit.phoneNumber", "phoneNumber")
        .addSelect("home_visit.facebook", "facebook")
        .addSelect("home_visit.email", "email")
      .from(HomeVisit, "home_visit")
        .leftJoin(Student, "student_id","student_id.Id = home_visit.studentId")
        .leftJoin(CongenitialDisease, "congenital_disease_id","congenital_disease_id.Id = home_visit.congenitalDiseaseId")
})
export class VwHomeVisitItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    siblingCount: number;

    @ViewColumn()
    siblingOrder: number;

    @ViewColumn()
    male: boolean;

    @ViewColumn()
    female: boolean;

    @ViewColumn()
    houseType: number;

    @ViewColumn()
    aliveWith: number;

    @ViewColumn()
    parentStatus: number;

    @ViewColumn()
    netIncome: number;

    @ViewColumn()
    getMoneyFrom: number;

    @ViewColumn()
    moneyToSchool: number;

    @ViewColumn()
    studentPartTime: boolean;

    @ViewColumn()
    partTimeIncome: number;

    @ViewColumn()
    timeStartPartTime: string;

    @ViewColumn()
    timeEndPartTime: string;

    @ViewColumn()
    parentFirstName: string;

    @ViewColumn()
    parentLastName: string;

    @ViewColumn()
    fatherFirstName: string;

    @ViewColumn()
    motherFirstName: string;

    @ViewColumn()
    fatherLastName: string;

    @ViewColumn()
    motherLastName: string;

    @ViewColumn()
    fatherOccupation: string;

    @ViewColumn()
    motherOccupation: string;

    @ViewColumn()
    parentOccupation: string;

    @ViewColumn()
    nationality: string;

    @ViewColumn()
    ethnicity: string;

    @ViewColumn()
    religion: string;

    @ViewColumn()
    bloodType: number;

    @ViewColumn()
    weight: number;

    @ViewColumn()
    height: number;

    @ViewColumn()
    congenitalDiseaseId: number;

    @ViewColumn()
    congenitalDiseaseValue: string;

    @ViewColumn()
    disabled: string;

    @ViewColumn()
    phoneNumber: string;

    @ViewColumn()
    facebook: string;

    @ViewColumn()
    email: string;
}
