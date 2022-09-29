import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchStudentSupportDto extends SearchParameter {
@ApiPropertyOptional({ type: Date})
    startDate?:Date
@ApiPropertyOptional({ type: Date})
    endDate?:Date
}
export class StudentSupportDto {
@ApiPropertyOptional({ type: Date})
    startDate:Date
@ApiPropertyOptional({ type: Date})
    endDate:Date
@ApiPropertyOptional({ type: String})
    activityName:string
@ApiPropertyOptional({ type: String})
    performance:string
@ApiPropertyOptional({ type: String})
    department:string
@ApiPropertyOptional({ type: String})
    result:string
@ApiPropertyOptional({ type: Number})
    teacherId:number
} 
export class CreateStudentSupportDto extends StudentSupportDto{

}
export class UpdateStudentSupportDto extends StudentSupportDto{

}
