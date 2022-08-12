import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchUserDto } from "src/core/users/users.dto";
import { CreateOrderHeaderDto, SearchOrderHeaderDto, UpdateOrderHeaderDto } from "./order-header.dto";
import { OrderHeaderService } from "./order-header.service";
@ApiTags("order-header")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('order-header')
export class OrderHeaderController extends BaseController{
    constructor(private readonly orderheaderService:OrderHeaderService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.orderheaderService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchOrderHeaderDto) {
    try{      
      return this.success(await this.orderheaderService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('seller-dropdown')
  async sellerDropdown(@Body() dto: SearchUserDto) {
    try{      
      return this.success(await this.orderheaderService.userDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('buyer-dropdown')
  async buyerDropdown(@Body() dto: SearchUserDto) {
    try{      
      return this.success(await this.orderheaderService.userDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateOrderHeaderDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.orderheaderService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateOrderHeaderDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.orderheaderService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.orderheaderService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
