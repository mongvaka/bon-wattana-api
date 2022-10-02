import { ViewColumn, ViewEntity } from "typeorm"

@ViewEntity({
    name:'rp_homvisit_sumarize',
    expression: `select needHelp.sumva as name ,
    dontHelp.sumva as value1
    from 
    (
    select count(shv.id) as sumva  from student_home_visit shv 
    inner join student s on s.id = shv."studentId" and s."deletedAt" isnull 
    where shv."deletedAt" isnull and shv."isHelpStudentNeed" 
    ) as needHelp
    left join (
    select count(shv.id)  as sumva from student_home_visit shv 
    inner join student s on s.id = shv."studentId" and s."deletedAt" isnull 
    where shv."deletedAt" isnull and shv."isHelpStudentNeed" isnull or shv."isHelpStudentNeed" is not true 
    ) as dontHelp on 1=1`
})
export class ReportHomvisitSumarize {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
}