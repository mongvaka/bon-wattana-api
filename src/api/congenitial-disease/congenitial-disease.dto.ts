import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchCongenitialDiseaseDto extends SearchParameter {
    name?:string
}
export class CongenitialDiseaseDto {
    name:string
    studentId:number
} 
export class CreateCongenitialDiseaseDto extends CongenitialDiseaseDto{
    name:string
    studentId:number
}
export class UpdateCongenitialDiseaseDto extends CongenitialDiseaseDto{
    name:string
    studentId:number
}
