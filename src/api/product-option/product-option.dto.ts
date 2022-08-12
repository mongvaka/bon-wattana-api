import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductOptionDto extends SearchParameter {
    optionName?:string
}
export class ProductOptionDto {
    productId:number
    optionName:string
    remark:string
} 
export class CreateProductOptionDto extends ProductOptionDto{
    productId:number
    optionName:string
    remark:string
}
export class UpdateProductOptionDto extends ProductOptionDto{
    productId:number
    optionName:string
    remark:string
}
