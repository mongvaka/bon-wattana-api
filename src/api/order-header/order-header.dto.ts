import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchOrderHeaderDto extends SearchParameter {
    orderNumber?:string
    buyerId?:number
    orderStatus?:number
}
export class OrderHeaderDto {
    orderNumber:string
    sellerId:number
    buyerId:number
    orderDate:Date
    orderStatus:number
} 
export class CreateOrderHeaderDto extends OrderHeaderDto{
    orderNumber:string
    sellerId:number
    buyerId:number
    orderDate:Date
    orderStatus:number
}
export class UpdateOrderHeaderDto extends OrderHeaderDto{
    orderNumber:string
    sellerId:number
    buyerId:number
    orderDate:Date
    orderStatus:number
}
