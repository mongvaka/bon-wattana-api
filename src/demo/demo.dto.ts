import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/shared/models/search-param-model";

export class SearchDemoDto extends SearchParameter {
    demoEmail:string
    demoNumber:string
    demoDate:string
    demoEnum:string
}
export class DemoDto {
    demoEmail:string
    demoNumber:string
    demoDate:string
    demoEnum:string
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