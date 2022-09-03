import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchTeacherDto extends SearchParameter {
@ApiPropertyOptional({ type: String})
    posonalCode?:string
@ApiPropertyOptional({ type: String})
    teacherCode?:string
@ApiPropertyOptional({ type: String})
    firstname?:string
@ApiPropertyOptional({ type: String})
    lastname?:string
}
export class TeacherDto {
@ApiPropertyOptional({ type: String})
    teacherPhoto:string
@ApiPropertyOptional({ type: String})
    posonalCode:string
@ApiPropertyOptional({ type: String})
    teacherCode:string
@ApiPropertyOptional({ type: Number})
    status:number
@ApiPropertyOptional({ type: Number})
    title:number
@ApiPropertyOptional({ type: String})
    firstname:string
@ApiPropertyOptional({ type: String})
    lastname:string
@ApiPropertyOptional({ type: String})
    firstnameEn:string
@ApiPropertyOptional({ type: String})
    lastnameEn:string
@ApiPropertyOptional({ type: Number})
    gendarId:number
@ApiPropertyOptional({ type: Date})
    birthDate:Date
@ApiPropertyOptional({ type: Number})
    nationalityId:number
@ApiPropertyOptional({ type: Number})
    ethnicityId:number
@ApiPropertyOptional({ type: Number})
    religionId:number
@ApiPropertyOptional({ type: String})
    positionName:string
@ApiPropertyOptional({ type: Number})
    practitionerLevelId:number
@ApiPropertyOptional({ type: String})
    practitionerNo:string
@ApiPropertyOptional({ type: Number})
    educationBackgroundId:number
@ApiPropertyOptional({ type: String})
    educationMajor:string
@ApiPropertyOptional({ type: Date})
    setInDate:Date
@ApiPropertyOptional({ type: Number})
    teacherClass1:number
@ApiPropertyOptional({ type: Number})
    teacherClass2:number
@ApiPropertyOptional({ type: Number})
    teacherClass3:number
@ApiPropertyOptional({ type: Number})
    teacherClass4:number
@ApiPropertyOptional({ type: Number})
    teacherClass5:number
@ApiPropertyOptional({ type: Number})
    teacherClass6:number
@ApiPropertyOptional({ type: String})
    subjectGroupId:string
@ApiPropertyOptional({ type: String})
    teacherEmail:string
@ApiPropertyOptional({ type: String})
    phoneNumber:string
@ApiPropertyOptional({ type: String})
    facebookUrl:string
@ApiPropertyOptional({ type: String})
    lineId:string
@ApiPropertyOptional({ type: String})
    houseNumber:string
@ApiPropertyOptional({ type: String})
    village:string
@ApiPropertyOptional({ type: String})
    road:string
@ApiPropertyOptional({ type: Number})
    countryId:number
@ApiPropertyOptional({ type: Number})
    provinceId:number
@ApiPropertyOptional({ type: Number})
    districtId:number
@ApiPropertyOptional({ type: Number})
    subDistrictId:number
} 
export class CreateTeacherDto extends TeacherDto{
@ApiPropertyOptional({ type: String})
    teacherPhoto:string
@ApiPropertyOptional({ type: String})
    posonalCode:string
@ApiPropertyOptional({ type: String})
    teacherCode:string
@ApiPropertyOptional({ type: Number})
    status:number
@ApiPropertyOptional({ type: Number})
    title:number
@ApiPropertyOptional({ type: String})
    firstname:string
@ApiPropertyOptional({ type: String})
    lastname:string
@ApiPropertyOptional({ type: String})
    firstnameEn:string
@ApiPropertyOptional({ type: String})
    lastnameEn:string
@ApiPropertyOptional({ type: Number})
    gendarId:number
@ApiPropertyOptional({ type: Date})
    birthDate:Date
@ApiPropertyOptional({ type: Number})
    nationalityId:number
@ApiPropertyOptional({ type: Number})
    ethnicityId:number
@ApiPropertyOptional({ type: Number})
    religionId:number
@ApiPropertyOptional({ type: String})
    positionName:string
@ApiPropertyOptional({ type: Number})
    practitionerLevelId:number
@ApiPropertyOptional({ type: String})
    practitionerNo:string
@ApiPropertyOptional({ type: Number})
    educationBackgroundId:number
@ApiPropertyOptional({ type: String})
    educationMajor:string
@ApiPropertyOptional({ type: Date})
    setInDate:Date
@ApiPropertyOptional({ type: Number})
    teacherClass1:number
@ApiPropertyOptional({ type: Number})
    teacherClass2:number
@ApiPropertyOptional({ type: Number})
    teacherClass3:number
@ApiPropertyOptional({ type: Number})
    teacherClass4:number
@ApiPropertyOptional({ type: Number})
    teacherClass5:number
@ApiPropertyOptional({ type: Number})
    teacherClass6:number
@ApiPropertyOptional({ type: String})
    subjectGroupId:string
@ApiPropertyOptional({ type: String})
    teacherEmail:string
@ApiPropertyOptional({ type: String})
    phoneNumber:string
@ApiPropertyOptional({ type: String})
    facebookUrl:string
@ApiPropertyOptional({ type: String})
    lineId:string
@ApiPropertyOptional({ type: String})
    houseNumber:string
@ApiPropertyOptional({ type: String})
    village:string
@ApiPropertyOptional({ type: String})
    road:string
@ApiPropertyOptional({ type: Number})
    countryId:number
@ApiPropertyOptional({ type: Number})
    provinceId:number
@ApiPropertyOptional({ type: Number})
    districtId:number
@ApiPropertyOptional({ type: Number})
    subDistrictId:number
}
export class UpdateTeacherDto extends TeacherDto{
@ApiPropertyOptional({ type: String})
    teacherPhoto:string
@ApiPropertyOptional({ type: String})
    posonalCode:string
@ApiPropertyOptional({ type: String})
    teacherCode:string
@ApiPropertyOptional({ type: Number})
    status:number
@ApiPropertyOptional({ type: Number})
    title:number
@ApiPropertyOptional({ type: String})
    firstname:string
@ApiPropertyOptional({ type: String})
    lastname:string
@ApiPropertyOptional({ type: String})
    firstnameEn:string
@ApiPropertyOptional({ type: String})
    lastnameEn:string
@ApiPropertyOptional({ type: Number})
    gendarId:number
@ApiPropertyOptional({ type: Date})
    birthDate:Date
@ApiPropertyOptional({ type: Number})
    nationalityId:number
@ApiPropertyOptional({ type: Number})
    ethnicityId:number
@ApiPropertyOptional({ type: Number})
    religionId:number
@ApiPropertyOptional({ type: String})
    positionName:string
@ApiPropertyOptional({ type: Number})
    practitionerLevelId:number
@ApiPropertyOptional({ type: String})
    practitionerNo:string
@ApiPropertyOptional({ type: Number})
    educationBackgroundId:number
@ApiPropertyOptional({ type: String})
    educationMajor:string
@ApiPropertyOptional({ type: Date})
    setInDate:Date
@ApiPropertyOptional({ type: Number})
    teacherClass1:number
@ApiPropertyOptional({ type: Number})
    teacherClass2:number
@ApiPropertyOptional({ type: Number})
    teacherClass3:number
@ApiPropertyOptional({ type: Number})
    teacherClass4:number
@ApiPropertyOptional({ type: Number})
    teacherClass5:number
@ApiPropertyOptional({ type: Number})
    teacherClass6:number
@ApiPropertyOptional({ type: String})
    subjectGroupId:string
@ApiPropertyOptional({ type: String})
    teacherEmail:string
@ApiPropertyOptional({ type: String})
    phoneNumber:string
@ApiPropertyOptional({ type: String})
    facebookUrl:string
@ApiPropertyOptional({ type: String})
    lineId:string
@ApiPropertyOptional({ type: String})
    houseNumber:string
@ApiPropertyOptional({ type: String})
    village:string
@ApiPropertyOptional({ type: String})
    road:string
@ApiPropertyOptional({ type: Number})
    countryId:number
@ApiPropertyOptional({ type: Number})
    provinceId:number
@ApiPropertyOptional({ type: Number})
    districtId:number
@ApiPropertyOptional({ type: Number})
    subDistrictId:number
}
