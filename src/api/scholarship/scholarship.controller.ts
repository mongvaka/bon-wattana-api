import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchStudentDto } from "src/api/student/student.dto";
import { CreateScholarshipDto, SearchScholarshipDto, UpdateScholarshipDto } from "./scholarship.dto";
import { ScholarshipService } from "./scholarship.service";
@ApiTags("scholarship")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('scholarship')
export class ScholarshipController extends BaseController{
    constructor(private readonly scholarshipService:ScholarshipService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.scholarshipService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchScholarshipDto) {
    try{      
      return this.success(await this.scholarshipService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('student-dropdown')
  async studentDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.scholarshipService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateScholarshipDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.scholarshipService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateScholarshipDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.scholarshipService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.scholarshipService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
