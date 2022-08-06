import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchStudentDto } from "src/api/student/student.dto";
import { SearchEstimateTempDto } from "src/api/estimate-temp/estimate-temp.dto";
import { CreateEstimateDetailDto, SearchEstimateDetailDto, UpdateEstimateDetailDto } from "./estimate-detail.dto";
import { EstimateDetailService } from "./estimate-detail.service";
@ApiTags("estimate-detail")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('estimate-detail')
export class EstimateDetailController extends BaseController{
    constructor(private readonly estimatedetailService:EstimateDetailService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.estimatedetailService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchEstimateDetailDto) {
    try{      
      return this.success(await this.estimatedetailService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('student-dropdown')
  async studentDropdown(@Body() dto: SearchStudentDto) {
    try{      
      return this.success(await this.estimatedetailService.studentDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('estimate-dropdown')
  async estimateDropdown(@Body() dto: SearchEstimateTempDto) {
    try{      
      return this.success(await this.estimatedetailService.estimateTempDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateEstimateDetailDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.estimatedetailService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateEstimateDetailDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.estimatedetailService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.estimatedetailService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
