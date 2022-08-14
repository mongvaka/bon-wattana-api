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
    data = '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'
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
        this.getDataFromBase64(this.data)
    }
    async export(module:string):Promise<any> {
        console.log(module);
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
        console.log(data);
        console.log('modulename',dto.moduleName);
        
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
        const cell = Object.keys(workbook.Sheets.sheet1)
        cell.forEach((el,index)=>{
            col = []
            const keyList = cell.filter(fl=>fl.indexOf(`${index}`)==1)
            keyList.forEach(it=>{
                col.push(workbook.Sheets.sheet1[it].v)
            })
            if(col.length!=0){
                row.push(col)
            }
        })
        const keyModel = row[0]
        const dataList:{}[] =[]
        row.forEach((rw,first)=>{
            if(first!=0){
                const model:{} ={}
                rw.forEach((rw2,index)=>{
                    model[keyModel[index]] = rw2
                })
                dataList.push(model)
            }
        })
        return dataList
    }
}
