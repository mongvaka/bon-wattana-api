import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchEstimateGroupDto } from "src/api/estimate-group/estimate-group.dto";
import { CreateEstimateTempDto, SearchEstimateTempDto, UpdateEstimateTempDto } from "./estimate-temp.dto";
import { EstimateTempService } from "./estimate-temp.service";
@ApiTags("estimate-temp")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('estimate-temp')
export class EstimateTempController extends BaseController{
    constructor(private readonly estimatetempService:EstimateTempService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.estimatetempService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchEstimateTempDto) {
    try{      
      return this.success(await this.estimatetempService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('estimate-group-dropdown')
  async estimateGroupDropdown(@Body() dto: SearchEstimateGroupDto) {
    try{      
      return this.success(await this.estimatetempService.estimateGroupDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateEstimateTempDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.estimatetempService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateEstimateTempDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.estimatetempService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.estimatetempService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
