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
import { CreateTeacherDto, SearchTeacherDto, UpdateTeacherDto } from "./teacher.dto";
import { TeacherService } from "./teacher.service";
@ApiTags("teacher")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('teacher')
export class TeacherController extends BaseController{
    constructor(private readonly teacherService:TeacherService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.teacherService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchTeacherDto) {
    try{      
      return this.success(await this.teacherService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('country-dropdown')
  async countryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.teacherService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('province-dropdown')
  async provinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.teacherService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('district-dropdown')
  async districtDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.teacherService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sub-district-dropdown')
  async subDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.teacherService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-country-dropdown')
  async contractCountryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.teacherService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-province-dropdown')
  async contractProvinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.teacherService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-district-dropdown')
  async contractDistrictDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.teacherService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-sub-district-dropdown')
  async contractSubDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.teacherService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateTeacherDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.teacherService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateTeacherDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.teacherService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.teacherService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
