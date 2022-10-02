import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_student_scolar_by_class',
    expression: `select 
    ct."typeName" as name,
    a.sumval as value1
    from classroom_type ct 
    left join (
    select count(ss.id) as sumval,s."classroomTypeId"  from student_scolar ss 
    inner join student s on s.id = ss."studentId" 
    where ss."deletedAt" isnull 
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId" = ct.id
    order by ct."typeName" `
})
export class ReportStudentScolarByClass {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
}
@ViewEntity({
    name:'rp_student_scolar_by_room',
    expression: `select 
    ct."name" as name,
    a.sumval as value1
    from classroom  ct 
    left join (
    select count(ss.id) as sumval,s."classroomId"  from student_scolar ss 
    inner join student s on s.id = ss."studentId" 
    where ss."deletedAt" isnull 
    group by s."classroomId" 
    ) as a on a."classroomId" = ct.id
    order by ct."id" `
})
export class ReportStudentScolarByRoom  {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  
}
@ViewEntity({
    name:'rp_student_scolar_by_class_and_room',
    expression: `select 
    ct."typeName" as name,
    cr.name as value1,
    a.sumval as value2
    from classroom_type ct 
    left join classroom cr on 1=1
    left join (
    select count(ss.id) as sumval,s."classroomTypeId" ,s."classroomId" from student_scolar ss 
    inner join student s on s.id = ss."studentId" 
    where ss."deletedAt" isnull 
    group by s."classroomTypeId" ,s."classroomId"
    ) as a on a."classroomTypeId" = ct.id and  a."classroomId" = cr.id
    order by ct."typeName" , cr.id`
})
export class ReportStudentScolarByClassAndRoom  {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  
}