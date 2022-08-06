import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateProductDto, SearchProductDto, UpdateProductDto } from "./product.dto";
import { ProductService } from "./product.service";
@ApiTags("product")
@Controller('product')
export class ProductController extends BaseController{
    constructor(private readonly service:ProductService,
      private readonly dropdownService:DropdownService
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.service.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchProductDto) {
    try{      
      console.log('thisList');
      
      return this.success(await this.service.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('dropdown')
  async dropdown(@Body() dto: SearchProductDto) {
    try{      
      // return this.success(await this.dropdownService.productDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductDto, @Req() req:CustomRequest,){ 
    try{
      console.log('create');
      return this.success(await this.service.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.service.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{

      
      return this.success(await this.service.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}