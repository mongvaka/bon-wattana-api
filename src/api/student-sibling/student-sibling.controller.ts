import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchStudentDto } from "src/api/student/student.dto";
import { CreateStudentSiblingDto, SearchStudentSiblingDto, UpdateStudentSiblingDto } from "./student-sibling.dto";
import { StudentSiblingService } from "./student-sibling.service";
@ApiTags("student-sibling")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('student-sibling')
export class StudentSiblingController extends BaseController{
    constructor(private readonly studentsiblingService:StudentSiblingService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.studentsiblingService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchStudentSiblingDto) {
    try{      
      return this.success(await this.studentsiblingService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sudent-dropdown')
  async sudentDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.studentsiblingService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('sibling-dropdown')
  async siblingDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.studentsiblingService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateStudentSiblingDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.studentsiblingService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateStudentSiblingDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.studentsiblingService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.studentsiblingService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
