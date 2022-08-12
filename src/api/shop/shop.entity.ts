import { BasicData } from "src/core/shared/entities/basic-data";
import { Column, Connection, Entity, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Country } from "src/api/country/country.entity";
import { Province } from "src/api/province/province.entity";
import { District } from "src/api/district/district.entity";
import { SubDistrict } from "src/api/sub-district/sub-district.entity";

@Entity('shop')
export class Shop extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id?: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  address?: string;

  @Column({nullable: true})
  countryId?: number;

  @Column({nullable: true})
  provinceId?: number;

  @Column({nullable: true})
  districtId?: number;

  @Column({nullable: true})
  subDistrictId?: number;

  @Column({nullable: false})
  tax?: string;

  @Column({nullable: true})
  shopType?: number;

  @Column({nullable: true})
  bussinessType?: number;
}
@ViewEntity({
    name:'shop_list',
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("shop.id", "id")
        .addSelect("shop.name", "name")
        .addSelect("shop.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("shop.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("shop.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.code , '[' , sub_district_id.name, ']')", "subDistrictValue")
        .addSelect("shop.shopType", "shopType")
        .addSelect("shop.bussinessType", "bussinessType")
        .from(Shop, "shop")
        .leftJoin(Province, "province_id","province_id.Id = shop.provinceId")
        .leftJoin(District, "district_id","district_id.Id = shop.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = shop.subDistrictId")
})
export class VwShopList {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;

    @ViewColumn()
    districtId: number;

    @ViewColumn()
    districtValue: string;

    @ViewColumn()
    subDistrictId: number;

    @ViewColumn()
    subDistrictValue: string;

    @ViewColumn()
    shopType: number;

    @ViewColumn()
    bussinessType: number;
}

@ViewEntity({
  name:'shop_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("shop.id", "value")
  .addSelect("CONCAT(shop.name , '[' , shop.shopType, ']')", "label")
      .from(Shop, "shop")
})
export class VwShopDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}
@ViewEntity({
  name:'shop_item',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("shop.id", "id")
        .addSelect("shop.name", "name")
        .addSelect("shop.address", "address")
        .addSelect("shop.countryId", "countryId")
        .addSelect("CONCAT(country_id.code , '[' , country_id.name, ']')", "countryValue")
        .addSelect("shop.provinceId", "provinceId")
        .addSelect("CONCAT(province_id.code , '[' , province_id.name, ']')", "provinceValue")
        .addSelect("shop.districtId", "districtId")
        .addSelect("CONCAT(district_id.code , '[' , district_id.name, ']')", "districtValue")
        .addSelect("shop.subDistrictId", "subDistrictId")
        .addSelect("CONCAT(sub_district_id.code , '[' , sub_district_id.name, ']')", "subDistrictValue")
        .addSelect("shop.tax", "tax")
        .addSelect("shop.shopType", "shopType")
        .addSelect("shop.bussinessType", "bussinessType")
      .from(Shop, "shop")
        .leftJoin(Country, "country_id","country_id.Id = shop.countryId")
        .leftJoin(Province, "province_id","province_id.Id = shop.provinceId")
        .leftJoin(District, "district_id","district_id.Id = shop.districtId")
        .leftJoin(SubDistrict, "sub_district_id","sub_district_id.Id = shop.subDistrictId")
})
export class VwShopItem {

  @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    countryId: number;

    @ViewColumn()
    countryValue: string;

    @ViewColumn()
    provinceId: number;

    @ViewColumn()
    provinceValue: string;

    @ViewColumn()
    districtId: number;

    @ViewColumn()
    districtValue: string;

    @ViewColumn()
    subDistrictId: number;

    @ViewColumn()
    subDistrictValue: string;

    @ViewColumn()
    tax: string;

    @ViewColumn()
    shopType: number;

    @ViewColumn()
    bussinessType: number;
}
