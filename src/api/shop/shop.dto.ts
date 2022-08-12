import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchShopDto extends SearchParameter {
    name?:string
}
export class ShopDto {
    name:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    tax:string
    shopType:number
    bussinessType:number
} 
export class CreateShopDto extends ShopDto{
    name:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    tax:string
    shopType:number
    bussinessType:number
}
export class UpdateShopDto extends ShopDto{
    name:string
    address:string
    countryId:number
    provinceId:number
    districtId:number
    subDistrictId:number
    tax:string
    shopType:number
    bussinessType:number
}
