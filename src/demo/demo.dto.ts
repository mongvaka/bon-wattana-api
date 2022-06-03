import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/shared/models/search-param-model";

export class SearchDemoDto extends SearchParameter {
    demoText1:string
}
export class DemoDto {
    @ApiPropertyOptional()
    demoText1?:string
    @ApiPropertyOptional()
    demoText2?:string
    @ApiPropertyOptional()
    demoText3?:string
    @ApiPropertyOptional()
    demoText4?:string
} 
export class CreateDemoDto extends DemoDto{

}
export class UpdateDemoDto extends DemoDto{
    @ApiProperty()
    id:number

}
export class DeleteDemoDto extends DemoDto{
    @ApiProperty()
    id:number
}