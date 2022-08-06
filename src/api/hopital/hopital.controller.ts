import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/authentications/jwt-auth.guard";
import { BaseController } from "src/core/shared/controller/base-controller";
import { CustomRequest } from "src/core/shared/models/request-model";
import { DropdownService } from "src/core/shared/services/dropdown.service";
import { SearchAddressDto } from "src/api/address/address.dto";
import { CreateHopitalDto, SearchHopitalDto, UpdateHopitalDto } from "./hopital.dto";
import { HopitalService } from "./hopital.service";
@ApiTags("hopital")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('hopital')
export class HopitalController extends BaseController{
    constructor(private readonly hopitalService:HopitalService,
      ){
      super()
    }
  @Get('item/:id')
  async item(@Param('id') id: number) {
    try{
      return this.success(await this.hopitalService.item(id))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('list')
  async findAll(@Body() dto: SearchHopitalDto) {
    try{      
      return this.success(await this.hopitalService.list(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Get('address-dropdown')
  async addressDropdown(@Body() dto: SearchAddressDto) {
    try{      
      return this.success(await this.hopitalService.addressDropdown(dto))
    }catch(e){
      return this.error(e)
    }
  }
  @Post('create')
  async create(@Body() dto: CreateHopitalDto, @Req() req:CustomRequest,){ 
    try{      
      return this.success(await this.hopitalService.create(dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Put('update/:id')
  async update(@Param('id') id: number,@Body() dto: UpdateHopitalDto, @Req() req:CustomRequest,){    
    try{
      return this.success(await this.hopitalService.update(id,dto,req))
    }catch(e){
      return this.error(e)
    }   
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req:CustomRequest,){
    try{
      return this.success(await this.hopitalService.delete(id,req))
    }catch(e){
      return this.error(e)
    }    
  }
}
