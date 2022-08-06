import { Inject, Injectable, MethodNotAllowedException } from "@nestjs/common";
import { VwAddressDropdown } from "src/api/address/address.entity";
import { VwBmiHistoryDropdown } from "src/api/bmi-history/bmi-history.entity";
import { VwCongenitialDiseaseDropdown } from "src/api/congenitial-disease/congenitial-disease.entity";
import { VwCountryDropdown } from "src/api/country/country.entity";
import { VwDegreeDropdown } from "src/api/degree/degree.entity";
import { VwDistrictDropdown } from "src/api/district/district.entity";
import { VwEstimateDetailDropdown } from "src/api/estimate-detail/estimate-detail.entity";
import { VwEstimateGroupDropdown } from "src/api/estimate-group/estimate-group.entity";
import { VwEstimateTempDropdown } from "src/api/estimate-temp/estimate-temp.entity";
import { VwHomeVisitDropdown } from "src/api/home-visit/home-visit.entity";
import { VwHopitalDropdown } from "src/api/hopital/hopital.entity";
import { VwOldSchoolDropdown } from "src/api/old-school/old-school.entity";
import { VwParentDropdown } from "src/api/parent/parent.entity";
import { VwProvinceDropdown } from "src/api/province/province.entity";
import { VwRequestEditDropdown } from "src/api/request-edit/request-edit.entity";
import { VwScholarshipDropdown } from "src/api/scholarship/scholarship.entity";
import { VwStudentSiblingDropdown } from "src/api/student-sibling/student-sibling.entity";
import { VwStudentDropdown } from "src/api/student/student.entity";
import { VwSubDistrictDropdown } from "src/api/sub-district/sub-district.entity";
import { VwTeachScheduleDropdown } from "src/api/teach-schedule/teach-schedule.entity";
import { VwTeacherDropdown } from "src/api/teacher/teacher.entity";
import { VwUniversityDropdown } from "src/api/university/university.entity";
import { VwDemoDropdown } from "src/core/demo/demo.entity";
import { Repository } from "typeorm";
import { SearchParameter, SelectItems } from "../models/search-param-model";
import { BaseService } from "./base.service";

@Injectable()
export class DropdownService extends BaseService{
    constructor(
    ){
        super()
    }
    async demoDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
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
    async bmiHistoryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwBmiHistoryDropdown = el as unknown as VwBmiHistoryDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async addressDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwAddressDropdown = el as unknown as VwAddressDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async congenitialDiseaseDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCongenitialDiseaseDropdown = el as unknown as VwCongenitialDiseaseDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async countryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
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
    async courseDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        throw new MethodNotAllowedException()
    }
    async degreeDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDegreeDropdown = el as unknown as VwDegreeDropdown
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
        const buider = this.createQueryBuider(dto,repository)
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
    async estimateDetailDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEstimateDetailDropdown = el as unknown as VwEstimateDetailDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async estimateGroupDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEstimateGroupDropdown = el as unknown as VwEstimateGroupDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async estimateTempDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwEstimateTempDropdown = el as unknown as VwEstimateTempDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async homevisitDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwHomeVisitDropdown = el as unknown as VwHomeVisitDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async hopitalDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwHopitalDropdown = el as unknown as VwHopitalDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async oldSchoolDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwOldSchoolDropdown = el as unknown as VwOldSchoolDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async parentDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwParentDropdown = el as unknown as VwParentDropdown
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
        const buider = this.createQueryBuider(dto,repository)
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
    async requestEditDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwRequestEditDropdown = el as unknown as VwRequestEditDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async scholarshipDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwScholarshipDropdown = el as unknown as VwScholarshipDropdown
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
        const buider = this.createQueryBuider(dto,repository)
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
    async studentSiblingDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwStudentSiblingDropdown = el as unknown as VwStudentSiblingDropdown
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
        const buider = this.createQueryBuider(dto,repository)
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
    async teachScheduleDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwTeachScheduleDropdown = el as unknown as VwTeachScheduleDropdown
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
        const buider = this.createQueryBuider(dto,repository)
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
    async universityDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwUniversityDropdown = el as unknown as VwUniversityDropdown
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