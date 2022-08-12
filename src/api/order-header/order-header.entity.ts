import { BasicData } from "src/core/shared/entities/basic-data";
import { User } from "src/core/users/users.entity";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('order_header')
export class OrderHeader extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  orderNumber?: string;

  @Column({nullable: true})
  sellerId?: number;

  @Column({nullable: true})
  buyerId?: number;

  @Column({nullable: true})
  orderDate?: Date;

  @Column({nullable: true})
  orderStatus?: number;
}
@ViewEntity({
    name:'order_header_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("order_header.id", "id")
        .addSelect("order_header.orderNumber", "orderNumber")
        .addSelect("order_header.sellerId", "sellerId")
        .addSelect("CONCAT(seller_id.firstname , '[' , seller_id.lastname, ']')", "sellerValue")
        .addSelect("order_header.buyerId", "buyerId")
        .addSelect("CONCAT(buyer_id.firstname , '[' , buyer_id.lastname, ']')", "buyerValue")
        .addSelect("order_header.orderDate", "orderDate")
        .addSelect("order_header.orderStatus", "orderStatus")
        .from(OrderHeader, "order_header")
        .leftJoin(User, "seller_id","seller_id.Id = order_header.sellerId")
        .leftJoin(User, "buyer_id","buyer_id.Id = order_header.buyerId")
})
export class VwOrderHeaderList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    orderNumber: string;

    @ViewColumn()
    sellerId: number;

    @ViewColumn()
    sellerValue: string;

    @ViewColumn()
    buyerId: number;

    @ViewColumn()
    buyerValue: string;

    @ViewColumn()
    orderDate: Date;

    @ViewColumn()
    orderStatus: number;
}

@ViewEntity({
  name:'order_header_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("order_header.id", "value")
  .addSelect("CONCAT(order_header.orderNumber , '[' , order_header.orderStatus, ']')", "label")
      .from(OrderHeader, "order_header")
})
export class VwOrderHeaderDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'order_header_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("order_header.id", "id")
        .addSelect("order_header.orderNumber", "orderNumber")
        .addSelect("order_header.sellerId", "sellerId")
        .addSelect("CONCAT(seller_id.firstname , '[' , seller_id.lastname, ']')", "sellerValue")
        .addSelect("order_header.buyerId", "buyerId")
        .addSelect("CONCAT(buyer_id.firstname , '[' , buyer_id.lastname, ']')", "buyerValue")
        .addSelect("order_header.orderDate", "orderDate")
        .addSelect("order_header.orderStatus", "orderStatus")
      .from(OrderHeader, "order_header")
        .leftJoin(User, "seller_id","seller_id.Id = order_header.sellerId")
        .leftJoin(User, "buyer_id","buyer_id.Id = order_header.buyerId")
})
export class VwOrderHeaderItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    orderNumber: string;

    @ViewColumn()
    sellerId: number;

    @ViewColumn()
    sellerValue: string;

    @ViewColumn()
    buyerId: number;

    @ViewColumn()
    buyerValue: string;

    @ViewColumn()
    orderDate: Date;

    @ViewColumn()
    orderStatus: number;
}
