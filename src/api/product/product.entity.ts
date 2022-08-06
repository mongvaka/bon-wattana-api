import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('PRODUCT')
export class Product extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  productId?: number;
  @Column({ nullable: true})
  productCode?: string;
  @Column({ nullable: true})
  productName?: string;
  @Column({ nullable: true})
  productDescription?: string;

}
@ViewEntity({
    name:'PRODUCT_LIST',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("en.productId", "productId")
        .addSelect("en.productCode", "productCode")
        .addSelect("en.productName", "productName")
        .addSelect("en.productDescription", "productDescription")
        .from(Product, "en")
})
export class VwProductList {
    @ViewColumn()
    productId: number;
    @ViewColumn()
    productCode: string;
    @ViewColumn()
    productName: string;
    @ViewColumn()
    productDescription: string;
}

@ViewEntity({
  name:'PRODUCT_DROPDOWN',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("en.productId", "productId")
  .addSelect("en.productCode", "productCode")
  .addSelect("en.productName", "productName")
  .addSelect("en.productDescription", "productDescription")
  .from(Product, "en")
})
export class VwProductDropdown {
  @ViewColumn()
  productId: number;
  @ViewColumn()
  productCode: string;
  @ViewColumn()
  productName: string;
  @ViewColumn()
  productDescription: string;
}
@ViewEntity({
  name:'PRODUCT_ITEM',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("en.productId", "productId")
  .addSelect("en.productCode", "productCode")
  .addSelect("en.productName", "productName")
  .addSelect("en.productDescription", "productDescription")
  .from(Product, "en")
})
export class VwProductItem {
  @ViewColumn()
  productId: number;
  @ViewColumn()
  productCode: string;
  @ViewColumn()
  productName: string;
  @ViewColumn()
  productDescription: string;
}