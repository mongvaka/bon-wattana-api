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

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

 
}
