import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchProductDto } from "src/api/product/product.dto";
import { CreateProductPromotionDto, SearchProductPromotionDto, UpdateProductPromotionDto } from "./product-promotion.dto";
import { ProductPromotionService } from "./product-promotion.service";
@ApiTags("product-promotion")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product-promotion')
export class ProductPromotionController extends BaseController{
    constructor(private readonly productpromotionService:ProductPromotionService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.productpromotionService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductPromotionDto) {
    try{      
      return this.success(await this.productpromotionService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('product-dropdown')
  async productDropdown(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.productpromotionService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductPromotionDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.productpromotionService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductPromotionDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.productpromotionService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.productpromotionService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
