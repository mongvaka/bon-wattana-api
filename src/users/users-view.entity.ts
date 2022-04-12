import { SupplieGroup } from "src/supplie-group/supplie-group.entity";
import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { View } from "typeorm/schema-builder/view/View";
import { Users } from "./users.entity";

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("users.id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.lastName", "lastName")
        .where("users.active = 'true'")
        .andWhere("users.deleted = 'false'")
        .from(Users, "users")
})
export class VwUsersDropdown {

    @ViewColumn()
    id: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;


}
@ViewEntity({
    name:'VW_USERS_CATEGORY_MANAGER',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("users.id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.lastName", "lastName")
        .where("users.active = 'true'")
        .andWhere("users.deleted = 'false'")
        .andWhere("(users.beautyCosmeticCategoryManager = 'true' or users.householdCategoryManager = 'true' or users.foodBeverageCategoryManager = 'true')")
        .from(Users, "users")
})
export class VwUsersCategoryManger {

    @ViewColumn()
    id: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;
}
@ViewEntity({
    name:'VW_USERS_SENIOR_MANAGER',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("users.id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.lastName", "lastName")
        .where("users.active = 'true'")
        .andWhere("users.deleted = 'false'")
        .andWhere("(users.beautyCosmeticSeniorManager = 'true' or users.householdSeniorManager = 'true' or users.foodBeverageSeniorManager = 'true' or users.seniorLegalManager = 'true' or users.seniorPropertyManager = 'true')")
        .from(Users, "users")
})
export class VwUsersSeniorManger {

    @ViewColumn()
    id: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;


}

@ViewEntity({
    name:'VW_HEAD_DEPARTMENT_MANAGER',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("users.id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.lastName", "lastName")
        .where("users.active = 'true'")
        .andWhere("users.deleted = 'false'")
        .andWhere("(users.beautyCosmeticHeadDepartment = 'true' or users.householdHeadDepartment = 'true' or users.foodBeverageHeadDepartment = 'true')")
        .from(Users, "users")
})
export class VwUsersHeadDepartmentManger {

    @ViewColumn()
    id: number;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;

}