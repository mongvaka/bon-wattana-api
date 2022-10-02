import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_student_send_to_by_class',
    expression: `select 
    ct."typeName" as name,
    a.sumva as value1,
    b.sumva as value2
    from classroom_type ct 
    left join (
    select count(sc.id) as sumva ,s."classroomTypeId"  from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" = 3
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId"  = ct.id
    left join (
    select  count(sc.id) as sumva,s."classroomTypeId"  from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" != 3
    group by s."classroomTypeId" 
    ) as b on b."classroomTypeId"  = ct.id
    order by ct."typeName"`
})
export class ReportStudentSendToByClass {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
}
@ViewEntity({
    name:'rp_student_send_to_by_room',
    expression: `select 
    ct."name" as name,
    a.sumva as value1,
    b.sumva as value2
    from classroom ct 
    left join (
    select count(sc.id) as sumva ,s."classroomId"  from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" = 3
    group by s."classroomId" 
    ) as a on a."classroomId"  = ct.id
    left join (
    select  count(sc.id) as sumva,s."classroomId"  from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" != 3
    group by s."classroomId" 
    ) as b on b."classroomId"  = ct.id
    order by ct."id"`
})
export class ReportStudentSendToByRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
}
@ViewEntity({
    name:'rp_student_send_to_by_class_and_room',
    expression: `select 
    ct."typeName" as name,
    cr."name" as value1,
    a.sumva as value2,
    b.sumva as value3
    from classroom_type  ct 
    left join classroom cr on 1=1
    left join (
    select count(sc.id) as sumva ,s."classroomTypeId" ,s."classroomId" from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" = 3
    group by s."classroomTypeId" ,s."classroomId"
    ) as a on a."classroomTypeId"  = ct.id and a."classroomId" = cr.id
    left join (
    select  count(sc.id) as sumva,s."classroomTypeId" ,s."classroomId"  from student_consultant sc 
    inner join student s on s.id = sc."studentId"
    where sc."deletedAt" isnull 
    and sc."sentType" != 3
    group by s."classroomTypeId" ,s."classroomId"
    ) as b on b."classroomTypeId"  = ct.id and a."classroomId" = cr.id
    order by ct."typeName", cr.id`
})
export class ReportStudentSendToByClassAndRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
  @ViewColumn()
  value3:number
}