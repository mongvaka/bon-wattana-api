import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateSdqTableDto, SearchSdqTableDto, UpdateSdqTableDto } from "./sdq-table.dto";
import { SdqTableService } from "./sdq-table.service";
import { SearchClassroomDto } from "src/api/classroom/classroom.dto";
import { SearchStudentDto } from "src/api/student/student.dto";
@ApiTags("sdq-teacher")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('sdq-teacher')
export class SdqTeacherController extends BaseController{
  constructor(private readonly sdqtableService:SdqTableService,
    ){
    super()
  }
  
@Get('item/:id')
async item(@Param('id') id: number) {
  try{
    return this.success(await this.sdqtableService.item(id))
  }catch(e){
    return this.error(e)
  }
}
@Post('list')
async findAll(@Body() dto: SearchStudentDto) {
  try{   

    return this.success(await this.sdqtableService.listForTeacher(dto))
  }catch(e){
    return this.error(e)
  }
}
@Post('create')
async create(@Body() dto: CreateSdqTableDto, @Req() req:CustomRequest,){ 
  try{      
 
    return this.success(await this.sdqtableService.create(dto,req))
  }catch(e){
    return this.error(e)
  }   
}
@Put('update/:id')
async update(@Param('id') id: number,@Body() dto: UpdateSdqTableDto, @Req() req:CustomRequest,){    
  try{
    return this.success(await this.sdqtableService.update(id,dto,req))
  }catch(e){
    return this.error(e)
  }   
}
@Delete('delete/:id')
async delete(@Param('id') id: number, @Req() req:CustomRequest,){
  try{
    return this.success(await this.sdqtableService.delete(id,req))
  }catch(e){
    return this.error(e)
  }    
}
@Get('classroom-dropdown')
async classroomDropdown(@Body() dto: SearchClassroomDto) {
  try{      
    return this.success(await this.sdqtableService.classroomDropdown(dto))
  }catch(e){
    return this.error(e)
  }
}
@Get('classroom-type-dropdown')
async classroomTypeDropdown(@Body() dto: SearchClassroomDto) {
  try{      
    return this.success(await this.sdqtableService.classroomTypeDropdown(dto))
  }catch(e){
    return this.error(e)
  }
}
@Get('initial/:id')
async initial(@Param('id') id: number) {
  try{
    return this.success(await this.sdqtableService.initial(id))
  }catch(e){
    return this.error(e)
  }
}
}
