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
import {CreatedUsersValidation, UpdatedUsersValidation} from "./users.validation";

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @ApiBadGatewayResponse({description: 'bad gateway'})
  @ApiInternalServerErrorResponse({description: 'internal server error'})
  findAll(@Query() dto: SearchUsersDto) {
    return this.usersService.paginate(dto);
  }

  @Get('permission/type-code')
  @HttpCode(200)
  async typeCode() {
    return await this.usersService.typeCodeFindAll();
  }


  @Get('permission/department-code')
  @HttpCode(200)
  async departmentCode() {
    return await this.usersService.departmentCodeFindAll();
  }

  // TODO: generate master
  //@Get('permission/generate')
  @HttpCode(200)
  async generate() {
    return await this.usersService.generate();
  }


  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id of user',
  })
  @HttpCode(200)
  async get(@Param('id') id: number) {
    return await this.usersService.findByIdAndRelations(id);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({type: CreatedUsersDto})
  @UsePipes(CreatedUsersValidation)
  @ApiCreatedResponse({
    description: MessageResponse.CREATED_SUCCESS,
  })
  @ApiBadGatewayResponse({description: MessageResponse.BAD_GATEWAY})
  @ApiInternalServerErrorResponse({description: MessageResponse.INTERNAL_SERVER_ERROR})
  async create(@Body() dto: CreatedUsersDto, @Req() req,
  ) {
    const users: Users = req.user;
    dto.createdBy = `${users.firstName} ${users.lastName}`;
    return await this.usersService.insert(dto);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id of user',
  })
  @UsePipes(UpdatedUsersValidation)
  @ApiOkResponse({
    description: MessageResponse.UPDATED_SUCCESS,
  })
  @ApiBadGatewayResponse({description: MessageResponse.BAD_GATEWAY})
  @ApiInternalServerErrorResponse({description: MessageResponse.INTERNAL_SERVER_ERROR})
  async update(@Param('id') id: number,
               @Body() dto: UpdatedUsersDto,
               @Req() req,
  ) {
    const users: Users = req.user;
    dto.updatedBy = `${users.firstName} ${users.lastName}`;
    dto.updatedAt = new Date();
    dto.id = id;
    return this.usersService.updated(dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id of user',
  })
  @HttpCode(200)
  @ApiOkResponse({
    description: MessageResponse.DELETED_SUCCESS,
  })
  @ApiBadGatewayResponse({description: MessageResponse.BAD_GATEWAY})
  @ApiInternalServerErrorResponse({description: MessageResponse.INTERNAL_SERVER_ERROR})
  async delete(
    @Param('id') id: number,
    @Req() req
  ) {
    const users: Users = req.user;
    const dto: DeletedUsersDto = {
      id: id,
      deleted: true,
      active: false,
      deletedBy: `${users.firstName} ${users.lastName}`
    }
    return await this.usersService.deleted(dto);
  }
}
