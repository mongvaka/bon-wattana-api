import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchOrderDetailDto extends SearchParameter {
    orderHeaderId?:number
    productId?:number
    optionId?:number
}
export class OrderDetailDto {
    orderHeaderId:number
    productId:number
    originPrice:number
    latestPrice:number
    optionId:number
    remark:string
} 
export class CreateOrderDetailDto extends OrderDetailDto{
    orderHeaderId:number
    productId:number
    originPrice:number
    latestPrice:number
    optionId:number
    remark:string
}
export class UpdateOrderDetailDto extends OrderDetailDto{
    orderHeaderId:number
    productId:number
    originPrice:number
    latestPrice:number
    optionId:number
    remark:string
}
