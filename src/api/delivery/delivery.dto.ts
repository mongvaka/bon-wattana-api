import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchDeliveryDto extends SearchParameter {
    deliverId?:number
    deliveryStatus?:number
}
export class DeliveryDto {
    deliverId:number
    orderHeaderId:number
    deliveryStatus:number
} 
export class CreateDeliveryDto extends DeliveryDto{
    deliverId:number
    orderHeaderId:number
    deliveryStatus:number
}
export class UpdateDeliveryDto extends DeliveryDto{
    deliverId:number
    orderHeaderId:number
    deliveryStatus:number
}
