import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateProductCategoryDto, SearchProductCategoryDto, UpdateProductCategoryDto } from "./product-category.dto";
import { ProductCategoryService } from "./product-category.service";
@ApiTags("product-category")
@Controller('product-category')
export class ProductCategoryController extends BaseController{
    constructor(private readonly service:ProductCategoryService,
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
  async findAll(@Body() dto: SearchProductCategoryDto) {
    try{      
      return this.success(await this.service.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('dropdown')
  async dropdown(@Body() dto: SearchProductCategoryDto) {
    try{      
      // return this.success(await this.dropdownService.productCategoryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateProductCategoryDto, @Req() req:CustomRequest,){ 
    try{
      console.log('create');
      return this.success(await this.service.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Post('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateProductCategoryDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.service.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Post('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{

      
      return this.success(await this.service.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}