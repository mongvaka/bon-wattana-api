import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchParameter } from "src/core/shared/models/search-param-model";

export class SearchStudentHomeVisitDto extends SearchParameter {

}
export class StudentHomeVisitDto {
    id:number
    homeVisitday: Date;
    atSemester: number;
    atYear: number;
    studentId: number;
    studentValue: string;
    getMoneyForSchool: string;
    liveWith: number;
    liveWithOther: string;
    totalHouseholdMember: number;
    totalIncludeStudent: number;
    totalBrother1: number;
    totalBrather2: number;
    totalSister1: number;
    totalSister2: number;
    totalStudentLeaning: number;
    totalStudentSchool: number;
    studentNumberFamily: number;
    familyStatus: number;
    fatherOccupation: string;
    fatherIncome: string;
    motherOccupation: string;
    motherIncome: string;
    parentOccupation: string;
    parentIncome: string;
    howParentsNurtureStudents: number;
    howParentsNurtureStudentsOther: string;
    familyMemberRelationships: number;
    memberMeetTogether: number;
    memberMeetTogetherOther: string;
    studentAreClosest: number;
    studentAreClosestOther: string;
    communityEnvironment: number;
    communityEnvironmentRisk: string;
    visitTraveledBy: number;
    visitTraveledByOther: string;
    residenceStatus: number;
    residenceStatusOther: string;
    natureOfAddress: number;
    comeToSchool: number;
    distanceHomeAndSchool: number;
    routeOfTravelToSchool: number;
    routeOfTravelToSchoolOther: string;
    roleInHome: number;
    roleInHomeOther: string;
    hobbies: number;
    hobbiesOther: string;
    readFrequency: number;
    schoolSupplieStorageFrequency: number;
    workBookCheckedFrequency: number;
    behaviorOfStudent: string;
    needsToBeImporoved: string;
    needToDevelop: string;
    punishAndReward: string;
    parentMakeFriend: string;
    plandToFuture: string;
    findOutInterest: string;
    isHelpStudentNeed: boolean;
    studyNeed: boolean;
    healthNeed: boolean;
    moneyNeed: boolean;
    speacialNeed: boolean;
    img1Id: string[];
    img2Id: string[];
    img3Id:string[];
    img4Id:string[];
    img5Id:string[];
    img5Value: string[];
    locationMap: string;

    studentFirstName:string;
    studentLastName:string;
    studentClass:string;
    parentFirstName:string;
    parentLastName:string;
    houseNumber:string;
    moo:string;
    soy:string;
    street:string;
    subDistrict:string;
    district:string;
    proVince:string;
    zipCode:string;
    studentTel:string;
    parentTel:string;
    adviserName:string;
} 
export class CreateStudentHomeVisitDto extends StudentHomeVisitDto{
 
}
export class UpdateStudentHomeVisitDto extends StudentHomeVisitDto{
}
