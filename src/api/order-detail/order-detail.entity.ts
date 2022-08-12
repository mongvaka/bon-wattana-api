import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { OrderHeader } from "src/api/order-header/order-header.entity";
import { Product } from "src/api/product/product.entity";
import { ProductOption } from "src/api/product-option/product-option.entity";

@Entity('order_detail')
export class OrderDetail extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  orderHeaderId?: number;

  @Column({nullable: true})
  productId?: number;

  @Column({nullable: true})
  originPrice?: number;

  @Column({nullable: true})
  latestPrice?: number;

  @Column({nullable: true})
  optionId?: number;

  @Column({nullable: false})
  remark?: string;
}
@ViewEntity({
    name:'order_detail_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("order_detail.id", "id")
        .addSelect("order_detail.orderHeaderId", "orderHeaderId")
        .addSelect("CONCAT(order_header_id.orderNumber , '[' , order_header_id.orderStatus, ']')", "orderHeaderValue")
        .addSelect("order_detail.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("order_detail.originPrice", "originPrice")
        .addSelect("order_detail.latestPrice", "latestPrice")
        .addSelect("order_detail.optionId", "optionId")
        .addSelect("CONCAT(option_id.optionName , '[' , option_id.productId, ']')", "optionValue")
        .addSelect("order_detail.remark", "remark")
        .from(OrderDetail, "order_detail")
        .leftJoin(OrderHeader, "order_header_id","order_header_id.Id = order_detail.orderHeaderId")
        .leftJoin(Product, "product_id","product_id.Id = order_detail.productId")
        .leftJoin(ProductOption, "option_id","option_id.Id = order_detail.optionId")
})
export class VwOrderDetailList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    orderHeaderId: number;

    @ViewColumn()
    orderHeaderValue: string;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    originPrice: number;

    @ViewColumn()
    latestPrice: number;

    @ViewColumn()
    optionId: number;

    @ViewColumn()
    optionValue: string;

    @ViewColumn()
    remark: string;
}

@ViewEntity({
  name:'order_detail_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("order_detail.id", "value")
  .addSelect("CONCAT(order_detail.productId , '[' , order_detail.orderHeaderId, ']')", "label")
      .from(OrderDetail, "order_detail")
})
export class VwOrderDetailDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'order_detail_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("order_detail.id", "id")
        .addSelect("order_detail.orderHeaderId", "orderHeaderId")
        .addSelect("CONCAT(order_header_id.orderNumber , '[' , order_header_id.orderStatus, ']')", "orderHeaderValue")
        .addSelect("order_detail.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("order_detail.originPrice", "originPrice")
        .addSelect("order_detail.latestPrice", "latestPrice")
        .addSelect("order_detail.optionId", "optionId")
        .addSelect("CONCAT(option_id.optionName , '[' , option_id.productId, ']')", "optionValue")
        .addSelect("order_detail.remark", "remark")
      .from(OrderDetail, "order_detail")
        .leftJoin(OrderHeader, "order_header_id","order_header_id.Id = order_detail.orderHeaderId")
        .leftJoin(Product, "product_id","product_id.Id = order_detail.productId")
        .leftJoin(ProductOption, "option_id","option_id.Id = order_detail.optionId")
})
export class VwOrderDetailItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    orderHeaderId: number;

    @ViewColumn()
    orderHeaderValue: string;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    originPrice: number;

    @ViewColumn()
    latestPrice: number;

    @ViewColumn()
    optionId: number;

    @ViewColumn()
    optionValue: string;

    @ViewColumn()
    remark: string;
}
