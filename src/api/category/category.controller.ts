import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateCategoryDto, SearchCategoryDto, UpdateCategoryDto } from "./category.dto";
import { CategoryService } from "./category.service";
@ApiTags("category")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('category')
export class CategoryController extends BaseController{
    constructor(private readonly categoryService:CategoryService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.categoryService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchCategoryDto) {
    try{      
      return this.success(await this.categoryService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('category-dropdown')
  async categoryDropdown(@Body() dto: SearchCategoryDto) {
    try{      
      return this.success(await this.categoryService.categoryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateCategoryDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.categoryService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateCategoryDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.categoryService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.categoryService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
