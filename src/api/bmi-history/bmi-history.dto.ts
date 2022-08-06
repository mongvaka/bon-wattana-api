import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchBmiHistoryDto extends SearchParameter {
    weight?:number
    height?:number
    studentId?:number
}
export class BmiHistoryDto {
    weight:number
    height:number
    studentId:number
} 
export class CreateBmiHistoryDto extends BmiHistoryDto{
}
export class UpdateBmiHistoryDto extends BmiHistoryDto{
}
