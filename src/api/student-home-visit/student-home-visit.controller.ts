import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
//import { SearchnullDto } from "src/api/null/null.dto";
import { CreateStudentHomeVisitDto, SearchStudentHomeVisitDto, UpdateStudentHomeVisitDto } from "./student-home-visit.dto";
import { StudentHomeVisitService } from "./student-home-visit.service";
@ApiTags("student-home-visit")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('student-home-visit')
export class StudentHomeVisitController extends BaseController{
    constructor(private readonly studenthomevisitService:StudentHomeVisitService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.studenthomevisitService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchStudentHomeVisitDto) {
    try{      
      return this.success(await this.studenthomevisitService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }

  /*
  @Get('student-dropdown')
  async studentDropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('img1-dropdown')
  async img1Dropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('img2-dropdown')
  async img2Dropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('img3-dropdown')
  async img3Dropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('img4-dropdown')
  async img4Dropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('img5-dropdown')
  async img5Dropdown(@Body() dto: SearchnullDto) {
    try{      
      return this.success(await this.studenthomevisitService.nullDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }*/
  @Post('create')
  async create(@Body() dto: CreateStudentHomeVisitDto, @Req() req:CustomRequest,){ 
    try{
      return this.success(await this.studenthomevisitService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateStudentHomeVisitDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.studenthomevisitService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.studenthomevisitService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
