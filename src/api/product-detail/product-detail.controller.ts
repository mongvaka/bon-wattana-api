import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchProductDto } from "src/api/product/product.dto";
import { CreateProductDetailDto, SearchProductDetailDto, UpdateProductDetailDto } from "./product-detail.dto";
import { ProductDetailService } from "./product-detail.service";
@ApiTags("product-detail")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product-detail')
export class ProductDetailController extends BaseController{
    constructor(private readonly productdetailService:ProductDetailService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.productdetailService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductDetailDto) {
    try{      
      return this.success(await this.productdetailService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('product-dropdown')
  async productDropdown(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.productdetailService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductDetailDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.productdetailService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductDetailDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.productdetailService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.productdetailService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
