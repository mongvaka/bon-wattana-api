import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards, UsePipes
} from '@nestjs/common';
import {
  ApiBadGatewayResponse, ApiBearerAuth,
  ApiBody, ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {CreatedUsersDto, DeletedUsersDto, SearchUsersDto, UpdatedUsersDto} from "./users.dto";
import {Users} from "./users.entity";
import {MessageResponse} from "../shared/responses/message.response";
import { ChangePasswordDto } from '../authentications/authentications.dto';
import { CustomRequest } from '../shared/models/request-model';
import { BaseController } from '../shared/controller/base-controller';
import { JwtAuthGuard } from '../authentications/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super()
  }
  @Post("change-password")
  @HttpCode(200)
  @ApiBadGatewayResponse({ description: "Bad Gateway." })
  @ApiInternalServerErrorResponse({ description: "INTERNAL SERVER ERROR" })
  async changePassword(@Body() dto: ChangePasswordDto,@Req() req:CustomRequest) {
    try{
      return this.success(await this.usersService.changePassword(dto,req))
    }catch(e){
      return this.error(e)
    }
  }
 
}
