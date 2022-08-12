import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchOrderHeaderDto } from "src/api/order-header/order-header.dto";
import { SearchProductDto } from "src/api/product/product.dto";
import { SearchProductOptionDto } from "src/api/product-option/product-option.dto";
import { CreateOrderDetailDto, SearchOrderDetailDto, UpdateOrderDetailDto } from "./order-detail.dto";
import { OrderDetailService } from "./order-detail.service";
@ApiTags("order-detail")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('order-detail')
export class OrderDetailController extends BaseController{
    constructor(private readonly orderdetailService:OrderDetailService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.orderdetailService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchOrderDetailDto) {
    try{      
      return this.success(await this.orderdetailService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('order-header-dropdown')
  async orderHeaderDropdown(@Body() dto: SearchOrderHeaderDto) {
    try{      
      return this.success(await this.orderdetailService.orderHeaderDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('product-dropdown')
  async productDropdown(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.orderdetailService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('option-dropdown')
  async optionDropdown(@Body() dto: SearchProductOptionDto) {
    try{      
      return this.success(await this.orderdetailService.productOptionDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateOrderDetailDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.orderdetailService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateOrderDetailDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.orderdetailService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.orderdetailService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
