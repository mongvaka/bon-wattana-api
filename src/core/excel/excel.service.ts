import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { ModuleName } from '../shared/constans/enum-constans';
import { StudentService } from 'src/api/student/student.service';
import { ImportExcelDto } from './excel.dto';
import { AliveWith } from 'src/api/alive-with/alive-with.entity';
import { Classroom } from 'src/api/classroom/classroom.entity';
import { ClassroomType } from 'src/api/classroom-type/classroom-type.entity';
import { CountryService } from 'src/api/country/country.service';
import { DistrictService } from 'src/api/district/district.service';
import { EthnicityService } from 'src/api/ethnicity/ethnicity.service';
import { GendarService } from 'src/api/gendar/gendar.service';
import { NationalityService } from 'src/api/nationality/nationality.service';
import { ParentStatusService } from 'src/api/parent-status/parent-status.service';
import { ProvinceService } from 'src/api/province/province.service';
import { ReligionService } from 'src/api/religion/religion.service';
import { SubDistrictService } from 'src/api/sub-district/sub-district.service';
import { AliveWithService } from 'src/api/alive-with/alive-with.service';
import { ClassroomService } from 'src/api/classroom/classroom.service';
import { ClassroomTypeService } from 'src/api/classroom-type/classroom-type.service';
import * as Excel from 'exceljs';
import * as XLSX from "xlsx";

@Injectable()
export class ExcelService extends BaseService {
    constructor(
        private readonly studentService: StudentService,
        private readonly aliveWithService: AliveWithService,
        private readonly classroomService: ClassroomService,
        private readonly classroomTypeService: ClassroomTypeService,
        private readonly countryService: CountryService,
        private readonly districtService: DistrictService,
        private readonly ethnicityService: EthnicityService,
        private readonly gendarService: GendarService,
        private readonly nationalityService: NationalityService,
        private readonly parentStatusService: ParentStatusService,
        private readonly provinceService: ProvinceService,
        private readonly religionService: ReligionService,
        private readonly subDistrictService: SubDistrictService
        ){
        super()
    }
    async export(module:string):Promise<any> {
        switch(module){
            case ModuleName.STUDENT:
            return this.studentService.export()
            case ModuleName.ALIVE_WITH:
            return this.aliveWithService.export()
            case ModuleName.CLASSROOM:
            return this.classroomService.export()
            case ModuleName.CLASSROOM_TYPE:
            return this.classroomTypeService.export()
            case ModuleName.COUNTRY:
            return this.countryService.export()
            case ModuleName.DISTRICT:
            return this.districtService.export()
            case ModuleName.ETHNICITY:
            return this.ethnicityService.export()
            case ModuleName.GENDAR:
            return this.gendarService.export()
            case ModuleName.NATIONALITY:
            return this.nationalityService.export()
            case ModuleName.PARENT_STATUS:
            return this.parentStatusService.export()
            case ModuleName.PROVINCE:
            return this.provinceService.export()
            case ModuleName.RELIGION:
            return this.religionService.export()
            case ModuleName.SUB_DISTRICT:
            return this.subDistrictService.export()
            default :
            throw new BadRequestException('Module incorrect')
        }
    }
    async import(dto: ImportExcelDto):Promise<any> {
        const data = await this.getDataFromBase64(dto.base64.split(',')[1])
        switch(dto.moduleName){
            case ModuleName.STUDENT:
                return this.studentService.import(data)
            case ModuleName.ALIVE_WITH:
                return this.aliveWithService.import(data)
            case ModuleName.CLASSROOM:
                return this.classroomService.import(data)
            case ModuleName.CLASSROOM_TYPE:
                return this.classroomTypeService.import(data)
            case ModuleName.COUNTRY:
                return this.countryService.import(data)
            case ModuleName.DISTRICT:
                return this.districtService.import(data)
            case ModuleName.ETHNICITY:
                return this.ethnicityService.import(data)
            case ModuleName.GENDAR:
                return this.gendarService.import(data)
            case ModuleName.NATIONALITY:
                return this.nationalityService.import(data)
            case ModuleName.PARENT_STATUS:
                return this.parentStatusService.import(data)
            case ModuleName.PROVINCE:
                return this.provinceService.import(data)
            case ModuleName.RELIGION:
                return this.religionService.import(data)
            case ModuleName.SUB_DISTRICT:
                return this.subDistrictService.import(data)
            default :
                throw new BadRequestException('Module incorrect')
        }
    }
    async getDataFromBase64(base64: string):Promise<any[]> {        
        const workbook = XLSX.read(base64, {type:'base64'})
        let col:string[] =[] 
        let row:any[] =[]
        let masterKey:string[] = [] 
        let masterModel:{} = {}
        const cell = Object.keys(workbook.Sheets.sheet1)
        const modelList:{}[] =[]
        cell.forEach((el,index)=>{
            col = []
            if(index == 1){                
                masterKey =cell.filter(fl=>fl.indexOf(`${index}`)==1)
            }else if(index>1){                
                masterModel = {}
                const keyList = cell.filter(fl=>fl.indexOf(`${index}`)==1)
                let hasValue:boolean = false
                masterKey.forEach(ev=>{
                    let value = undefined
                    keyList.forEach(key=>{
                        if(key.charAt(0)==ev.charAt(0)){
                            value = workbook.Sheets.sheet1[key].v
                            hasValue = true
                        }
                    })                    
                    masterModel[workbook.Sheets.sheet1[ev].v] = value
                })
                if(hasValue){
                    modelList.push(masterModel)
                }
            }
        })
        return modelList
    }
}
