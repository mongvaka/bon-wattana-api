import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchProductDto } from "src/api/product/product.dto";
import { CreateProductImageDto, SearchProductImageDto, UpdateProductImageDto } from "./product-image.dto";
import { ProductImageService } from "./product-image.service";
@ApiTags("product-image")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product-image')
export class ProductImageController extends BaseController{
    constructor(private readonly productimageService:ProductImageService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.productimageService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductImageDto) {
    try{      
      return this.success(await this.productimageService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('product-dropdown')
  async productDropdown(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.productimageService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductImageDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.productimageService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductImageDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.productimageService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.productimageService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
