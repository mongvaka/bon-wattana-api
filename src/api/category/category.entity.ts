import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('category')
export class Category extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  categoryId?: number;

  @Column({nullable: false})
  description?: string;
}
@ViewEntity({
    name:'category_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("category.id", "id")
        .addSelect("category.name", "name")
        .addSelect("category.categoryId", "categoryId")
        .addSelect("CONCAT(category_id.name , '[' , category_id.description, ']')", "categoryValue")
        .addSelect("category.description", "description")
        .from(Category, "category")
        .leftJoin(Category, "category_id","category_id.Id = category.categoryId")
})
export class VwCategoryList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    categoryId: number;

    @ViewColumn()
    categoryValue: string;

    @ViewColumn()
    description: string;
}

@ViewEntity({
  name:'category_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("category.id", "value")
  .addSelect("CONCAT(category.name , '[' , category.description, ']')", "label")
      .from(Category, "category")
})
export class VwCategoryDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'category_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("category.id", "id")
        .addSelect("category.name", "name")
        .addSelect("category.categoryId", "categoryId")
        .addSelect("CONCAT(category_id.name , '[' , category_id.description, ']')", "categoryValue")
        .addSelect("category.description", "description")
      .from(Category, "category")
        .leftJoin(Category, "category_id","category_id.Id = category.categoryId")
})
export class VwCategoryItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    categoryId: number;

    @ViewColumn()
    categoryValue: string;

    @ViewColumn()
    description: string;
}
