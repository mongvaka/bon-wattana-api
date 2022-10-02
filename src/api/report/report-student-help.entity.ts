import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_student_help_by_class',
    expression: `select 
    ct."typeName" as name,
    a.sumva as value1
    from classroom_type ct 
    left join (
    select count(sh.id) as sumva ,s."classroomTypeId"  from student_help sh 
    inner join student s on s.id= sh."studentId" 
    inner join year_term yt on yt.id = sh."yearTermId" and yt."isParent" 
    where sh."deletedAt" isnull 
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId" = ct.id 
    order by ct."typeName"`
})
export class ReportStudentHelpByClass {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
}
@ViewEntity({
    name:'rp_student_help_by_room',
    expression: `select 
    ct."name" as name,
    a.sumva as value1
    from classroom ct 
    left join (
    select count(sh.id) as sumva ,s."classroomId"  from student_help sh 
    inner join student s on s.id= sh."studentId" 
    inner join year_term yt on yt.id = sh."yearTermId" and yt."isParent" 
    where sh."deletedAt" isnull 
    group by s."classroomId" 
    ) as a on a."classroomId" = ct.id 
    order by ct."id"`
})
export class ReportStudentHelpByRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
}
@ViewEntity({
    name:'rp_student_help_by_class_and_room',
    expression: `select 
    ct."typeName" as name,
    cr."name" as value1,
    a.sumva as value2
    from classroom_type ct 
    left join classroom cr on 1=1
    left join (
    select count(sh.id) as sumva ,s."classroomTypeId",s."classroomId"  from student_help sh 
    inner join student s on s.id= sh."studentId" 
    inner join year_term yt on yt.id = sh."yearTermId" and yt."isParent" 
    where sh."deletedAt" isnull 
    group by s."classroomTypeId" ,s."classroomId" 
    ) as a on a."classroomTypeId" = ct.id and a."classroomId"  = cr.id
    order by ct."typeName" ,cr.id`
})
export class ReportStudentHelpByClassAndRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
}