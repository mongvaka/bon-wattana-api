import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('product')
export class Product extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  productCode?: string;

  @Column({nullable: true})
  productName?: string;

  @Column({nullable: false})
  productDescription?: string;

  @Column({nullable: true})
  price?: number;
}
@ViewEntity({
    name:'product_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("product.id", "id")
        .addSelect("product.productCode", "productCode")
        .addSelect("product.productName", "productName")
        .addSelect("product.productDescription", "productDescription")
        .addSelect("product.price", "price")
        .from(Product, "product")
})
export class VwProductList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    productCode: string;

    @ViewColumn()
    productName: string;

    @ViewColumn()
    productDescription: string;

    @ViewColumn()
    price: number;
}

@ViewEntity({
  name:'product_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product.id", "value")
  .addSelect("CONCAT(product.productCode , '[' , product.productName, ']')", "label")
      .from(Product, "product")
})
export class VwProductDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'product_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product.id", "id")
        .addSelect("product.productCode", "productCode")
        .addSelect("product.productName", "productName")
        .addSelect("product.productDescription", "productDescription")
        .addSelect("product.price", "price")
      .from(Product, "product")
})
export class VwProductItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    productCode: string;

    @ViewColumn()
    productName: string;

    @ViewColumn()
    productDescription: string;

    @ViewColumn()
    price: number;
}
