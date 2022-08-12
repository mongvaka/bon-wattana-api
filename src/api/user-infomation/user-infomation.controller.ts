import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchUserDto } from "src/core/users/users.dto";
import { CreateUserInfomationDto, SearchUserInfomationDto, UpdateUserInfomationDto } from "./user-infomation.dto";
import { UserInfomationService } from "./user-infomation.service";
@ApiTags("user-infomation")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user-infomation')
export class UserInfomationController extends BaseController{
    constructor(private readonly userinfomationService:UserInfomationService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.userinfomationService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchUserInfomationDto) {
    try{      
      return this.success(await this.userinfomationService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('user-dropdown')
  async userDropdown(@Body() dto: SearchUserDto) {
    try{      
      return this.success(await this.userinfomationService.userDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateUserInfomationDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.userinfomationService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateUserInfomationDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.userinfomationService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.userinfomationService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
