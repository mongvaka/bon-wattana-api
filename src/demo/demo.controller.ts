import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/shared/controller/base-controller";
import { CustomRequest } from "src/shared/models/request-model";
import { DropdownService } from "src/shared/services/dropdown.service";
import { CreateDemoDto, DeleteDemoDto, SearchDemoDto, UpdateDemoDto } from "./demo.dto";
import { DemoService } from "./demo.service";
@ApiTags("demo")

@Controller('demo')
export class DemoController extends BaseController{
    constructor(private readonly demoService:DemoService,
      private readonly dropdownService:DropdownService
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.demoService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchDemoDto) {
    try{      
      return this.success(await this.demoService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('demo-dropdown')
  async demoDropdown(@Body() dto: SearchDemoDto) {
    try{      
      return this.success(await this.dropdownService.demoDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateDemoDto, @Req() req:CustomRequest,){ 
    try{
      console.log('yepppp',dto);
      
      return this.success(await this.demoService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateDemoDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.demoService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.demoService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}