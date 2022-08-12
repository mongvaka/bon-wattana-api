import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductImageDto extends SearchParameter {
    productId?:number
}
export class ProductImageDto {
    productId:number
    imageName:string
    imageUrl:string
    imageType:string
} 
export class CreateProductImageDto extends ProductImageDto{
    productId:number
    imageName:string
    imageUrl:string
    imageType:string
}
export class UpdateProductImageDto extends ProductImageDto{
    productId:number
    imageName:string
    imageUrl:string
    imageType:string
}
