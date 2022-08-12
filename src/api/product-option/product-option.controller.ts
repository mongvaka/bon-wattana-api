import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchProductDto } from "src/api/product/product.dto";
import { CreateProductOptionDto, SearchProductOptionDto, UpdateProductOptionDto } from "./product-option.dto";
import { ProductOptionService } from "./product-option.service";
@ApiTags("product-option")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product-option')
export class ProductOptionController extends BaseController{
    constructor(private readonly productoptionService:ProductOptionService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.productoptionService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductOptionDto) {
    try{      
      return this.success(await this.productoptionService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('product-dropdown')
  async productDropdown(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.productoptionService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductOptionDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.productoptionService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductOptionDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.productoptionService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.productoptionService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
