import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchSarStudentEstimateTeachingDto extends SearchParameter {
@ApiPropertyOptional({ type: Number})
    teacherId?:number
@ApiPropertyOptional({ type: String})
    schoolyear?:string
}
export class SarStudentEstimateTeachingDto {
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: Number})
    choice1:number
@ApiPropertyOptional({ type: Number})
    choice2:number
@ApiPropertyOptional({ type: Number})
    choice3:number
@ApiPropertyOptional({ type: Number})
    choice4:number
@ApiPropertyOptional({ type: Number})
    choice5:number
@ApiPropertyOptional({ type: Number})
    choice6:number
@ApiPropertyOptional({ type: Number})
    choice7:number
@ApiPropertyOptional({ type: Number})
    choice8:number
@ApiPropertyOptional({ type: Number})
    choice9:number
@ApiPropertyOptional({ type: Number})
    choice10:number
@ApiPropertyOptional({ type: Number})
    choice11:number
@ApiPropertyOptional({ type: Number})
    choice12:number
@ApiPropertyOptional({ type: Number})
    choice13:number
@ApiPropertyOptional({ type: Number})
    choice14:number
@ApiPropertyOptional({ type: Number})
    choice15:number
@ApiPropertyOptional({ type: Number})
    choice16:number
@ApiPropertyOptional({ type: Number})
    choice17:number
@ApiPropertyOptional({ type: Number})
    choice18:number
@ApiPropertyOptional({ type: Number})
    choice19:number
@ApiPropertyOptional({ type: Number})
    choice20:number
@ApiPropertyOptional({ type: Number})
    result:number
} 
export class CreateSarStudentEstimateTeachingDto extends SarStudentEstimateTeachingDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: Number})
    choice1:number
@ApiPropertyOptional({ type: Number})
    choice2:number
@ApiPropertyOptional({ type: Number})
    choice3:number
@ApiPropertyOptional({ type: Number})
    choice4:number
@ApiPropertyOptional({ type: Number})
    choice5:number
@ApiPropertyOptional({ type: Number})
    choice6:number
@ApiPropertyOptional({ type: Number})
    choice7:number
@ApiPropertyOptional({ type: Number})
    choice8:number
@ApiPropertyOptional({ type: Number})
    choice9:number
@ApiPropertyOptional({ type: Number})
    choice10:number
@ApiPropertyOptional({ type: Number})
    choice11:number
@ApiPropertyOptional({ type: Number})
    choice12:number
@ApiPropertyOptional({ type: Number})
    choice13:number
@ApiPropertyOptional({ type: Number})
    choice14:number
@ApiPropertyOptional({ type: Number})
    choice15:number
@ApiPropertyOptional({ type: Number})
    choice16:number
@ApiPropertyOptional({ type: Number})
    choice17:number
@ApiPropertyOptional({ type: Number})
    choice18:number
@ApiPropertyOptional({ type: Number})
    choice19:number
@ApiPropertyOptional({ type: Number})
    choice20:number
@ApiPropertyOptional({ type: Number})
    result:number
}
export class UpdateSarStudentEstimateTeachingDto extends SarStudentEstimateTeachingDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
@ApiPropertyOptional({ type: Number})
    choice1:number
@ApiPropertyOptional({ type: Number})
    choice2:number
@ApiPropertyOptional({ type: Number})
    choice3:number
@ApiPropertyOptional({ type: Number})
    choice4:number
@ApiPropertyOptional({ type: Number})
    choice5:number
@ApiPropertyOptional({ type: Number})
    choice6:number
@ApiPropertyOptional({ type: Number})
    choice7:number
@ApiPropertyOptional({ type: Number})
    choice8:number
@ApiPropertyOptional({ type: Number})
    choice9:number
@ApiPropertyOptional({ type: Number})
    choice10:number
@ApiPropertyOptional({ type: Number})
    choice11:number
@ApiPropertyOptional({ type: Number})
    choice12:number
@ApiPropertyOptional({ type: Number})
    choice13:number
@ApiPropertyOptional({ type: Number})
    choice14:number
@ApiPropertyOptional({ type: Number})
    choice15:number
@ApiPropertyOptional({ type: Number})
    choice16:number
@ApiPropertyOptional({ type: Number})
    choice17:number
@ApiPropertyOptional({ type: Number})
    choice18:number
@ApiPropertyOptional({ type: Number})
    choice19:number
@ApiPropertyOptional({ type: Number})
    choice20:number
@ApiPropertyOptional({ type: Number})
    result:number
}
