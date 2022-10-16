import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchSarCrudAssessmentDto extends SearchParameter {
@ApiPropertyOptional({ type: Number})
    teacherId?:number
@ApiPropertyOptional({ type: String})
    schoolyear?:string
}
export class SarCrudAssessmentDto {
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: String})
    result:string
@ApiPropertyOptional({ type: Number})
    assessment:number
@ApiPropertyOptional({ type: Number})
    totalStudent:number
@ApiPropertyOptional({ type: String})
    class:string
    @ApiPropertyOptional({ type: String})
    assessment1:string
    @ApiPropertyOptional({ type: String})
    assessment2:string
    @ApiPropertyOptional({ type: String})
    assessment3:string
    @ApiPropertyOptional({ type: String})
    assessment4:string
} 
export class CreateSarCrudAssessmentDto extends SarCrudAssessmentDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: String})
    result:string
@ApiPropertyOptional({ type: Number})
    assessment:number
@ApiPropertyOptional({ type: Number})
    totalStudent:number
@ApiPropertyOptional({ type: String})
    class:string
    @ApiPropertyOptional({ type: String})
    assessment1:string
    @ApiPropertyOptional({ type: String})
    assessment2:string
    @ApiPropertyOptional({ type: String})
    assessment3:string
    @ApiPropertyOptional({ type: String})
    assessment4:string
}
export class UpdateSarCrudAssessmentDto extends SarCrudAssessmentDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: String})
    result:string
@ApiPropertyOptional({ type: Number})
    assessment:number
@ApiPropertyOptional({ type: Number})
    totalStudent:number
@ApiPropertyOptional({ type: String})
    class:string
    @ApiPropertyOptional({ type: String})
    assessment1:string
    @ApiPropertyOptional({ type: String})
    assessment2:string
    @ApiPropertyOptional({ type: String})
    assessment3:string
    @ApiPropertyOptional({ type: String})
    assessment4:string
}