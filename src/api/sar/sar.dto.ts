import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchSarDto extends SearchParameter {
@ApiPropertyOptional({ type: Number})
    teacherId?:number
@ApiPropertyOptional({ type: String})
    schoolyear?:string
}
export class SarDto {
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string

    @ApiPropertyOptional({ type: Number})
    sarCoursesYearTermToTalSubject:number
    @ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalHour:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalSubject:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTaldays:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes2:number
@ApiPropertyOptional({ type: String})
sacompetencyassessmentresult :string
@ApiPropertyOptional({ type: String})
sarcrudassessmentresult :string
@ApiPropertyOptional({ type: String})
sarattributeassessmentresult :string






} 
export class CreateSarDto extends SarDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
    @ApiPropertyOptional({ type: Number})
    sarCoursesYearTermToTalSubject:number
    @ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalHour:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalSubject:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTaldays:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes2:number
@ApiPropertyOptional({ type: String})
sacompetencyassessmentresult :string
@ApiPropertyOptional({ type: String})
sarcrudassessmentresult :string
@ApiPropertyOptional({ type: String})
sarattributeassessmentresult :string
}
export class UpdateSarDto extends SarDto{
@ApiPropertyOptional({ type: Number})
    teacherId:number
@ApiPropertyOptional({ type: String})
    refId:string
@ApiPropertyOptional({ type: String})
    schoolyear:string
    @ApiPropertyOptional({ type: Number})
    sarCoursesYearTermToTalSubject:number
    @ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTermToTalHour:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalSubject:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalActivities:number
@ApiPropertyOptional({ type: Number})
sarCoursesYearTerm2ToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTaldays:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalHour:number
@ApiPropertyOptional({ type: Number})
sarselfdevelopmentToTalTimes2:number
@ApiPropertyOptional({ type: String})
sacompetencyassessmentresult :string
@ApiPropertyOptional({ type: String})
sarcrudassessmentresult :string
@ApiPropertyOptional({ type: String})
sarattributeassessmentresult :string
}
