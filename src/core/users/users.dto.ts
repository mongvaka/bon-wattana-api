import {BasicDataDto} from "../shared/dtos/basic-data.dto";
import {BaseSearchDataDto} from "../shared/dtos/base-search-data.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";
import {ToBoolean} from "../shared/services/dto.service";
import { SearchParameter } from "../shared/models/search-param-model";

export class UserDto extends BasicDataDto {


}

export class SearchUserDto extends SearchParameter {
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

export class CreatedUserDto extends UserDto {
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

export class UpdatedUserDto extends UserDto {
  // id: number;

  // @ApiProperty({required: true})
  // @IsNumber()
  // typeCodeId: number;

  // @ApiProperty({required: true})
  // @IsNumber()
  // departmentCodeId: number;
}

export class DeletedUserDto extends BasicDataDto {
  id: number;
}
