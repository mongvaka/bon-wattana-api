import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({
    name:'rp_eq_sumarize',
    expression: `select * from (
        select 
        count(eq.id) as name
        from emotional_quotient eq 
        inner join student s on s.id = eq."studentId" 
        inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
        where  eq."deletedAt" isnull 
        and (
        eq ."eqCh1" +
        eq ."eqCh2" +
        eq ."eqCh3" +
        eq ."eqCh4" +
        eq ."eqCh5" +
        eq ."eqCh6" +
        eq ."eqCh7" +
        eq ."eqCh8" +
        eq ."eqCh9" +
        eq ."eqCh10" +
        eq ."eqCh11" +
        eq ."eqCh12" +
        eq ."eqCh13" +
        eq ."eqCh14" +
        eq ."eqCh15" +
        eq ."eqCh16" +
        eq ."eqCh17" +
        eq ."eqCh18" +
        eq ."eqCh19" +
        eq ."eqCh20" +
        eq ."eqCh21" +
        eq ."eqCh22" +
        eq ."eqCh23" +
        eq ."eqCh24" +
        eq ."eqCh25" +
        eq ."eqCh26" +
        eq ."eqCh27" +
        eq ."eqCh28" +
        eq ."eqCh29" +
        eq ."eqCh30" +
        eq ."eqCh31" +
        eq ."eqCh32" +
        eq ."eqCh33" +
        eq ."eqCh34" +
        eq ."eqCh35" +
        eq ."eqCh36" +
        eq ."eqCh37" +
        eq ."eqCh38" +
        eq ."eqCh39" +
        eq ."eqCh40" +
        eq ."eqCh41" +
        eq ."eqCh42" +
        eq ."eqCh43" +
        eq ."eqCh44" +
        eq ."eqCh45" +
        eq ."eqCh46" +
        eq ."eqCh47" +
        eq ."eqCh48" +
        eq ."eqCh49" +
        eq ."eqCh50" +
        eq ."eqCh51" +
        eq ."eqCh52" 
        ) < 140
        ) as a
        left join (
        select 
        count(eq.id) as value1
        from emotional_quotient eq 
        inner join student s on s.id = eq."studentId" 
        inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
        where  eq."deletedAt" isnull 
        and (
        eq ."eqCh1" +
        eq ."eqCh2" +
        eq ."eqCh3" +
        eq ."eqCh4" +
        eq ."eqCh5" +
        eq ."eqCh6" +
        eq ."eqCh7" +
        eq ."eqCh8" +
        eq ."eqCh9" +
        eq ."eqCh10" +
        eq ."eqCh11" +
        eq ."eqCh12" +
        eq ."eqCh13" +
        eq ."eqCh14" +
        eq ."eqCh15" +
        eq ."eqCh16" +
        eq ."eqCh17" +
        eq ."eqCh18" +
        eq ."eqCh19" +
        eq ."eqCh20" +
        eq ."eqCh21" +
        eq ."eqCh22" +
        eq ."eqCh23" +
        eq ."eqCh24" +
        eq ."eqCh25" +
        eq ."eqCh26" +
        eq ."eqCh27" +
        eq ."eqCh28" +
        eq ."eqCh29" +
        eq ."eqCh30" +
        eq ."eqCh31" +
        eq ."eqCh32" +
        eq ."eqCh33" +
        eq ."eqCh34" +
        eq ."eqCh35" +
        eq ."eqCh36" +
        eq ."eqCh37" +
        eq ."eqCh38" +
        eq ."eqCh39" +
        eq ."eqCh40" +
        eq ."eqCh41" +
        eq ."eqCh42" +
        eq ."eqCh43" +
        eq ."eqCh44" +
        eq ."eqCh45" +
        eq ."eqCh46" +
        eq ."eqCh47" +
        eq ."eqCh48" +
        eq ."eqCh49" +
        eq ."eqCh50" +
        eq ."eqCh51" +
        eq ."eqCh52" 
        ) >= 140
        and 
        (
        eq ."eqCh1" +
        eq ."eqCh2" +
        eq ."eqCh3" +
        eq ."eqCh4" +
        eq ."eqCh5" +
        eq ."eqCh6" +
        eq ."eqCh7" +
        eq ."eqCh8" +
        eq ."eqCh9" +
        eq ."eqCh10" +
        eq ."eqCh11" +
        eq ."eqCh12" +
        eq ."eqCh13" +
        eq ."eqCh14" +
        eq ."eqCh15" +
        eq ."eqCh16" +
        eq ."eqCh17" +
        eq ."eqCh18" +
        eq ."eqCh19" +
        eq ."eqCh20" +
        eq ."eqCh21" +
        eq ."eqCh22" +
        eq ."eqCh23" +
        eq ."eqCh24" +
        eq ."eqCh25" +
        eq ."eqCh26" +
        eq ."eqCh27" +
        eq ."eqCh28" +
        eq ."eqCh29" +
        eq ."eqCh30" +
        eq ."eqCh31" +
        eq ."eqCh32" +
        eq ."eqCh33" +
        eq ."eqCh34" +
        eq ."eqCh35" +
        eq ."eqCh36" +
        eq ."eqCh37" +
        eq ."eqCh38" +
        eq ."eqCh39" +
        eq ."eqCh40" +
        eq ."eqCh41" +
        eq ."eqCh42" +
        eq ."eqCh43" +
        eq ."eqCh44" +
        eq ."eqCh45" +
        eq ."eqCh46" +
        eq ."eqCh47" +
        eq ."eqCh48" +
        eq ."eqCh49" +
        eq ."eqCh50" +
        eq ."eqCh51" +
        eq ."eqCh52" 
        ) < 170
        ) as b on 1=1
        left join (
        select 
        count(eq.id) as value2
        from emotional_quotient eq 
        inner join student s on s.id = eq."studentId" 
        inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
        where  eq."deletedAt" isnull 
        and (
        eq ."eqCh1" +
        eq ."eqCh2" +
        eq ."eqCh3" +
        eq ."eqCh4" +
        eq ."eqCh5" +
        eq ."eqCh6" +
        eq ."eqCh7" +
        eq ."eqCh8" +
        eq ."eqCh9" +
        eq ."eqCh10" +
        eq ."eqCh11" +
        eq ."eqCh12" +
        eq ."eqCh13" +
        eq ."eqCh14" +
        eq ."eqCh15" +
        eq ."eqCh16" +
        eq ."eqCh17" +
        eq ."eqCh18" +
        eq ."eqCh19" +
        eq ."eqCh20" +
        eq ."eqCh21" +
        eq ."eqCh22" +
        eq ."eqCh23" +
        eq ."eqCh24" +
        eq ."eqCh25" +
        eq ."eqCh26" +
        eq ."eqCh27" +
        eq ."eqCh28" +
        eq ."eqCh29" +
        eq ."eqCh30" +
        eq ."eqCh31" +
        eq ."eqCh32" +
        eq ."eqCh33" +
        eq ."eqCh34" +
        eq ."eqCh35" +
        eq ."eqCh36" +
        eq ."eqCh37" +
        eq ."eqCh38" +
        eq ."eqCh39" +
        eq ."eqCh40" +
        eq ."eqCh41" +
        eq ."eqCh42" +
        eq ."eqCh43" +
        eq ."eqCh44" +
        eq ."eqCh45" +
        eq ."eqCh46" +
        eq ."eqCh47" +
        eq ."eqCh48" +
        eq ."eqCh49" +
        eq ."eqCh50" +
        eq ."eqCh51" +
        eq ."eqCh52" 
        ) > 170
        ) as c on 1=1`
})
export class ReportEqSumarize {
  @ViewColumn()
  name:string
  @ViewColumn()
  value1:number
  @ViewColumn()
  value2:number
}
@ViewEntity({
    name:'rp_eq_by_room',
    expression: `
    select  cr.name as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3
    from classroom cr 
    left join (
    select  count(eq.id) as sumva ,s."classroomId"
    from
    emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull  
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 140
    group by s."classroomId" 
    ) as a on a."classroomId" = cr.id
    left join (
    select 
    count(eq.id) as sumva,s."classroomId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) >= 140
    and 
    (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 170
    group by s."classroomId" 
    ) as b on b."classroomId" = cr.id
    left join (
    select 
    count(eq.id) as sumva ,s."classroomId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) > 170
    group by s."classroomId"
    ) as c on c."classroomId" = cr.id
    where cr."deletedAt" isnull 
    order by cr.id`
})
export class ReportEqByRoom {
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
    name:'rp_eq_by_class',
    expression: `
    select  cr."typeName"  as name,
    a.sumva as value1,
    b.sumva as value2,
    c.sumva as value3
    from classroom_type cr 
    left join (
    select  count(eq.id) as sumva ,s."classroomTypeId"
    from
    emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull  
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 140
    group by s."classroomTypeId" 
    ) as a on a."classroomTypeId" = cr.id
    left join (
    select 
    count(eq.id) as sumva,s."classroomTypeId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) >= 140
    and 
    (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 170
    group by s."classroomTypeId" 
    ) as b on b."classroomTypeId" = cr.id
    left join (
    select 
    count(eq.id) as sumva ,s."classroomTypeId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) > 170
    group by s."classroomTypeId"
    ) as c on c."classroomTypeId" = cr.id
    where cr."deletedAt" isnull 
    order by cr."typeName"`
})
export class ReportEqByClass {
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
    name:'rp_eq_by_class_and_room',
    expression: `select  cr."typeName"  as name,
    c1.name as value1,
    a.sumva as value2,
    b.sumva as value3,
    c.sumva as value4
    from classroom_type cr 
    left join classroom c1 on 1=1
    left join (
    select  count(eq.id) as sumva ,s."classroomTypeId",s."classroomId"
    from
    emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull  
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 140
    group by s."classroomTypeId" ,s."classroomId"
    ) as a on a."classroomTypeId" = cr.id and a."classroomId" = c1.id
    left join (
    select 
    count(eq.id) as sumva,s."classroomTypeId",s."classroomId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) >= 140
    and 
    (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) < 170
    group by s."classroomTypeId" ,s."classroomId"
    ) as b on b."classroomTypeId" = cr.id and b."classroomId" = c1.id
    left join (
    select 
    count(eq.id) as sumva ,s."classroomTypeId" ,s."classroomId"
    from emotional_quotient eq 
    inner join student s on s.id = eq."studentId" 
    inner join year_term yt on yt.id = eq."yearTermId" and yt."isParent" 
    where  eq."deletedAt" isnull 
    and (
    eq ."eqCh1" +
    eq ."eqCh2" +
    eq ."eqCh3" +
    eq ."eqCh4" +
    eq ."eqCh5" +
    eq ."eqCh6" +
    eq ."eqCh7" +
    eq ."eqCh8" +
    eq ."eqCh9" +
    eq ."eqCh10" +
    eq ."eqCh11" +
    eq ."eqCh12" +
    eq ."eqCh13" +
    eq ."eqCh14" +
    eq ."eqCh15" +
    eq ."eqCh16" +
    eq ."eqCh17" +
    eq ."eqCh18" +
    eq ."eqCh19" +
    eq ."eqCh20" +
    eq ."eqCh21" +
    eq ."eqCh22" +
    eq ."eqCh23" +
    eq ."eqCh24" +
    eq ."eqCh25" +
    eq ."eqCh26" +
    eq ."eqCh27" +
    eq ."eqCh28" +
    eq ."eqCh29" +
    eq ."eqCh30" +
    eq ."eqCh31" +
    eq ."eqCh32" +
    eq ."eqCh33" +
    eq ."eqCh34" +
    eq ."eqCh35" +
    eq ."eqCh36" +
    eq ."eqCh37" +
    eq ."eqCh38" +
    eq ."eqCh39" +
    eq ."eqCh40" +
    eq ."eqCh41" +
    eq ."eqCh42" +
    eq ."eqCh43" +
    eq ."eqCh44" +
    eq ."eqCh45" +
    eq ."eqCh46" +
    eq ."eqCh47" +
    eq ."eqCh48" +
    eq ."eqCh49" +
    eq ."eqCh50" +
    eq ."eqCh51" +
    eq ."eqCh52" 
    ) > 170
    group by s."classroomTypeId",s."classroomId"
    ) as c on c."classroomTypeId" = cr.id  and c."classroomId" = c1.id
    where cr."deletedAt" isnull 
    order by cr."typeName" , c1.id`
})
export class ReportEqByClassAndRoom {
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