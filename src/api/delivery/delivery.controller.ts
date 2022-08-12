import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchOrderHeaderDto } from "src/api/order-header/order-header.dto";
import { CreateDeliveryDto, SearchDeliveryDto, UpdateDeliveryDto } from "./delivery.dto";
import { DeliveryService } from "./delivery.service";
import { SearchUserDto } from "src/core/users/users.dto";
@ApiTags("delivery")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('delivery')
export class DeliveryController extends BaseController{
    constructor(private readonly deliveryService:DeliveryService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.deliveryService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchDeliveryDto) {
    try{      
      return this.success(await this.deliveryService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('deliver-dropdown')
  async deliverDropdown(@Body() dto: SearchUserDto) {
    try{      
      return this.success(await this.deliveryService.userDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('order-header-dropdown')
  async orderHeaderDropdown(@Body() dto: SearchOrderHeaderDto) {
    try{      
      return this.success(await this.deliveryService.orderHeaderDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateDeliveryDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.deliveryService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateDeliveryDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.deliveryService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.deliveryService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
