import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchAddressDto extends SearchParameter {
    address?:string
    provinceId?:number
    districtId?:number
    subDistrictId?:number
}
export class AddressDto {
    address:string
    provinceId:number
    districtId:number
    subDistrictId:number
} 
export class CreateAddressDto extends AddressDto{
    address:string
    provinceId:number
    districtId:number
    subDistrictId:number
}
export class UpdateAddressDto extends AddressDto{
    address:string
    provinceId:number
    districtId:number
    subDistrictId:number
}
