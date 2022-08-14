import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchGendarDto extends SearchParameter {
    gendarName?:string
}
export class GendarDto {
    gendarName:string
    gendarDescription:string
} 
export class CreateGendarDto extends GendarDto{
    gendarName:string
    gendarDescription:string
}
export class UpdateGendarDto extends GendarDto{
    gendarName:string
    gendarDescription:string
}
