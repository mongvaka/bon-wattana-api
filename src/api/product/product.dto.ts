import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductDto extends SearchParameter {
    productCode?:string
    productName?:string
}
export class ProductDto {
    productCode:string
    productName:string
    productDescription:string
    price:number
} 
export class CreateProductDto extends ProductDto{
    productCode:string
    productName:string
    productDescription:string
    price:number
}
export class UpdateProductDto extends ProductDto{
    productCode:string
    productName:string
    productDescription:string
    price:number
}
