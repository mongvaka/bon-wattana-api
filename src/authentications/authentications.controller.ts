import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import {
  ApiBadGatewayResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthenticationsService } from "./authentications.service";
import { AuthenticationsDto } from "./authentications.dto";
import { BaseController } from "src/shared/controller/base-controller";

@ApiTags("Authentications")
@Controller("authentications")
export class AuthenticationsController  extends BaseController{
  constructor(
    private readonly authenticationsService: AuthenticationsService
  ) {
    super()
  }

  @Post("login")
  @HttpCode(200)
  @ApiBadGatewayResponse({ description: "Bad Gateway." })
  @ApiInternalServerErrorResponse({ description: "INTERNAL SERVER ERROR" })
  async signIn(@Body() dto: AuthenticationsDto) {
    console.log('body',dto);
    try{
      return this.success(await this.authenticationsService.signIn(dto))
    }catch(e){
      return this.error(e)
    }
  }
  

}
