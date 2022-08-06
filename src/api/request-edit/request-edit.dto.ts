import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchRequestEditDto extends SearchParameter {
    studentId?:number
    requestType?:number
    requestStatus?:number
}
export class RequestEditDto {
    studentId:number
    requestType:number
    dataToEdit:string
    requestStatus:number
} 
export class CreateRequestEditDto extends RequestEditDto{
    studentId:number
    requestType:number
    dataToEdit:string
    requestStatus:number
}
export class UpdateRequestEditDto extends RequestEditDto{
    studentId:number
    requestType:number
    dataToEdit:string
    requestStatus:number
}
