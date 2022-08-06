import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { CreateParentDto, SearchParentDto, UpdateParentDto } from "./parent.dto";
import { ParentService } from "./parent.service";
@ApiTags("parent")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('parent')
export class ParentController extends BaseController{
    constructor(private readonly parentService:ParentService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.parentService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchParentDto) {
    try{      
      return this.success(await this.parentService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateParentDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.parentService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateParentDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.parentService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.parentService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
