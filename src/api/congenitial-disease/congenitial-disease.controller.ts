import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchStudentDto } from "src/api/student/student.dto";
import { CreateCongenitialDiseaseDto, SearchCongenitialDiseaseDto, UpdateCongenitialDiseaseDto } from "./congenitial-disease.dto";
import { CongenitialDiseaseService } from "./congenitial-disease.service";
@ApiTags("congenitial-disease")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('congenitial-disease')
export class CongenitialDiseaseController extends BaseController{
    constructor(private readonly congenitialdiseaseService:CongenitialDiseaseService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.congenitialdiseaseService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchCongenitialDiseaseDto) {
    try{      
      return this.success(await this.congenitialdiseaseService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('student-dropdown')
  async studentDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.congenitialdiseaseService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateCongenitialDiseaseDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.congenitialdiseaseService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateCongenitialDiseaseDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.congenitialdiseaseService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.congenitialdiseaseService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
