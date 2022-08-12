import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateProductDto, SearchProductDto, UpdateProductDto } from "./product.dto";
import { ProductService } from "./product.service";
@ApiTags("product")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product')
export class ProductController extends BaseController{
    constructor(private readonly productService:ProductService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.productService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductDto) {
    try{      
      return this.success(await this.productService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.productService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.productService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.productService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
