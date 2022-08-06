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
import { CreateUniversityDto, SearchUniversityDto, UpdateUniversityDto } from "./university.dto";
import { UniversityService } from "./university.service";
@ApiTags("university")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('university')
export class UniversityController extends BaseController{
    constructor(private readonly universityService:UniversityService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.universityService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchUniversityDto) {
    try{      
      return this.success(await this.universityService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('country-dropdown')
  async countryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.universityService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('province-dropdown')
  async provinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.universityService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('district-dropdown')
  async districtDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.universityService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sub-district-dropdown')
  async subDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.universityService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateUniversityDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.universityService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateUniversityDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.universityService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.universityService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
