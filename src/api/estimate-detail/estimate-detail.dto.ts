import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchEstimateDetailDto extends SearchParameter {
    studentId?:number
    estimateId?:number
}
export class EstimateDetailDto {
    studentId:number
    estimateId:number
    value:number
} 
export class CreateEstimateDetailDto extends EstimateDetailDto{
    studentId:number
    estimateId:number
    value:number
}
export class UpdateEstimateDetailDto extends EstimateDetailDto{
    studentId:number
    estimateId:number
    value:number
}
