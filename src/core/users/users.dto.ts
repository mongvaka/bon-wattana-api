import {BasicDataDto} from "../shared/dtos/basic-data.dto";
import {BaseSearchDataDto} from "../shared/dtos/base-search-data.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";
import {ToBoolean} from "../shared/services/dto.service";

export class UsersDto extends BasicDataDto {


}

export class SearchUsersDto extends BaseSearchDataDto {
  // @ApiPropertyOptional()
  // username: string;

  // @ApiPropertyOptional()
  // typeCodeId: string;

  // @ApiPropertyOptional()
  // departmentCodeId: string;

  // @ApiPropertyOptional({description: 'Supplier Funding | Property Contract'})
  // module: string;

  // @ApiPropertyOptional({description: 'Active | In Active'})
  // status: string;
}

export class CreatedUsersDto extends UsersDto {
  // id: null;
  // token: null;
  // @ApiProperty({required: true})
  // @IsString()
  // username: string;

  // @ApiProperty({required: true})
  // @IsNumber()
  // typeCodeId: number;

  // @ApiProperty({required: true})
  // @IsNumber()
  // departmentCodeId: number;
}

export class UpdatedUsersDto extends UsersDto {
  // id: number;

  // @ApiProperty({required: true})
  // @IsNumber()
  // typeCodeId: number;

  // @ApiProperty({required: true})
  // @IsNumber()
  // departmentCodeId: number;
}

export class DeletedUsersDto extends BasicDataDto {
  id: number;
}
