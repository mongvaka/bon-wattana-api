import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchStudentSiblingDto extends SearchParameter {
    sudentId?:number
    siblingId?:number
}
export class StudentSiblingDto {
    sudentId:number
    siblingId:number
} 
export class CreateStudentSiblingDto extends StudentSiblingDto{
    sudentId:number
    siblingId:number
}
export class UpdateStudentSiblingDto extends StudentSiblingDto{
    sudentId:number
    siblingId:number
}
