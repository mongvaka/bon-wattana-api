import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchCheckStudentDto extends SearchParameter {
@ApiPropertyOptional({ type: Number})
    studentId?:number
}
export class CheckStudentDto {
@ApiPropertyOptional({ type: String})
    drugFoodAllergy:string
@ApiPropertyOptional({ type: String})
    llinesses:string
@ApiPropertyOptional({ type: Number})
    weight:number
@ApiPropertyOptional({ type: Number})
    height:number
@ApiPropertyOptional({ type: Number})
    waist:number
@ApiPropertyOptional({ type: Number})
    bloodPressure:number
@ApiPropertyOptional({ type: Number})
    pluseTime:number
@ApiPropertyOptional({ type: Boolean})
    eysExam:boolean
@ApiPropertyOptional({ type: Number})
    noGlassesRight:number
@ApiPropertyOptional({ type: Number})
    noGlassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    glasses:boolean
@ApiPropertyOptional({ type: Number})
    glassesRight:number
@ApiPropertyOptional({ type: Number})
    glassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    contactLens:boolean
@ApiPropertyOptional({ type: Number})
    contactLensRight:number
@ApiPropertyOptional({ type: Number})
    contactLensLeft:number
@ApiPropertyOptional({ type: Boolean})
    colorBlindness:boolean
@ApiPropertyOptional({ type: Boolean})
    hairAndHead:boolean
@ApiPropertyOptional({ type: Boolean})
    eye:boolean
@ApiPropertyOptional({ type: Boolean})
    ear:boolean
@ApiPropertyOptional({ type: Boolean})
    nose:boolean
@ApiPropertyOptional({ type: Boolean})
    mouthTongue:boolean
@ApiPropertyOptional({ type: Boolean})
    gum:boolean
@ApiPropertyOptional({ type: Boolean})
    throatTonsil:boolean
@ApiPropertyOptional({ type: Boolean})
    thyroid:boolean
@ApiPropertyOptional({ type: Boolean})
    skin:boolean
@ApiPropertyOptional({ type: Boolean})
    bone:boolean
@ApiPropertyOptional({ type: Boolean})
    speakingHearing:boolean
@ApiPropertyOptional({ type: String})
    earLess:any
@ApiPropertyOptional({ type: Boolean})
    dentalCavities:boolean
@ApiPropertyOptional({ type: Boolean})
    dentalLimestone:boolean
@ApiPropertyOptional({ type: String})
    dentalOther:string
@ApiPropertyOptional({ type: Number})
    studentId:number
} 
export class CreateCheckStudentDto extends CheckStudentDto{
@ApiPropertyOptional({ type: String})
    drugFoodAllergy:string
@ApiPropertyOptional({ type: String})
    llinesses:string
@ApiPropertyOptional({ type: Number})
    weight:number
@ApiPropertyOptional({ type: Number})
    height:number
@ApiPropertyOptional({ type: Number})
    waist:number
@ApiPropertyOptional({ type: Number})
    bloodPressure:number
@ApiPropertyOptional({ type: Number})
    pluseTime:number
@ApiPropertyOptional({ type: Boolean})
    eysExam:boolean
@ApiPropertyOptional({ type: Number})
    noGlassesRight:number
@ApiPropertyOptional({ type: Number})
    noGlassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    glasses:boolean
@ApiPropertyOptional({ type: Number})
    glassesRight:number
@ApiPropertyOptional({ type: Number})
    glassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    contactLens:boolean
@ApiPropertyOptional({ type: Number})
    contactLensRight:number
@ApiPropertyOptional({ type: Number})
    contactLensLeft:number
@ApiPropertyOptional({ type: Boolean})
    colorBlindness:boolean
@ApiPropertyOptional({ type: Boolean})
    hairAndHead:boolean
@ApiPropertyOptional({ type: Boolean})
    eye:boolean
@ApiPropertyOptional({ type: Boolean})
    ear:boolean
@ApiPropertyOptional({ type: Boolean})
    nose:boolean
@ApiPropertyOptional({ type: Boolean})
    mouthTongue:boolean
@ApiPropertyOptional({ type: Boolean})
    gum:boolean
@ApiPropertyOptional({ type: Boolean})
    throatTonsil:boolean
@ApiPropertyOptional({ type: Boolean})
    thyroid:boolean
@ApiPropertyOptional({ type: Boolean})
    skin:boolean
@ApiPropertyOptional({ type: Boolean})
    bone:boolean
@ApiPropertyOptional({ type: Boolean})
    speakingHearing:boolean
@ApiPropertyOptional({ type: String})
    earLess:any
@ApiPropertyOptional({ type: Boolean})
    dentalCavities:boolean
@ApiPropertyOptional({ type: Boolean})
    dentalLimestone:boolean
@ApiPropertyOptional({ type: String})
    dentalOther:string
@ApiPropertyOptional({ type: Number})
    studentId:number
}
export class UpdateCheckStudentDto extends CheckStudentDto{
@ApiPropertyOptional({ type: String})
    drugFoodAllergy:string
@ApiPropertyOptional({ type: String})
    llinesses:string
@ApiPropertyOptional({ type: Number})
    weight:number
@ApiPropertyOptional({ type: Number})
    height:number
@ApiPropertyOptional({ type: Number})
    waist:number
@ApiPropertyOptional({ type: Number})
    bloodPressure:number
@ApiPropertyOptional({ type: Number})
    pluseTime:number
@ApiPropertyOptional({ type: Boolean})
    eysExam:boolean
@ApiPropertyOptional({ type: Number})
    noGlassesRight:number
@ApiPropertyOptional({ type: Number})
    noGlassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    glasses:boolean
@ApiPropertyOptional({ type: Number})
    glassesRight:number
@ApiPropertyOptional({ type: Number})
    glassesLeft:number
@ApiPropertyOptional({ type: Boolean})
    contactLens:boolean
@ApiPropertyOptional({ type: Number})
    contactLensRight:number
@ApiPropertyOptional({ type: Number})
    contactLensLeft:number
@ApiPropertyOptional({ type: Boolean})
    colorBlindness:boolean
@ApiPropertyOptional({ type: Boolean})
    hairAndHead:boolean
@ApiPropertyOptional({ type: Boolean})
    eye:boolean
@ApiPropertyOptional({ type: Boolean})
    ear:boolean
@ApiPropertyOptional({ type: Boolean})
    nose:boolean
@ApiPropertyOptional({ type: Boolean})
    mouthTongue:boolean
@ApiPropertyOptional({ type: Boolean})
    gum:boolean
@ApiPropertyOptional({ type: Boolean})
    throatTonsil:boolean
@ApiPropertyOptional({ type: Boolean})
    thyroid:boolean
@ApiPropertyOptional({ type: Boolean})
    skin:boolean
@ApiPropertyOptional({ type: Boolean})
    bone:boolean
@ApiPropertyOptional({ type: Boolean})
    speakingHearing:boolean
@ApiPropertyOptional({ type: String})
    earLess:any
@ApiPropertyOptional({ type: Boolean})
    dentalCavities:boolean
@ApiPropertyOptional({ type: Boolean})
    dentalLimestone:boolean
@ApiPropertyOptional({ type: String})
    dentalOther:string
@ApiPropertyOptional({ type: Number})
    studentId:number
    @ApiPropertyOptional({ type: Number})
    yearTermId:number
}
