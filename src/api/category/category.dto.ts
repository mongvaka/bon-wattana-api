import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchCategoryDto extends SearchParameter {
    name?:string
    categoryId?:number
}
export class CategoryDto {
    name:string
    categoryId:number
    description:string
} 
export class CreateCategoryDto extends CategoryDto{
    name:string
    categoryId:number
    description:string
}
export class UpdateCategoryDto extends CategoryDto{
    name:string
    categoryId:number
    description:string
}
