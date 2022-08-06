import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchHopitalDto extends SearchParameter {
    name?:string
}
export class HopitalDto {
    name:string
    addressId:number
} 
export class CreateHopitalDto extends HopitalDto{
    name:string
    addressId:number
}
export class UpdateHopitalDto extends HopitalDto{
    name:string
    addressId:number
}
