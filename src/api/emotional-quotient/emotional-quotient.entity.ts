import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Student } from "src/api/student/student.entity";
import { YearTerm } from "src/api/year-term/year-term.entity";

@Entity('emotional_quotient')
export class EmotionalQuotient extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  studentId?: number;

  @Column({nullable: true})
  yearTermId?: number;

  @Column({nullable: true})
  eqCh1?: number;

  @Column({nullable: true})
  eqCh2?: number;

  @Column({nullable: true})
  eqCh3?: number;

  @Column({nullable: true})
  eqCh4?: number;

  @Column({nullable: true})
  eqCh5?: number;

  @Column({nullable: true})
  eqCh6?: number;

  @Column({nullable: true})
  eqCh7?: number;

  @Column({nullable: true})
  eqCh8?: number;

  @Column({nullable: true})
  eqCh9?: number;

  @Column({nullable: true})
  eqCh10?: number;

  @Column({nullable: true})
  eqCh11?: number;

  @Column({nullable: true})
  eqCh12?: number;

  @Column({nullable: true})
  eqCh13?: number;

  @Column({nullable: true})
  eqCh14?: number;

  @Column({nullable: true})
  eqCh15?: number;

  @Column({nullable: true})
  eqCh16?: number;

  @Column({nullable: true})
  eqCh17?: number;

  @Column({nullable: true})
  eqCh18?: number;

  @Column({nullable: true})
  eqCh19?: number;

  @Column({nullable: true})
  eqCh20?: number;

  @Column({nullable: true})
  eqCh21?: number;

  @Column({nullable: true})
  eqCh22?: number;

  @Column({nullable: true})
  eqCh23?: number;

  @Column({nullable: true})
  eqCh24?: number;

  @Column({nullable: true})
  eqCh25?: number;

  @Column({nullable: true})
  eqCh26?: number;

  @Column({nullable: true})
  eqCh27?: number;

  @Column({nullable: true})
  eqCh28?: number;

  @Column({nullable: true})
  eqCh29?: number;

  @Column({nullable: true})
  eqCh30?: number;

  @Column({nullable: true})
  eqCh31?: number;

  @Column({nullable: true})
  eqCh32?: number;

  @Column({nullable: true})
  eqCh33?: number;

  @Column({nullable: true})
  eqCh34?: number;

  @Column({nullable: true})
  eqCh35?: number;

  @Column({nullable: true})
  eqCh36?: number;

  @Column({nullable: true})
  eqCh37?: number;

  @Column({nullable: true})
  eqCh38?: number;

  @Column({nullable: true})
  eqCh39?: number;

  @Column({nullable: true})
  eqCh40?: number;

  @Column({nullable: true})
  eqCh41?: number;

  @Column({nullable: true})
  eqCh42?: number;

  @Column({nullable: true})
  eqCh43?: number;

  @Column({nullable: true})
  eqCh44?: number;

  @Column({nullable: true})
  eqCh45?: number;

  @Column({nullable: true})
  eqCh46?: number;

  @Column({nullable: true})
  eqCh47?: number;

  @Column({nullable: true})
  eqCh48?: number;

  @Column({nullable: true})
  eqCh49?: number;

  @Column({nullable: true})
  eqCh50?: number;

  @Column({nullable: true})
  eqCh51?: number;

  @Column({nullable: true})
  eqCh52?: number;

  @Column({nullable: true})
  handleSalf?: number;

  @Column({nullable: true})
  consider?: number;

  @Column({nullable: true})
  responsible?: number;

  @Column({nullable: true})
  motivated?: number;

  @Column({nullable: true})
  decide?: number;

  @Column({nullable: true})
  relationship?: number;

  @Column({nullable: true})
  selfEsteem?: number;

  @Column({nullable: true})
  lifeGood?: number;

  @Column({nullable: true})
  happy?: number;
}
@ViewEntity({
    name:'emotional_quotient_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("emotional_quotient.id", "id")
        .addSelect("emotional_quotient.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("emotional_quotient.handleSalf", "handleSalf")
        .addSelect("emotional_quotient.consider", "consider")
        .addSelect("emotional_quotient.responsible", "responsible")
        .addSelect("emotional_quotient.motivated", "motivated")
        .addSelect("emotional_quotient.decide", "decide")
        .addSelect("emotional_quotient.relationship", "relationship")
        .addSelect("emotional_quotient.selfEsteem", "selfEsteem")
        .addSelect("emotional_quotient.lifeGood", "lifeGood")
        .addSelect("emotional_quotient.happy", "happy")
        .from(EmotionalQuotient, "emotional_quotient")
        .leftJoin(Student, "student_id","student_id.Id = emotional_quotient.studentId")
})
export class VwEmotionalQuotientList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    handleSalf: number;

    @ViewColumn()
    consider: number;

    @ViewColumn()
    responsible: number;

    @ViewColumn()
    motivated: number;

    @ViewColumn()
    decide: number;

    @ViewColumn()
    relationship: number;

    @ViewColumn()
    selfEsteem: number;

    @ViewColumn()
    lifeGood: number;

    @ViewColumn()
    happy: number;
}

@ViewEntity({
  name:'emotional_quotient_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("emotional_quotient.id", "value")
  .addSelect("CONCAT(emotional_quotient.yearTermId , ' ' , emotional_quotient.eqCh1)", "label")
      .from(EmotionalQuotient, "emotional_quotient")
})
export class VwEmotionalQuotientDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'emotional_quotient_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("emotional_quotient.id", "id")
        .addSelect("emotional_quotient.studentId", "studentId")
        .addSelect("CONCAT(student_id.firstname , ' ' , student_id.lastname)", "studentValue")
        .addSelect("emotional_quotient.yearTermId", "yearTermId")
        .addSelect("CONCAT(year_term_id.year , ' ' , year_term_id.term)", "yearTermValue")
        .addSelect("emotional_quotient.eqCh1", "eqCh1")
        .addSelect("emotional_quotient.eqCh2", "eqCh2")
        .addSelect("emotional_quotient.eqCh3", "eqCh3")
        .addSelect("emotional_quotient.eqCh4", "eqCh4")
        .addSelect("emotional_quotient.eqCh5", "eqCh5")
        .addSelect("emotional_quotient.eqCh6", "eqCh6")
        .addSelect("emotional_quotient.eqCh7", "eqCh7")
        .addSelect("emotional_quotient.eqCh8", "eqCh8")
        .addSelect("emotional_quotient.eqCh9", "eqCh9")
        .addSelect("emotional_quotient.eqCh10", "eqCh10")
        .addSelect("emotional_quotient.eqCh11", "eqCh11")
        .addSelect("emotional_quotient.eqCh12", "eqCh12")
        .addSelect("emotional_quotient.eqCh13", "eqCh13")
        .addSelect("emotional_quotient.eqCh14", "eqCh14")
        .addSelect("emotional_quotient.eqCh15", "eqCh15")
        .addSelect("emotional_quotient.eqCh16", "eqCh16")
        .addSelect("emotional_quotient.eqCh17", "eqCh17")
        .addSelect("emotional_quotient.eqCh18", "eqCh18")
        .addSelect("emotional_quotient.eqCh19", "eqCh19")
        .addSelect("emotional_quotient.eqCh20", "eqCh20")
        .addSelect("emotional_quotient.eqCh21", "eqCh21")
        .addSelect("emotional_quotient.eqCh22", "eqCh22")
        .addSelect("emotional_quotient.eqCh23", "eqCh23")
        .addSelect("emotional_quotient.eqCh24", "eqCh24")
        .addSelect("emotional_quotient.eqCh25", "eqCh25")
        .addSelect("emotional_quotient.eqCh26", "eqCh26")
        .addSelect("emotional_quotient.eqCh27", "eqCh27")
        .addSelect("emotional_quotient.eqCh28", "eqCh28")
        .addSelect("emotional_quotient.eqCh29", "eqCh29")
        .addSelect("emotional_quotient.eqCh30", "eqCh30")
        .addSelect("emotional_quotient.eqCh31", "eqCh31")
        .addSelect("emotional_quotient.eqCh32", "eqCh32")
        .addSelect("emotional_quotient.eqCh33", "eqCh33")
        .addSelect("emotional_quotient.eqCh34", "eqCh34")
        .addSelect("emotional_quotient.eqCh35", "eqCh35")
        .addSelect("emotional_quotient.eqCh36", "eqCh36")
        .addSelect("emotional_quotient.eqCh37", "eqCh37")
        .addSelect("emotional_quotient.eqCh38", "eqCh38")
        .addSelect("emotional_quotient.eqCh39", "eqCh39")
        .addSelect("emotional_quotient.eqCh40", "eqCh40")
        .addSelect("emotional_quotient.eqCh41", "eqCh41")
        .addSelect("emotional_quotient.eqCh42", "eqCh42")
        .addSelect("emotional_quotient.eqCh43", "eqCh43")
        .addSelect("emotional_quotient.eqCh44", "eqCh44")
        .addSelect("emotional_quotient.eqCh45", "eqCh45")
        .addSelect("emotional_quotient.eqCh46", "eqCh46")
        .addSelect("emotional_quotient.eqCh47", "eqCh47")
        .addSelect("emotional_quotient.eqCh48", "eqCh48")
        .addSelect("emotional_quotient.eqCh49", "eqCh49")
        .addSelect("emotional_quotient.eqCh50", "eqCh50")
        .addSelect("emotional_quotient.eqCh51", "eqCh51")
        .addSelect("emotional_quotient.eqCh52", "eqCh52")
        .addSelect("emotional_quotient.handleSalf", "handleSalf")
        .addSelect("emotional_quotient.consider", "consider")
        .addSelect("emotional_quotient.responsible", "responsible")
        .addSelect("emotional_quotient.motivated", "motivated")
        .addSelect("emotional_quotient.decide", "decide")
        .addSelect("emotional_quotient.relationship", "relationship")
        .addSelect("emotional_quotient.selfEsteem", "selfEsteem")
        .addSelect("emotional_quotient.lifeGood", "lifeGood")
        .addSelect("emotional_quotient.happy", "happy")
      .from(EmotionalQuotient, "emotional_quotient")
        .leftJoin(Student, "student_id","student_id.Id = emotional_quotient.studentId")
        .leftJoin(YearTerm, "year_term_id","year_term_id.Id = emotional_quotient.yearTermId")
})
export class VwEmotionalQuotientItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    studentId: number;

    @ViewColumn()
    studentValue: string;

    @ViewColumn()
    yearTermId: number;

    @ViewColumn()
    yearTermValue: string;

    @ViewColumn()
    eqCh1: number;

    @ViewColumn()
    eqCh2: number;

    @ViewColumn()
    eqCh3: number;

    @ViewColumn()
    eqCh4: number;

    @ViewColumn()
    eqCh5: number;

    @ViewColumn()
    eqCh6: number;

    @ViewColumn()
    eqCh7: number;

    @ViewColumn()
    eqCh8: number;

    @ViewColumn()
    eqCh9: number;

    @ViewColumn()
    eqCh10: number;

    @ViewColumn()
    eqCh11: number;

    @ViewColumn()
    eqCh12: number;

    @ViewColumn()
    eqCh13: number;

    @ViewColumn()
    eqCh14: number;

    @ViewColumn()
    eqCh15: number;

    @ViewColumn()
    eqCh16: number;

    @ViewColumn()
    eqCh17: number;

    @ViewColumn()
    eqCh18: number;

    @ViewColumn()
    eqCh19: number;

    @ViewColumn()
    eqCh20: number;

    @ViewColumn()
    eqCh21: number;

    @ViewColumn()
    eqCh22: number;

    @ViewColumn()
    eqCh23: number;

    @ViewColumn()
    eqCh24: number;

    @ViewColumn()
    eqCh25: number;

    @ViewColumn()
    eqCh26: number;

    @ViewColumn()
    eqCh27: number;

    @ViewColumn()
    eqCh28: number;

    @ViewColumn()
    eqCh29: number;

    @ViewColumn()
    eqCh30: number;

    @ViewColumn()
    eqCh31: number;

    @ViewColumn()
    eqCh32: number;

    @ViewColumn()
    eqCh33: number;

    @ViewColumn()
    eqCh34: number;

    @ViewColumn()
    eqCh35: number;

    @ViewColumn()
    eqCh36: number;

    @ViewColumn()
    eqCh37: number;

    @ViewColumn()
    eqCh38: number;

    @ViewColumn()
    eqCh39: number;

    @ViewColumn()
    eqCh40: number;

    @ViewColumn()
    eqCh41: number;

    @ViewColumn()
    eqCh42: number;

    @ViewColumn()
    eqCh43: number;

    @ViewColumn()
    eqCh44: number;

    @ViewColumn()
    eqCh45: number;

    @ViewColumn()
    eqCh46: number;

    @ViewColumn()
    eqCh47: number;

    @ViewColumn()
    eqCh48: number;

    @ViewColumn()
    eqCh49: number;

    @ViewColumn()
    eqCh50: number;

    @ViewColumn()
    eqCh51: number;

    @ViewColumn()
    eqCh52: number;

    @ViewColumn()
    handleSalf: number;

    @ViewColumn()
    consider: number;

    @ViewColumn()
    responsible: number;

    @ViewColumn()
    motivated: number;

    @ViewColumn()
    decide: number;

    @ViewColumn()
    relationship: number;

    @ViewColumn()
    selfEsteem: number;

    @ViewColumn()
    lifeGood: number;

    @ViewColumn()
    happy: number;
}
