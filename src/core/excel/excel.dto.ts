import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";
import { ModuleName } from "../shared/constans/enum-constans";
export class ImportExcelDto {
    moduleName:string
    base64:string
} 

