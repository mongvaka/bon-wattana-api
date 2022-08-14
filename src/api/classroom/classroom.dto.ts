import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchClassroomDto extends SearchParameter {
    classroomTypeId?:number
}
export class ClassroomDto {
    classroomTypeId:number
    mentorFirst:string
    mentoeSecond:string
} 
export class CreateClassroomDto extends ClassroomDto{
    classroomTypeId:number
    mentorFirst:string
    mentoeSecond:string
}
export class UpdateClassroomDto extends ClassroomDto{
    classroomTypeId:number
    mentorFirst:string
    mentoeSecond:string
}
