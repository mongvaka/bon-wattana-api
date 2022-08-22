
import { Injectable } from "@nestjs/common";
import { VwActiveTimeDropdown } from "src/api/active-time/active-time.entity";
import { VwAliveWithDropdown } from "src/api/alive-with/alive-with.entity";
import { VwClassroomTypeDropdown } from "src/api/classroom-type/classroom-type.entity";
import { VwClassroomDropdown } from "src/api/classroom/classroom.entity";
import { VwCountryDropdown } from "src/api/country/country.entity";
import { VwDistrictDropdown } from "src/api/district/district.entity";
import { VwEditFieldDropdown } from "src/api/edit-field/edit-field.entity";
import { VwEditRequestDropdown } from "src/api/edit-request/edit-request.entity";
import { VwEthnicityDropdown } from "src/api/ethnicity/ethnicity.entity";
import { VwGendarDropdown } from "src/api/gendar/gendar.entity";
import { VwNationalityDropdown } from "src/api/nationality/nationality.entity";
import { VwParentStatusDropdown } from "src/api/parent-status/parent-status.entity";
import { VwProvinceDropdown } from "src/api/province/province.entity";
import { VwReligionDropdown } from "src/api/religion/religion.entity";
import { VwStudentDropdown } from "src/api/student/student.entity";
import { VwSubDistrictDropdown } from "src/api/sub-district/sub-district.entity";
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
    async editRequestDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
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
        const buider = this.createQueryBuider(dto,repository)
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
        const buider = this.createQueryBuider(dto,repository)
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
        const buider = this.createQueryBuiderDropdown(dto,repository)
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

}