import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchEstimateGroupDto extends SearchParameter {
    groupName?:string
}
export class EstimateGroupDto {
    groupName:string
    estimateType:number
    calssLevel:number
} 
export class CreateEstimateGroupDto extends EstimateGroupDto{
    groupName:string
    estimateType:number
    calssLevel:number
}
export class UpdateEstimateGroupDto extends EstimateGroupDto{
    groupName:string
    estimateType:number
    calssLevel:number
}
