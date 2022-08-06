import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchTeacherDto } from "src/api/teacher/teacher.dto";
import { SearchUniversityDto } from "src/api/university/university.dto";
import { CreateDegreeDto, SearchDegreeDto, UpdateDegreeDto } from "./degree.dto";
import { DegreeService } from "./degree.service";
@ApiTags("degree")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('degree')
export class DegreeController extends BaseController{
    constructor(private readonly degreeService:DegreeService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.degreeService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchDegreeDto) {
    try{      
      return this.success(await this.degreeService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('teacher-dropdown')
  async teacherDropdown(@Body() dto: SearchTeacherDto) {
    try{      
      return this.success(await this.degreeService.teacherDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('university-dropdown')
  async universityDropdown(@Body() dto: SearchUniversityDto) {
    try{      
      return this.success(await this.degreeService.universityDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateDegreeDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.degreeService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateDegreeDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.degreeService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.degreeService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
