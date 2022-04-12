import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BasicData} from "../shared/entities/basic-data";
import {TypeCode} from "./type-code.entity";
import {DepartmentCode} from "./department-code.entity";

@Entity('USERS')
export class Users extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint', name: 'ID'})
  id: number;

  @Column({name: 'USERNAME', nullable: false, length: 65})
  username: string;

  @Column({name: 'TOKEN', nullable: true})
  token: string;

  @Column({name: 'FIRST_NAME', nullable: true, length: 65})
  firstName: string;

  @Column({name: 'LAST_NAME', nullable: true, length: 65})
  lastName: string;

  @ManyToOne(() => TypeCode)
  @JoinColumn({name: "TYPE_CODE_ID"})
  typeCode: TypeCode;

  @ManyToOne(() => DepartmentCode)
  @JoinColumn({name: "DEPARTMENT_CODE"})
  departmentCode: DepartmentCode;

  @Column({name: 'EMAIL', nullable: true, length: 65})
  email: string;

  @Column({name: 'SUPPLIER_FUNDING', default: false})
  supplierFunding: boolean;

  @Column({name: 'PROPERTY_CONTRACT', default: false})
  propertyContract: boolean;

  @Column({name: 'BEAUTY_COSMETICS', default: false})
  beautyCosmetics: boolean;

  @Column({name: 'HOUSEHOLD', default: false})
  household: boolean;

  @Column({name: 'FOOD_BEVERAGE', default: false})
  foodBeverage: boolean;

  @Column({name: 'HEALTH_CARE', default: false})
  healthCare: boolean;

  @Column({name: 'LIFESTYLE', default: false})
  lifestyle: boolean;

  @Column({name: 'OTHER', default: false})
  other: boolean;

  @Column({name: 'PERSONAL_CARE', default: false})
  personalCare: boolean;

  @Column({name: 'BEAUTY_COSMETIC_CATEGORY_MANAGER', default: false})
  beautyCosmeticCategoryManager: boolean;
  @Column({name: 'BEAUTY_COSMETIC_SENIOR_MANAGER', default: false})
  beautyCosmeticSeniorManager: boolean;
  @Column({name: 'BEAUTY_COSMETIC_HEAD_DEPARTMENT', default: false})
  beautyCosmeticHeadDepartment: boolean;
  @Column({name: 'BEAUTY_COSMETIC_MANAGING_DIRECTOR', default: false})
  beautyCosmeticManagingDirector: boolean;

  @Column({name: 'HOUSEHOLD_CATEGORY_MANAGER', default: false})
  householdCategoryManager: boolean;
  @Column({name: 'HOUSEHOLD_SENIOR_MANAGER', default: false})
  householdSeniorManager: boolean;
  @Column({name: 'HOUSEHOLD_HEAD_DEPARTMENT', default: false})
  householdHeadDepartment: boolean;
  @Column({name: 'HOUSEHOLD_MANAGING_DIRECTOR', default: false})
  householdManagingDirector: boolean;

  @Column({name: 'FOOD_BEVERAGE_CATEGORY_MANAGER', default: false})
  foodBeverageCategoryManager: boolean;
  @Column({name: 'FOOD_BEVERAGE_SENIOR_MANAGER', default: false})
  foodBeverageSeniorManager: boolean;
  @Column({name: 'FOOD_BEVERAGE_HEAD_DEPARTMENT', default: false})
  foodBeverageHeadDepartment: boolean;
  @Column({name: 'FOOD_BEVERAGE_MANAGING_DIRECTOR', default: false})
  foodBeverageManagingDirector: boolean;

  @Column({name: 'APPROVE_FEE', default: false})
  approveFee: boolean;

  @Column({name: 'APPROVE_COMPENSATE', default: false})
  approveCompensate: boolean;

  @Column({name: 'TRADE_TERM_ALLOWED', default: false})
  tradeTermAllowed: boolean

  @Column({name: 'CONTRACT_OFFLINE_ALLOWED', default: false})
  contractOfflineAllowed: boolean;

  @Column({name: 'CONTRACT_ONLINE_ALLOWED', default: false})
  contractOnlineAllowed: boolean;

  @Column({name: 'UPLOAD_ONLINE_ALLOWED', default: false})
  uploadOnlineAllowed: boolean;

  @Column({name: 'CANCEL_TRADE_TERM_ALLOWED', default: false})
  cancelTradeTermAllowed: boolean;

  @Column({name: 'CANCEL_CONTRACT_ALLOWED', default: false})
  cancelContractAllowed: boolean;

  @Column({name: 'SUPPLIER_FUNDING_SETTING', default: false})
  supplierFundingSetting: boolean;

  @Column({name: 'VIEW_CROSS_DEPARTMENT_ALLOWED', default: false})
  viewCrossDepartmentAllowed: boolean;

  @Column({name: 'SENIOR_LEGAL_MANAGER', default: false})
  seniorLegalManager: boolean;

  @Column({name: 'SENIOR_PROPERTY_MANAGER', default: false})
  seniorPropertyManager: boolean;

  @Column({name: 'PROPERTY_CONTRACT_ALLOWED', default: false})
  propertyContractAllowed: boolean;

  @Column({name: 'CANCEL_PROPERTY_CONTRACT_ALLOWED', default: false})
  cancelPropertyContractAllowed: boolean;

  @Column({name: 'PROPERTY_CONTRACT_SETTING', default: false})
  propertyContractSetting: boolean;
}