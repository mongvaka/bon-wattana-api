import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Product } from "src/api/product/product.entity";

@Entity('product_image')
export class ProductImage extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  productId?: number;

  @Column({nullable: true})
  imageName?: string;

  @Column({nullable: true})
  imageUrl?: string;

  @Column({nullable: true})
  imageType?: string;
}
@ViewEntity({
    name:'product_image_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("product_image.id", "id")
        .addSelect("product_image.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_image.imageName", "imageName")
        .addSelect("product_image.imageUrl", "imageUrl")
        .addSelect("product_image.imageType", "imageType")
        .from(ProductImage, "product_image")
        .leftJoin(Product, "product_id","product_id.Id = product_image.productId")
})
export class VwProductImageList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    imageName: string;

    @ViewColumn()
    imageUrl: string;

    @ViewColumn()
    imageType: string;
}

@ViewEntity({
  name:'product_image_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_image.id", "value")
  .addSelect("CONCAT(product_image.imageName , '[' , product_image.productId, ']')", "label")
      .from(ProductImage, "product_image")
})
export class VwProductImageDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'product_image_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("product_image.id", "id")
        .addSelect("product_image.productId", "productId")
        .addSelect("CONCAT(product_id.productCode , '[' , product_id.productName, ']')", "productValue")
        .addSelect("product_image.imageName", "imageName")
        .addSelect("product_image.imageUrl", "imageUrl")
        .addSelect("product_image.imageType", "imageType")
      .from(ProductImage, "product_image")
        .leftJoin(Product, "product_id","product_id.Id = product_image.productId")
})
export class VwProductImageItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    productId: number;

    @ViewColumn()
    productValue: string;

    @ViewColumn()
    imageName: string;

    @ViewColumn()
    imageUrl: string;

    @ViewColumn()
    imageType: string;
}
