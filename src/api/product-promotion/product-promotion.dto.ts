import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductPromotionDto extends SearchParameter {
    productId?:number
    promotionType?:number
    value?:number
    buy?:number
    get?:number
}
export class ProductPromotionDto {
    productId:number
    promotionType:number
    value:number
    buy:number
    get:number
} 
export class CreateProductPromotionDto extends ProductPromotionDto{
    productId:number
    promotionType:number
    value:number
    buy:number
    get:number
}
export class UpdateProductPromotionDto extends ProductPromotionDto{
    productId:number
    promotionType:number
    value:number
    buy:number
    get:number
}
