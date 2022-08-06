import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchEstimateTempDto extends SearchParameter {
    name?:string
    estimateGroupId?:number
}
export class EstimateTempDto {
    name:string
    ratio:number
    estimateGroupId:number
} 
export class CreateEstimateTempDto extends EstimateTempDto{
    name:string
    ratio:number
    estimateGroupId:number
}
export class UpdateEstimateTempDto extends EstimateTempDto{
    name:string
    ratio:number
    estimateGroupId:number
}
