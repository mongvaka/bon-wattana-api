import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchProvinceDto } from "src/api/province/province.dto";
import { SearchDistrictDto } from "src/api/district/district.dto";
import { SearchSubDistrictDto } from "src/api/sub-district/sub-district.dto";
import { CreateAddressDto, SearchAddressDto, UpdateAddressDto } from "./address.dto";
import { AddressService } from "./address.service";
@ApiTags("address")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('address')
export class AddressController extends BaseController{
    constructor(private readonly addressService:AddressService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.addressService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchAddressDto) {
    try{      
      return this.success(await this.addressService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('province-dropdown')
  async provinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.addressService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('district-dropdown')
  async districtDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.addressService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sub-district-dropdown')
  async subDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.addressService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateAddressDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.addressService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateAddressDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.addressService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.addressService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
