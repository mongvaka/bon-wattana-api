import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Product } from "src/api/product/product.entity";

@Entity('product_detail')
export class ProductDetail extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  productId?: number;

  @Column({nullable: true})
  productDetailValue?: string;

  @Column({nullable: true})
  productDetailType?: string;

  @Column({nullable: false})
  remark?: string;
}
@ViewEntity({
    name:'product_detail_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("product_detail.id", "id")
        .addSelect("product_detail.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_detail.productDetailValue", "productDetailValue")
        .addSelect("product_detail.productDetailType", "productDetailType")
        .addSelect("product_detail.remark", "remark")
        .from(ProductDetail, "product_detail")
        .leftJoin(Product, "product_id","product_id.Id = product_detail.productId")
})
export class VwProductDetailList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    productDetailValue: string;

    @ViewColumn()
    productDetailType: string;

    @ViewColumn()
    remark: string;
}

@ViewEntity({
  name:'product_detail_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_detail.id", "value")
  .addSelect("CONCAT(product_detail.productDetailType , '[' , product_detail.productId, ']')", "label")
      .from(ProductDetail, "product_detail")
})
export class VwProductDetailDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'product_detail_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_detail.id", "id")
        .addSelect("product_detail.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_detail.productDetailValue", "productDetailValue")
        .addSelect("product_detail.productDetailType", "productDetailType")
        .addSelect("product_detail.remark", "remark")
      .from(ProductDetail, "product_detail")
        .leftJoin(Product, "product_id","product_id.Id = product_detail.productId")
})
export class VwProductDetailItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    productDetailValue: string;

    @ViewColumn()
    productDetailType: string;

    @ViewColumn()
    remark: string;
}
