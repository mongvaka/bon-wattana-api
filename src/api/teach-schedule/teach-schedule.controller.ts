import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchTeacherDto } from "src/api/teacher/teacher.dto";
// import { SearchCourseDto } from "src/api/course/course.dto";
import { CreateTeachScheduleDto, SearchTeachScheduleDto, UpdateTeachScheduleDto } from "./teach-schedule.dto";
import { TeachScheduleService } from "./teach-schedule.service";
@ApiTags("teach-schedule")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('teach-schedule')
export class TeachScheduleController extends BaseController{
    constructor(private readonly teachscheduleService:TeachScheduleService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.teachscheduleService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchTeachScheduleDto) {
    try{      
      return this.success(await this.teachscheduleService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('teacher-dropdown')
  async teacherDropdown(@Body() dto: SearchTeacherDto) {
    try{      
      return this.success(await this.teachscheduleService.teacherDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  // @Get('couse-dropdown')
  // async couseDropdown(@Body() dto: SearchCourseDto) {
  //   try{      
  //     return this.success(await this.teachscheduleService.courseDropdown(dto))
  //   }catch(e){
  //     return this.error(e)
  //   }
  // }
  @Post('create')
  async create(@Body() dto: CreateTeachScheduleDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.teachscheduleService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateTeachScheduleDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.teachscheduleService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.teachscheduleService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
