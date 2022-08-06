import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchStudentDto } from "src/api/student/student.dto";
import { SearchCongenitialDiseaseDto } from "src/api/congenitial-disease/congenitial-disease.dto";
import { CreateHomeVisitDto, SearchHomeVisitDto, UpdateHomeVisitDto } from "./home-visit.dto";
import { HomeVisitService } from "./home-visit.service";
@ApiTags("home-visit")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('home-visit')
export class HomeVisitController extends BaseController{
    constructor(private readonly homevisitService:HomeVisitService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.homevisitService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchHomeVisitDto) {
    try{      
      return this.success(await this.homevisitService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('student-dropdown')
  async studentDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.homevisitService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('congenital-disease-dropdown')
  async congenitalDiseaseDropdown(@Body() dto: SearchCongenitialDiseaseDto) {
    try{      
      return this.success(await this.homevisitService.congenitialDiseaseDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateHomeVisitDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.homevisitService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateHomeVisitDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.homevisitService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.homevisitService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
