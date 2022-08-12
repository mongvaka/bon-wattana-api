import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Delivery } from "src/api/delivery/delivery.entity";

@Entity('delivery_tracking')
export class DeliveryTracking extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  deliveryId?: number;

  @Column({nullable: true})
  trackingStatus?: number;

  @Column({nullable: true})
  remark?: string;

  @Column({nullable: true})
  actionDate?: Date;
}
@ViewEntity({
    name:'delivery_tracking_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("delivery_tracking.id", "id")
        .addSelect("delivery_tracking.deliveryId", "deliveryId")
        .addSelect("CONCAT(delivery_id.deliverId , '[' , delivery_id.deliveryStatus, ']')", "deliveryValue")
        .addSelect("delivery_tracking.trackingStatus", "trackingStatus")
        .addSelect("delivery_tracking.remark", "remark")
        .addSelect("delivery_tracking.actionDate", "actionDate")
        .from(DeliveryTracking, "delivery_tracking")
        .leftJoin(Delivery, "delivery_id","delivery_id.Id = delivery_tracking.deliveryId")
})
export class VwDeliveryTrackingList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    deliveryId: number;

    @ViewColumn()
    deliveryValue: string;

    @ViewColumn()
    trackingStatus: number;

    @ViewColumn()
    remark: string;

    @ViewColumn()
    actionDate: Date;
}

@ViewEntity({
  name:'delivery_tracking_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("delivery_tracking.id", "value")
  .addSelect("CONCAT(delivery_tracking.deliveryId , '[' , delivery_tracking.trackingStatus, ']')", "label")
      .from(DeliveryTracking, "delivery_tracking")
})
export class VwDeliveryTrackingDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'delivery_tracking_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("delivery_tracking.id", "id")
        .addSelect("delivery_tracking.deliveryId", "deliveryId")
        .addSelect("CONCAT(delivery_id.deliverId , '[' , delivery_id.deliveryStatus, ']')", "deliveryValue")
        .addSelect("delivery_tracking.trackingStatus", "trackingStatus")
        .addSelect("delivery_tracking.remark", "remark")
        .addSelect("delivery_tracking.actionDate", "actionDate")
      .from(DeliveryTracking, "delivery_tracking")
        .leftJoin(Delivery, "delivery_id","delivery_id.Id = delivery_tracking.deliveryId")
})
export class VwDeliveryTrackingItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    deliveryId: number;

    @ViewColumn()
    deliveryValue: string;

    @ViewColumn()
    trackingStatus: number;

    @ViewColumn()
    remark: string;

    @ViewColumn()
    actionDate: Date;
}
