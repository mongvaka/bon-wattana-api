import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchDegreeDto extends SearchParameter {
    degree?:string
    universityId?:number
    degreeName?:string
}
export class DegreeDto {
    teacherId:number
    degree:string
    universityId:number
    major:string
    faculty:string
    degreeName:string
} 
export class CreateDegreeDto extends DegreeDto{
    teacherId:number
    degree:string
    universityId:number
    major:string
    faculty:string
    degreeName:string
}
export class UpdateDegreeDto extends DegreeDto{
    teacherId:number
    degree:string
    universityId:number
    major:string
    faculty:string
    degreeName:string
}
