import { BasicData } from "src/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('PRODUCT_CATEGORY')
export class ProductCategory extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  productCategoryId?: number;
  @Column({ nullable: true})
  productCategoryCode?: string;
  @Column({ nullable: true})
  productCategoryName?: string;
  @Column({ nullable: true})
  productCategoryDescription?: string;

}
@ViewEntity({
    name:'PRODUCT_CATEGORY_LIST',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("en.productCategoryId", "productCategoryId")
        .addSelect("en.productCategoryCode", "productCategoryCode")
        .addSelect("en.productCategoryName", "productCategoryName")
        .addSelect("en.productCategoryDescription", "productCategoryDescription")
        .from(ProductCategory, "en")
})
export class VwProductCategoryList {
    @ViewColumn()
    productCategoryId: number;
    @ViewColumn()
    productCategoryCode: string;
    @ViewColumn()
    productCategoryName: string;
    @ViewColumn()
    productCategoryDescription: string;
}

@ViewEntity({
  name:'PRODUCT_CATEGORY_DROPDOWN',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("en.productCategoryId", "productCategoryId")
  .addSelect("en.productCategoryCode", "productCategoryCode")
  .addSelect("en.productCategoryName", "productCategoryName")
  .addSelect("en.productCategoryDescription", "productCategoryDescription")
  .from(ProductCategory, "en")
})
export class VwProductCategoryDropdown {
  @ViewColumn()
  productCategoryId: number;
  @ViewColumn()
  productCategoryCode: string;
  @ViewColumn()
  productCategoryName: string;
  @ViewColumn()
  productCategoryDescription: string;
}
@ViewEntity({
  name:'PRODUCT_CATEGORY_ITEM',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("en.productCategoryId", "productCategoryId")
  .addSelect("en.productCategoryCode", "productCategoryCode")
  .addSelect("en.productCategoryName", "productCategoryName")
  .addSelect("en.productCategoryDescription", "productCategoryDescription")
  .from(ProductCategory, "en")
})
export class VwProductCategoryItem {
  @ViewColumn()
  productCategoryId: number;
  @ViewColumn()
  productCategoryCode: string;
  @ViewColumn()
  productCategoryName: string;
  @ViewColumn()
  productCategoryDescription: string;
}