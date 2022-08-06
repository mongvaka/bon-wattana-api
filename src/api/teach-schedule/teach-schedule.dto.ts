import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchTeachScheduleDto extends SearchParameter {
    teacherId?:number
}
export class TeachScheduleDto {
    teacherId:number
    season:number
    year:number
    couseId:number
    className:string
    startTime:string
    endTime:string
    sectionType:number
    inDay:Date
} 
export class CreateTeachScheduleDto extends TeachScheduleDto{
    teacherId:number
    season:number
    year:number
    couseId:number
    className:string
    startTime:string
    endTime:string
    sectionType:number
    inDay:Date
}
export class UpdateTeachScheduleDto extends TeachScheduleDto{
    teacherId:number
    season:number
    year:number
    couseId:number
    className:string
    startTime:string
    endTime:string
    sectionType:number
    inDay:Date
}
