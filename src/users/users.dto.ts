import {BasicDataDto} from "../shared/dtos/basic-data.dto";
import {BaseSearchDataDto} from "../shared/dtos/base-search-data.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";
import {ToBoolean} from "../shared/services/dto.service";

export class UsersDto extends BasicDataDto {

  @ApiProperty({required: true})
  @IsString()
  firstName: string;

  @ApiProperty({required: true})
  @IsString()
  lastName: string;

  @ApiProperty({required: true})
  @IsString()
  email: string;

  @ApiProperty()
  @ToBoolean()
  supplierFunding: boolean;

  @ApiProperty()
  @ToBoolean()
  propertyContract: boolean;

  @ApiProperty()
  @ToBoolean()
  beautyCosmetics: boolean;

  @ApiProperty()
  @ToBoolean()
  household: boolean;

  @ApiProperty()
  @ToBoolean()
  foodBeverage: boolean;

  @ApiProperty()
  @ToBoolean()
  healthCare: boolean;

  @ApiProperty()
  @ToBoolean()
  lifestyle: boolean;

  @ApiProperty()
  @ToBoolean()
  other: boolean;

  @ApiProperty()
  @ToBoolean()
  personalCare: boolean;

  @ApiProperty()
  @ToBoolean()
  beautyCosmeticCategoryManager: boolean;
  @ApiProperty()
  @ToBoolean()
  beautyCosmeticSeniorManager: boolean;
  @ApiProperty()
  @ToBoolean()
  beautyCosmeticHeadDepartment: boolean;
  @ApiProperty()
  @ToBoolean()
  beautyCosmeticManagingDirector: boolean;

  @ApiProperty()
  @ToBoolean()
  householdCategoryManager: boolean;
  @ApiProperty()
  @ToBoolean()
  householdSeniorManager: boolean;
  @ApiProperty()
  @ToBoolean()
  householdHeadDepartment: boolean;
  @ApiProperty()
  @ToBoolean()
  householdManagingDirector: boolean;
  @ApiProperty()
  @ToBoolean()
  foodBeverageCategoryManager: boolean;
  @ApiProperty()
  @ToBoolean()
  foodBeverageSeniorManager: boolean;
  @ApiProperty()
  @ToBoolean()
  foodBeverageHeadDepartment: boolean;
  @ApiProperty()
  @ToBoolean()
  foodBeverageManagingDirector: boolean;


  @ApiProperty()
  @ToBoolean()
  approveFee: boolean;

  @ApiProperty()
  @ToBoolean()
  approveCompensate: boolean;

  @ApiProperty()
  @ToBoolean()
  tradeTermAllowed: boolean

  @ApiProperty()
  @ToBoolean()
  contractOfflineAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  contractOnlineAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  uploadOnlineAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  cancelTradeTermAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  cancelContractAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  supplierFundingSetting: boolean;

  @ApiProperty()
  @ToBoolean()
  viewCrossDepartmentAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  propertyContractAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  seniorLegalManager: boolean;

  @ApiProperty()
  @ToBoolean()
  seniorPropertyManager: boolean;

  @ApiProperty()
  @ToBoolean()
  cancelPropertyContractAllowed: boolean;

  @ApiProperty()
  @ToBoolean()
  propertyContractSetting: boolean;
}

export class SearchUsersDto extends BaseSearchDataDto {
  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  typeCodeId: string;

  @ApiPropertyOptional()
  departmentCodeId: string;

  @ApiPropertyOptional({description: 'Supplier Funding | Property Contract'})
  module: string;

  @ApiPropertyOptional({description: 'Active | In Active'})
  status: string;
}

export class CreatedUsersDto extends UsersDto {
  id: null;
  token: null;
  @ApiProperty({required: true})
  @IsString()
  username: string;

  @ApiProperty({required: true})
  @IsNumber()
  typeCodeId: number;

  @ApiProperty({required: true})
  @IsNumber()
  departmentCodeId: number;
}

export class UpdatedUsersDto extends UsersDto {
  id: number;

  @ApiProperty({required: true})
  @IsNumber()
  typeCodeId: number;

  @ApiProperty({required: true})
  @IsNumber()
  departmentCodeId: number;
}

export class DeletedUsersDto extends BasicDataDto {
  id: number;
}
