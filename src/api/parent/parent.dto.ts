import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchParentDto extends SearchParameter {
    firstName?:string
    lastName?:string
    studentId?:any
}
export class ParentDto {
    title:number
    firstName:string
    lastName:string
    personalCode:string
    bloodType:number
    occupation:string
    income:number
    phoneNumber:string
    type:number
    studentId:any
} 
export class CreateParentDto extends ParentDto{
    title:number
    firstName:string
    lastName:string
    personalCode:string
    bloodType:number
    occupation:string
    income:number
    phoneNumber:string
    type:number
    studentId:any
}
export class UpdateParentDto extends ParentDto{
    title:number
    firstName:string
    lastName:string
    personalCode:string
    bloodType:number
    occupation:string
    income:number
    phoneNumber:string
    type:number
    studentId:any
}
