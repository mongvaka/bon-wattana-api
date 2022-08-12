import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Product } from "src/api/product/product.entity";

@Entity('product_promotion')
export class ProductPromotion extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  productId?: number;

  @Column({nullable: true})
  promotionType?: number;

  @Column({nullable: false})
  value?: number;

  @Column({nullable: false})
  buy?: number;

  @Column({nullable: false})
  get?: number;
}
@ViewEntity({
    name:'product_promotion_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("product_promotion.id", "id")
        .addSelect("product_promotion.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_promotion.promotionType", "promotionType")
        .addSelect("product_promotion.value", "value")
        .addSelect("product_promotion.buy", "buy")
        .addSelect("product_promotion.get", "get")
        .from(ProductPromotion, "product_promotion")
        .leftJoin(Product, "product_id","product_id.Id = product_promotion.productId")
})
export class VwProductPromotionList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    promotionType: number;

    @ViewColumn()
    value: number;

    @ViewColumn()
    buy: number;

    @ViewColumn()
    get: number;
}

@ViewEntity({
  name:'product_promotion_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_promotion.id", "value")
  .addSelect("CONCAT(product_promotion.promotionType , '[' , product_promotion.productId, ']')", "label")
      .from(ProductPromotion, "product_promotion")
})
export class VwProductPromotionDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'product_promotion_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_promotion.id", "id")
        .addSelect("product_promotion.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_promotion.promotionType", "promotionType")
        .addSelect("product_promotion.value", "value")
        .addSelect("product_promotion.buy", "buy")
        .addSelect("product_promotion.get", "get")
      .from(ProductPromotion, "product_promotion")
        .leftJoin(Product, "product_id","product_id.Id = product_promotion.productId")
})
export class VwProductPromotionItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    promotionType: number;

    @ViewColumn()
    value: number;

    @ViewColumn()
    buy: number;

    @ViewColumn()
    get: number;
}
