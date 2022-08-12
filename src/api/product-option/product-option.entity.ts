import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Product } from "src/api/product/product.entity";

@Entity('product_option')
export class ProductOption extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  productId?: number;

  @Column({nullable: true})
  optionName?: string;

  @Column({nullable: false})
  remark?: string;
}
@ViewEntity({
    name:'product_option_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("product_option.id", "id")
        .addSelect("product_option.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_option.optionName", "optionName")
        .addSelect("product_option.remark", "remark")
        .from(ProductOption, "product_option")
        .leftJoin(Product, "product_id","product_id.Id = product_option.productId")
})
export class VwProductOptionList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    optionName: string;

    @ViewColumn()
    remark: string;
}

@ViewEntity({
  name:'product_option_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_option.id", "value")
  .addSelect("CONCAT(product_option.optionName , '[' , product_option.productId, ']')", "label")
      .from(ProductOption, "product_option")
})
export class VwProductOptionDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'product_option_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_option.id", "id")
        .addSelect("product_option.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_option.optionName", "optionName")
        .addSelect("product_option.remark", "remark")
      .from(ProductOption, "product_option")
        .leftJoin(Product, "product_id","product_id.Id = product_option.productId")
})
export class VwProductOptionItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    optionName: string;

    @ViewColumn()
    remark: string;
}
