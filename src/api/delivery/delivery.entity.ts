import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { OrderHeader } from "src/api/order-header/order-header.entity";
import { User } from "src/core/users/users.entity";

@Entity('delivery')
export class Delivery extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  deliverId?: number;

  @Column({nullable: true})
  orderHeaderId?: number;

  @Column({nullable: true})
  deliveryStatus?: number;
}
@ViewEntity({
    name:'delivery_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("delivery.id", "id")
        .addSelect("delivery.deliverId", "deliverId")
        .addSelect("CONCAT(deliver_id.firstname , '[' , deliver_id.lastname, ']')", "deliverValue")
        .addSelect("delivery.orderHeaderId", "orderHeaderId")
        .addSelect("CONCAT(order_header_id.orderNumber , '[' , order_header_id.orderStatus, ']')", "orderHeaderValue")
        .addSelect("delivery.deliveryStatus", "deliveryStatus")
        .from(Delivery, "delivery")
        .leftJoin(User, "deliver_id","deliver_id.Id = delivery.deliverId")
        .leftJoin(OrderHeader, "order_header_id","order_header_id.Id = delivery.orderHeaderId")
})
export class VwDeliveryList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    deliverId: number;

    @ViewColumn()
    deliverValue: string;

    @ViewColumn()
    orderHeaderId: number;

    @ViewColumn()
    orderHeaderValue: string;

    @ViewColumn()
    deliveryStatus: number;
}

@ViewEntity({
  name:'delivery_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("delivery.id", "value")
  .addSelect("CONCAT(delivery.deliverId , '[' , delivery.deliveryStatus, ']')", "label")
      .from(Delivery, "delivery")
})
export class VwDeliveryDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'delivery_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("delivery.id", "id")
        .addSelect("delivery.deliverId", "deliverId")
        .addSelect("CONCAT(deliver_id.firstname , '[' , deliver_id.lastname, ']')", "deliverValue")
        .addSelect("delivery.orderHeaderId", "orderHeaderId")
        .addSelect("CONCAT(order_header_id.orderNumber , '[' , order_header_id.orderStatus, ']')", "orderHeaderValue")
        .addSelect("delivery.deliveryStatus", "deliveryStatus")
      .from(Delivery, "delivery")
        .leftJoin(User, "deliver_id","deliver_id.Id = delivery.deliverId")
        .leftJoin(OrderHeader, "order_header_id","order_header_id.Id = delivery.orderHeaderId")
})
export class VwDeliveryItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    deliverId: number;

    @ViewColumn()
    deliverValue: string;

    @ViewColumn()
    orderHeaderId: number;

    @ViewColumn()
    orderHeaderValue: string;

    @ViewColumn()
    deliveryStatus: number;
}
