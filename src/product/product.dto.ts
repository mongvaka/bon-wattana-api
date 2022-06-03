import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/shared/models/search-param-model";

export class SearchProductDto extends SearchParameter {
    productCode:string
}
export class ProductDto {
    @ApiPropertyOptional()
    productCode?:string
    @ApiPropertyOptional()
    productName?:string
    @ApiPropertyOptional()
    productDescription?:string
} 
export class CreateProductDto extends ProductDto{

}
export class UpdateProductDto extends ProductDto{
    @ApiProperty()
    productId:number

}
export class DeleteProductDto extends ProductDto{
    @ApiProperty()
    productId:number
}