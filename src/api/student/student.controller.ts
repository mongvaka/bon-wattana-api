import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchHopitalDto } from "src/api/hopital/hopital.dto";
import { SearchCountryDto } from "src/api/country/country.dto";
import { SearchSubDistrictDto } from "src/api/sub-district/sub-district.dto";
import { SearchDistrictDto } from "src/api/district/district.dto";
import { SearchProvinceDto } from "src/api/province/province.dto";
import { SearchOldSchoolDto } from "src/api/old-school/old-school.dto";
import { SearchTeacherDto } from "src/api/teacher/teacher.dto";
import { CreateStudentDto, SearchStudentDto, UpdateStudentDto } from "./student.dto";
import { StudentService } from "./student.service";
@ApiTags("student")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('student')
export class StudentController extends BaseController{
    constructor(private readonly studentService:StudentService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.studentService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.studentService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('birth-hospital-dropdown')
  async birthHospitalDropdown(@Body() dto: SearchHopitalDto) {
    try{      
      return this.success(await this.studentService.hopitalDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('birth-country-dropdown')
  async birthCountryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.studentService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('country-dropdown')
  async countryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.studentService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sub-district-dropdown')
  async subDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.studentService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('district-dropdown')
  async districtDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.studentService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('province-dropdown')
  async provinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.studentService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-country-dropdown')
  async contractCountryDropdown(@Body() dto: SearchCountryDto) {
    try{      
      return this.success(await this.studentService.countryDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-sub-district-dropdown')
  async contractSubDistrictDropdown(@Body() dto: SearchSubDistrictDto) {
    try{      
      return this.success(await this.studentService.subDistrictDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-district-dropdown')
  async contractDistrictDropdown(@Body() dto: SearchDistrictDto) {
    try{      
      return this.success(await this.studentService.districtDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('contract-province-dropdown')
  async contractProvinceDropdown(@Body() dto: SearchProvinceDto) {
    try{      
      return this.success(await this.studentService.provinceDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('old-school-dropdown')
  async oldSchoolDropdown(@Body() dto: SearchOldSchoolDto) {
    try{      
      return this.success(await this.studentService.oldSchoolDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('mentor-teacher-first-dropdown')
  async mentorTeacherFirstDropdown(@Body() dto: SearchTeacherDto) {
    try{      
      return this.success(await this.studentService.teacherDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('mentor-teacher-second-dropdown')
  async mentorTeacherSecondDropdown(@Body() dto: SearchTeacherDto) {
    try{      
      return this.success(await this.studentService.teacherDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('close-freind-in-class-dropdown')
  async closeFreindInClassDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.studentService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('close-freind-other-class-dropdown')
  async closeFreindOtherClassDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.studentService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateStudentDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.studentService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateStudentDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.studentService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.studentService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
