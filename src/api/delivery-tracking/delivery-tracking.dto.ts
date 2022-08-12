import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchDeliveryTrackingDto extends SearchParameter {
    deliveryId?:number
    trackingStatus?:number
}
export class DeliveryTrackingDto {
    deliveryId:number
    trackingStatus:number
    remark:string
    actionDate:Date
} 
export class CreateDeliveryTrackingDto extends DeliveryTrackingDto{
    deliveryId:number
    trackingStatus:number
    remark:string
    actionDate:Date
}
export class UpdateDeliveryTrackingDto extends DeliveryTrackingDto{
    deliveryId:number
    trackingStatus:number
    remark:string
    actionDate:Date
}
