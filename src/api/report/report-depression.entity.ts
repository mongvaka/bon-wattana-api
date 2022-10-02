import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_depression_sumarize',
    expression: `select a.sumva as name,
    b.sumva as value1,
    c.sumva as value2,
    d.sumva as value3
    from (
    select  count(drp.id) as sumva  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) < 7
    ) as a
    left join (
    select  count(drp.id) as sumva  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId"  and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <13
    ) as b on 1=1
    left join (
    select  count(drp.id) as sumva  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 13
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <19
    ) as c on 1=1
    left join (
    select  count(drp.id) as sumva  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    ) as d on 1=1`
})
export class ReportDepressionSumarize {
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
    name:'rp_depression_by_class',
    expression: `select 
    ct."typeName" as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3,
    d.sumva as value4
    from classroom_type ct 
    left join (
    select  count(drp.id) as sumva ,s."classroomTypeId"  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) < 7
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId" = ct.id
    left join (
    select  count(drp.id) as sumva,s."classroomTypeId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId"  and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <13
    group by s."classroomTypeId" 
    ) as b on b."classroomTypeId" = ct.id
    left join (
    select  count(drp.id) as sumva,s."classroomTypeId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 13
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <19
    group by s."classroomTypeId" 
    ) as c on c."classroomTypeId" = ct.id
    left join (
    select  count(drp.id) as sumva ,s."classroomTypeId"  from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    group by s."classroomTypeId" 
    ) as d on d."classroomTypeId" = ct.id
    order by ct."typeName"`
})
export class ReportDepressionByClass {
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
    name:'rp_depression_by_class_and_room',
    expression: `select 
    ct."typeName" as name,
    cr."name" as value1,
    a.sumva as value2,
    b.sumva as value3,
    c.sumva as value4,
    d.sumva as value5
    from classroom_type ct 
    left join classroom cr on 1=1
    left join (
    select  count(drp.id) as sumva ,s."classroomTypeId" ,s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) < 7
    group by s."classroomTypeId" ,s."classroomId" 
    ) as a on a."classroomTypeId" = ct.id and a."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva,s."classroomTypeId",s."classroomId"    from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId"  and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <13
    group by s."classroomTypeId" ,s."classroomId" 
    ) as b on b."classroomTypeId" = ct.id and b."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva,s."classroomTypeId" ,s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 13
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <19
    group by s."classroomTypeId" ,s."classroomId" 
    ) as c on c."classroomTypeId" = ct.id and c."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva ,s."classroomTypeId",s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    group by s."classroomTypeId" ,s."classroomId" 
    ) as d on d."classroomTypeId" = ct.id and d."classroomId" = cr.id 
    order by ct."typeName" ,cr.id`
})
export class ReportDepressionByClassAndRoom {
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
    name:'rp_depression_by_room',
    expression: `select 
    cr."name" as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3,
    d.sumva as value4
    from classroom cr
    left join (
    select  count(drp.id) as sumva ,s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) < 7
    group by s."classroomId" 
    ) as a on a."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva,s."classroomId"    from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId"  and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <13
    group by s."classroomId" 
    ) as b on b."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva,s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 13
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) <19
    group by s."classroomId" 
    ) as c on c."classroomId" = cr.id 
    left join (
    select  count(drp.id) as sumva,s."classroomId"   from  depression drp
    inner join student s on s.id = drp.id 
    inner join year_term yt on yt.id = drp."yearTermId" and yt."isParent" 
    where drp."deletedAt" isnull 
    and (
    drp."depressionCh3" +
    drp."depressionCh4" +
    drp."depressionCh5" +
    drp."depressionCh6" +
    drp."depressionCh7" +
    drp."depressionCh8" +
    drp."depressionCh9" +
    drp."depressionCh10" +
    drp."depressionCh11" 
    ) >= 7
    group by s."classroomId" 
    ) as d on d."classroomId" = cr.id 
    order by cr.id`
})
export class ReportDepressionByRoom {
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