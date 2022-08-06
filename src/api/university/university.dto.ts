import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchUniversityDto extends SearchParameter {
    universityName?:string
}
export class UniversityDto {
    universityName:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    postCode:string
} 
export class CreateUniversityDto extends UniversityDto{
    universityName:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    postCode:string
}
export class UpdateUniversityDto extends UniversityDto{
    universityName:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    postCode:string
}
