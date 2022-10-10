import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchYearTermDto extends SearchParameter {
@ApiPropertyOptional({ type: String})
    year?:string
@ApiPropertyOptional({ type: String})
    term?:string
}
export class YearTermDto {
@ApiPropertyOptional({ type: String})
    year:string
@ApiPropertyOptional({ type: String})
    term:string
@ApiPropertyOptional({ type: Boolean})
    isParent:boolean
} 
export class CreateYearTermDto extends YearTermDto{
@ApiPropertyOptional({ type: String})
    year:string
@ApiPropertyOptional({ type: String})
    term:string
@ApiPropertyOptional({ type: Boolean})
    isParent:boolean
}
export class UpdateYearTermDto extends YearTermDto{
@ApiPropertyOptional({ type: String})
    year:string
@ApiPropertyOptional({ type: String})
    term:string
@ApiPropertyOptional({ type: Boolean})
    isParent:boolean
}
export class ReportDto{
    @ApiPropertyOptional({ type: Number})
    yearTermId:number
    @ApiPropertyOptional({ type: Number})
    classroomId:number
    @ApiPropertyOptional({ type: Number})
    classroomTypeId:number
}