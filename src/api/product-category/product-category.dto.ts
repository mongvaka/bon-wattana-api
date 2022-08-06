import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchProductCategoryDto extends SearchParameter {
    productCategoryCode:string
}
export class ProductCategoryDto {
    @ApiPropertyOptional()
    productCategoryCode?:string
    @ApiPropertyOptional()
    productCategoryName?:string
    @ApiPropertyOptional()
    productCategoryDescription?:string
} 
export class CreateProductCategoryDto extends ProductCategoryDto{

}
export class UpdateProductCategoryDto extends ProductCategoryDto{
    @ApiProperty()
    productCategoryId:number

}
export class DeleteProductCategoryDto extends ProductCategoryDto{
    @ApiProperty()
    productCategoryId:number
}