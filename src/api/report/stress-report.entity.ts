import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_stress_sumarize',
    expression: `select a.sumva as name,
    b.sumva as value1,
    c.sumva as value2,
    d.sumva as value3
    from(
    select count(str.id) as sumva  from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<23
    ) as a 
    left join(
    select count(str.id) as sumva from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=23 
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<42
    ) as b on 1=1
    left join(
    select count(str.id) as sumva from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=42
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<62
    ) as c on 1=1
    left join(
    select count(str.id) as sumva from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>62
    ) as d on 1=1`
})
export class ReportStressSumarize {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
  @ViewColumn()
  value3:number
}

@ViewEntity({
    name:'rp_stress_by_class',
    expression: `select
    ct."typeName" as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3,
    d.sumva as value4
    from classroom_type ct 
    left join(
    select count(str.id) as sumva , s."classroomTypeId"  from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<23
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId" = ct.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=23 
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<42
    group by s."classroomTypeId" 
    ) as b on b."classroomTypeId" = ct.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=42
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<62
    group by s."classroomTypeId" 
    ) as c on c."classroomTypeId" = ct.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>62
    group by s."classroomTypeId" 
    ) as d on d."classroomTypeId" = ct.id
    order by ct."typeName"`
})
export class ReportStressByClass {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
  @ViewColumn()
  value3:number
  @ViewColumn()
  value4:number
}

@ViewEntity({
    name:'rp_tress_class_and_room',
    expression: `select
    ct."typeName" as name,
    cr.name as value1,
    a.sumva as value2,
    b.sumva as value3,
    c.sumva as value4,
    d.sumva as value5
    from classroom_type ct 
    left join classroom cr on 1=1
    left join(
    select count(str.id) as sumva , s."classroomTypeId" , s."classroomId"  from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<23
    group by s."classroomTypeId"  , s."classroomId"
    ) as a on a."classroomTypeId" = ct.id  and a."classroomId" = cr.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=23 
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<42
    group by s."classroomTypeId"  , s."classroomId"
    ) as b on b."classroomTypeId" = ct.id and b."classroomId" = cr.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=42
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<62
    group by s."classroomTypeId"  , s."classroomId" 
    ) as c on c."classroomTypeId" = ct.id and c."classroomId" = cr.id
    left join(
    select count(str.id) as sumva , s."classroomTypeId" , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>62
    group by s."classroomTypeId"  , s."classroomId"
    ) as d on d."classroomTypeId" = ct.id and d."classroomId" = cr.id
    order by ct."typeName" ,cr.id`
})
export class ReportStressByClassAndRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
  @ViewColumn()
  value3:number
  @ViewColumn()
  value4:number
  @ViewColumn()
  value5:number
}

@ViewEntity({
    name:'rp_stress_by_room',
    expression: `select
    cr.name as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3,
    d.sumva as value4
    from classroom cr 
    left join(
    select count(str.id) as sumva , s."classroomId"  from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<23
    group by  s."classroomId"
    ) as a on a."classroomId" = cr.id
    left join(
    select count(str.id) as sumva  , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=23 
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<42
    group by s."classroomId"
    ) as b on  b."classroomId" = cr.id
    left join(
    select count(str.id) as sumva , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>=42
    and
    (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )<62
    group by  s."classroomId" 
    ) as c on c."classroomId" = cr.id
    left join(
    select count(str.id) as sumva , s."classroomId" from stress str
    inner join student s on s.id = str."studentId" 
    inner join year_term yt on yt.id = str."yearTermId" and yt."isParent" 
    where str."deletedAt" isnull 
    and (
    str."stressCh1" +
    str."stressCh2" +
    str."stressCh3" +
    str."stressCh4" +
    str."stressCh5" +
    str."stressCh6" +
    str."stressCh7" +
    str."stressCh8" +
    str."stressCh9" +
    str."stressCh10" +
    str."stressCh11" +
    str."stressCh12" +
    str."stressCh13" +
    str."stressCh14" +
    str."stressCh15" +
    str."stressCh16" +
    str."stressCh17" +
    str."stressCh18" +
    str."stressCh19" +
    str."stressCh20"
    )>62
    group by s."classroomId"
    ) as d on  d."classroomId" = cr.id
    order by cr.id`
})
export class ReportStressByRoom {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
  @ViewColumn()
  value3:number
  @ViewColumn()
  value4:number
}