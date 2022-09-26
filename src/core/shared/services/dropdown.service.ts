
import { Injectable } from "@nestjs/common";
import { VwActiveTimeDropdown } from "src/api/active-time/active-time.entity";
import { VwPracticleDropdown } from "src/api/practicle/practicle.entity";
import { VwActivityStudentDropdown } from "src/api/activity-student/activity-student.entity";
import { VwAliveWithDropdown } from "src/api/alive-with/alive-with.entity";
import { VwClassroomTypeDropdown } from "src/api/classroom-type/classroom-type.entity";
import { VwClassroomDropdown } from "src/api/classroom/classroom.entity";
import { VwCountryDropdown } from "src/api/country/country.entity";
import { VwCurriculumDropdown } from "src/api/curriculum/curriculum.entity";
import { VwDistrictDropdown } from "src/api/district/district.entity";
import { VwEditFieldDropdown } from "src/api/edit-field/edit-field.entity";
import { VwEditRequestDropdown } from "src/api/edit-request/edit-request.entity";
import { VwEducationBackgroundDropdown } from "src/api/education-background/education-background.entity";
import { VwEthnicityDropdown } from "src/api/ethnicity/ethnicity.entity";
import { VwGendarDropdown } from "src/api/gendar/gendar.entity";
import { VwNationalityDropdown } from "src/api/nationality/nationality.entity";
import { VwParentStatusDropdown } from "src/api/parent-status/parent-status.entity";
import { VwPractitionerLevelDropdown } from "src/api/practitioner-level/practitioner-level.entity";
import { VwProvinceDropdown } from "src/api/province/province.entity";
import { VwReligionDropdown } from "src/api/religion/religion.entity";
import { VwStudentDropdown } from "src/api/student/student.entity";
import { VwSubDistrictDropdown } from "src/api/sub-district/sub-district.entity";
import { VwTeacherWorkDropdown } from "src/api/teacher-work/teacher-work.entity";
import { VwTeacherDropdown } from "src/api/teacher/teacher.entity";
import { VwTeachersDevelopDropdown } from "src/api/teachers-develop/teachers-develop.entity";
import { VwStudentHomeVisitDropdown } from "src/api/student-home-visit/student-home-visit.entity";
import { VwDemoDropdown } from "src/core/demo/demo.entity";
import { Repository } from "typeorm";
import { SearchParameter, SelectItems } from "../models/search-param-model";
import { BaseService } from "./base.service";
import { VwSdqTableDropdown } from "src/api/sdq-table/sdq-table.entity";
import { VwYearTermDropdown } from "src/api/year-term/year-term.entity";
import { VwCheckStudentDropdown } from "src/api/check-student/check-student.entity";
import { VwDepressionDropdown } from "src/api/depression/depression.entity";
import { VwEmotionalQuotientDropdown } from "src/api/emotional-quotient/emotional-quotient.entity";
import { VwStressDropdown } from "src/api/stress/stress.entity";
import { VwTeachingScheduleDropdown } from "src/api/teaching-schedule/teaching-schedule.entity";

@Injectable()
export class DropdownService extends BaseService{
    constructor(
    ){
        super()
    }
    async stressDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwStressDropdown = el as unknown as VwStressDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async emotionalquotientDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEmotionalQuotientDropdown = el as unknown as VwEmotionalQuotientDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async checkstudentDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{   
        dto.tableKey = 'check_student'     
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCheckStudentDropdown = el as unknown as VwCheckStudentDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async depressionDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDepressionDropdown = el as unknown as VwDepressionDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async yeartermDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{ 
        dto.tableKey = 'practicle'       
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwYearTermDropdown = el as unknown as VwYearTermDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async practicleDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{    
        dto.tableKey = 'practicle'    
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwPracticleDropdown = el as unknown as VwPracticleDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async teachersdevelopDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{  
        dto.tableKey = 'teachers_develop'        
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwTeachersDevelopDropdown = el as unknown as VwTeachersDevelopDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async teacherworkDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{   
        dto.tableKey = 'teacher_work'           
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwTeacherWorkDropdown = el as unknown as VwTeacherWorkDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async teacherDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{  
        dto.tableKey = 'teacher'            
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwTeacherDropdown = el as unknown as VwTeacherDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async practitionerlevelDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{ 
        dto.tableKey = 'practitioner_level'             
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwPractitionerLevelDropdown = el as unknown as VwPractitionerLevelDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async educationbackgroundDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{ 
        dto.tableKey = 'education_background'             
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEducationBackgroundDropdown = el as unknown as VwEducationBackgroundDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async curriculumDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{     
        dto.tableKey = 'curriculum'         
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCurriculumDropdown = el as unknown as VwCurriculumDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async activitystudentDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{    
        dto.tableKey = 'activity_student'          
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwActivityStudentDropdown = el as unknown as VwActivityStudentDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async editRequestDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{   
        dto.tableKey = 'edit_request'           
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEditRequestDropdown = el as unknown as VwEditRequestDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async editFieldDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{    
        dto.tableKey = 'edit_field'          
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEditFieldDropdown = el as unknown as VwEditFieldDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async activeTimeDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        dto.tableKey = 'active_time'      
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwActiveTimeDropdown = el as unknown as VwActiveTimeDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async demoDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{     
        dto.tableKey = 'demo'         
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDemoDropdown = el as unknown as VwDemoDropdown
            const dropdownModel:SelectItems ={
                label:model.demoEmail,
                value:model.id,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
  
    async countryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{  
        dto.tableKey = 'country'            
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCountryDropdown = el as unknown as VwCountryDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
  
    async districtDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{       
        dto.tableKey = 'district'       
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDistrictDropdown = el as unknown as VwDistrictDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
  
    async provinceDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{    
        dto.tableKey = 'province'          
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProvinceDropdown = el as unknown as VwProvinceDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
      async subDistrictDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{    
        dto.tableKey = 'sub_district'          
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwSubDistrictDropdown = el as unknown as VwSubDistrictDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async aliveWithDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        dto.tableKey = 'alive_with'      
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwAliveWithDropdown = el as unknown as VwAliveWithDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async classroomDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{   
        dto.tableKey = 'classroom'           
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwClassroomDropdown = el as unknown as VwClassroomDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async classroomTypeDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        dto.tableKey = 'classroom_type'      
        const buider = this.createQueryBuiderDropdown(dto,repository)

        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwClassroomTypeDropdown = el as unknown as VwClassroomTypeDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async gendarDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{       
        dto.tableKey = 'gendar'       
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwGendarDropdown = el as unknown as VwGendarDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async studentDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{      
        dto.tableKey = 'student'        
        const buider = this.createQueryBuiderDropdown(dto,repository)
       // console.log(buider.getSql());
        
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwStudentDropdown = el as unknown as VwStudentDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async parentStatusDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{     
        dto.tableKey = 'parent_status'         
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwParentStatusDropdown = el as unknown as VwParentStatusDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async ethnicityDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        dto.tableKey = 'ethnicity'      
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEthnicityDropdown = el as unknown as VwEthnicityDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async nationalityDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{       
        dto.tableKey = 'nationality'       
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwNationalityDropdown = el as unknown as VwNationalityDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async religionDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        dto.tableKey = 'religion'      
        const buider = this.createQueryBuiderDropdown(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwReligionDropdown = el as unknown as VwReligionDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async studenthomevisitDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwStudentHomeVisitDropdown = el as unknown as VwStudentHomeVisitDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async sdqtableDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwSdqTableDropdown = el as unknown as VwSdqTableDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async teachingscheduleDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwTeachingScheduleDropdown = el as unknown as VwTeachingScheduleDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }


}