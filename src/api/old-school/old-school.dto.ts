import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchOldSchoolDto extends SearchParameter {
    name?:string
}
export class OldSchoolDto {
    name:string
    addressId:number
} 
export class CreateOldSchoolDto extends OldSchoolDto{
    name:string
    addressId:number
}
export class UpdateOldSchoolDto extends OldSchoolDto{
    name:string
    addressId:number
}
