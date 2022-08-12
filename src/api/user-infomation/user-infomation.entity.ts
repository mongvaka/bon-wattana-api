import { BasicData } from "src/core/shared/entities/basic-data";
import { User } from "src/core/users/users.entity";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('user_infomation')
export class UserInfomation extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  userId?: number;

  @Column({nullable: true})
  userType?: number;

  @Column({nullable: true})
  userTaxNumber?: string;
}
@ViewEntity({
    name:'user_infomation_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("user_infomation.id", "id")
        .addSelect("user_infomation.userId", "userId")
        .addSelect("CONCAT(user_id.firstname , '[' , user_id.lastname, ']')", "userValue")
        .addSelect("user_infomation.userType", "userType")
        .addSelect("user_infomation.userTaxNumber", "userTaxNumber")
        .from(UserInfomation, "user_infomation")
        .leftJoin(User, "user_id","user_id.Id = user_infomation.userId")
})
export class VwUserInfomationList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    userValue: string;

    @ViewColumn()
    userType: number;

    @ViewColumn()
    userTaxNumber: string;
}

@ViewEntity({
  name:'user_infomation_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("user_infomation.id", "value")
  .addSelect("CONCAT(user_infomation.userId , '[' , user_infomation.userType, ']')", "label")
      .from(UserInfomation, "user_infomation")
})
export class VwUserInfomationDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'user_infomation_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("user_infomation.id", "id")
        .addSelect("user_infomation.userId", "userId")
        .addSelect("CONCAT(user_id.firstname , '[' , user_id.lastname, ']')", "userValue")
        .addSelect("user_infomation.userType", "userType")
        .addSelect("user_infomation.userTaxNumber", "userTaxNumber")
      .from(UserInfomation, "user_infomation")
        .leftJoin(User, "user_id","user_id.Id = user_infomation.userId")
})
export class VwUserInfomationItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    userValue: string;

    @ViewColumn()
    userType: number;

    @ViewColumn()
    userTaxNumber: string;
}
