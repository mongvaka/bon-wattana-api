import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateEstimateGroupDto, SearchEstimateGroupDto, UpdateEstimateGroupDto } from "./estimate-group.dto";
import { EstimateGroupService } from "./estimate-group.service";
@ApiTags("estimate-group")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('estimate-group')
export class EstimateGroupController extends BaseController{
    constructor(private readonly estimategroupService:EstimateGroupService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.estimategroupService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchEstimateGroupDto) {
    try{      
      return this.success(await this.estimategroupService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateEstimateGroupDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.estimategroupService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateEstimateGroupDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.estimategroupService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.estimategroupService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
