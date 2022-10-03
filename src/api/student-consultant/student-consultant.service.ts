import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentConsultantDto, StudentConsultantDto, SearchStudentConsultantDto, UpdateStudentConsultantDto } from './student-consultant.dto';
import { StudentConsultant, VwStudentConsultantDropdown, VwStudentConsultantItem, VwStudentConsultantList } from './student-consultant.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';

@Injectable()
export class StudentConsultantService extends BaseService {
    async import(data: any[]): Promise<any> {        
        const dataBulkInsert:StudentConsultant[] = []
        data.forEach(el=>{
            const contain = dataBulkInsert.filter(fn=>fn.id == el.id)            
            if(contain.length==0){
                dataBulkInsert.push({...el})
            }
        })
        return this.studentconsultantRepository.save(
            this.studentconsultantRepository.create(dataBulkInsert)
        )
    }
    async export(dto:SearchExportExcelDto):Promise<any>{
        const builder = this.createQueryBuider<VwStudentConsultantItem>(dto,this.itemRepository)
        const data = await builder
        .getMany();
        return exportExcel(data)
      }
    constructor(
        @InjectRepository(StudentConsultant)
        private readonly studentconsultantRepository: Repository<StudentConsultant>,
        @InjectRepository(VwStudentConsultantList)
        private readonly vwStudentConsultantRepository: Repository<VwStudentConsultantList>,
        @InjectRepository(VwStudentConsultantItem)
        private readonly itemRepository:Repository<VwStudentConsultantItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async list(dto:SearchStudentConsultantDto):Promise<SearchResult<VwStudentConsultantList>>{
        const builder = this.createQueryBuider<VwStudentConsultantList>(dto,this.vwStudentConsultantRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentConsultantList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentConsultantDto,req:CustomRequest):Promise<StudentConsultant>{        
        const en = this.toCreateModel(dto,req) as StudentConsultant  
        return await this.studentconsultantRepository.save(
            this.studentconsultantRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentConsultantDto,req:CustomRequest):Promise<StudentConsultantDto>{
        const m = await this.studentconsultantRepository.findOne({where:{id:id}})
        return await this.studentconsultantRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentConsultantDto>{
        let m = await this.studentconsultantRepository.findOne({where:{id:id}})
        return await this.studentconsultantRepository.softRemove(
            await this.studentconsultantRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
