import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchUserInfomationDto extends SearchParameter {
    userId?:number
    userType?:number
}
export class UserInfomationDto {
    userId:number
    userType:number
    userTaxNumber:string
} 
export class CreateUserInfomationDto extends UserInfomationDto{
    userId:number
    userType:number
    userTaxNumber:string
}
export class UpdateUserInfomationDto extends UserInfomationDto{
    userId:number
    userType:number
    userTaxNumber:string
}
