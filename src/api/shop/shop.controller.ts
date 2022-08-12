import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchCountryDto } from "src/api/country/country.dto";
import { SearchProvinceDto } from "src/api/province/province.dto";
import { SearchDistrictDto } from "src/api/district/district.dto";
import { SearchSubDistrictDto } from "src/api/sub-district/sub-district.dto";
import { CreateShopDto, SearchShopDto, UpdateShopDto } from "./shop.dto";
import { ShopService } from "./shop.service";
@ApiTags("shop")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('shop')
export class ShopController extends BaseController{
    constructor(private readonly shopService:ShopService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.shopService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchShopDto) {
    try{      
      return this.success(await this.shopService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('country-dropdown')
  async countryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.shopService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('province-dropdown')
  async provinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.shopService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('district-dropdown')
  async districtDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.shopService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sub-district-dropdown')
  async subDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.shopService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateShopDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.shopService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateShopDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.shopService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.shopService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
