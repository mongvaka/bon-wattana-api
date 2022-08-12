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
import {UserService} from "./users.service";
import {CreatedUserDto, DeletedUserDto, SearchUserDto, UpdatedUserDto} from "./users.dto";
import {User} from "./users.entity";
import {MessageResponse} from "../shared/responses/message.response";

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

 
}
