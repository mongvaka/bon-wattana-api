import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentHelpDto, StudentHelpDto, SearchStudentHelpDto, UpdateStudentHelpDto } from './student-help.dto';
import { StudentHelp, VwStudentHelpDropdown, VwStudentHelpItem, VwStudentHelpList } from './student-help.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { YearTermService } from '../year-term/year-term.service';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';

@Injectable()
export class StudentHelpService extends BaseService {
    async import(data: any[]): Promise<any> {        
        const dataBulkInsert:StudentHelp[] = []
        data.forEach(el=>{
            const contain = dataBulkInsert.filter(fn=>fn.id == el.id)            
            if(contain.length==0){
                dataBulkInsert.push({...el})
            }
        })
        return this.studenthelpRepository.save(
            this.studenthelpRepository.create(dataBulkInsert)
        )
    }
    async export(dto:SearchExportExcelDto):Promise<any>{
        const builder = this.createQueryBuider<VwStudentHelpItem>(dto,this.itemRepository)
        const data = await builder
        .getMany();
        return exportExcel(data)
      }
    constructor(
        @InjectRepository(StudentHelp)
        private readonly studenthelpRepository: Repository<StudentHelp>,
        @InjectRepository(VwStudentHelpList)
        private readonly vwStudentHelpRepository: Repository<VwStudentHelpList>,
        @InjectRepository(VwStudentHelpItem)
        private readonly itemRepository:Repository<VwStudentHelpItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly yearTermService:YearTermService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchStudentHelpDto):Promise<SearchResult<VwStudentHelpList>>{
        const builder = this.createQueryBuider<VwStudentHelpList>(dto,this.vwStudentHelpRepository)
       // console.log(builder.getSql());
        
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentHelpList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentHelpDto,req:CustomRequest):Promise<StudentHelp>{        
        const currentYearTerm = await this.yearTermService.findCurrrentTerm()
        dto.yearTermId= currentYearTerm?.id
        const en = this.toCreateModel(dto,req) as StudentHelp  
        return await this.studenthelpRepository.save(
            this.studenthelpRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentHelpDto,req:CustomRequest):Promise<StudentHelpDto>{
        const currentTerm = await this.yearTermService.findCurrrentTerm()
        const m = await this.studenthelpRepository.findOne({where:{studentId:id,yearTermId:currentTerm?.id}})
        return await this.studenthelpRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentHelpDto>{
        let m = await this.studenthelpRepository.findOne({where:{id:id}})
        return await this.studenthelpRepository.softRemove(
            await this.studenthelpRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        const model = await this.itemRepository.findOne({where:{id:id}})
        if(model){
            return {...model,isUpdateMode:true}
        }
        return {
            studentId:id,
            isUpdateMode:false
        }
    }
}
