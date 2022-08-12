import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductDetailDto extends SearchParameter {
    productId?:number
    productDetailType?:string
}
export class ProductDetailDto {
    productId:number
    productDetailValue:string
    productDetailType:string
    remark:string
} 
export class CreateProductDetailDto extends ProductDetailDto{
    productId:number
    productDetailValue:string
    productDetailType:string
    remark:string
}
export class UpdateProductDetailDto extends ProductDetailDto{
    productId:number
    productDetailValue:string
    productDetailType:string
    remark:string
}
