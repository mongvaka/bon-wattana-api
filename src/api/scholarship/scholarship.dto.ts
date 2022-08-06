import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchScholarshipDto extends SearchParameter {
    studentId?:number
    scholarshipName?:string
    type?:number
}
export class ScholarshipDto {
    studentId:number
    scholarshipName:string
    getFrom:string
    type:number
    recieveDate:Date
    amount:number
    detail:string
} 
export class CreateScholarshipDto extends ScholarshipDto{
    studentId:number
    scholarshipName:string
    getFrom:string
    type:number
    recieveDate:Date
    amount:number
    detail:string
}
export class UpdateScholarshipDto extends ScholarshipDto{
    studentId:number
    scholarshipName:string
    getFrom:string
    type:number
    recieveDate:Date
    amount:number
    detail:string
}
