import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentSupportDto, StudentSupportDto, SearchStudentSupportDto, UpdateStudentSupportDto } from './student-support.dto';
import { StudentSupport, VwStudentSupportDropdown, VwStudentSupportItem, VwStudentSupportList } from './student-support.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';

@Injectable()
export class StudentSupportService extends BaseService {
    async import(data: any[]): Promise<any> {        
        const dataBulkInsert:StudentSupport[] = []
        data.forEach(el=>{
            const contain = dataBulkInsert.filter(fn=>fn.id == el.id)            
            if(contain.length==0){
                dataBulkInsert.push({...el})
            }
        })
        return this.studentsupportRepository.save(
            this.studentsupportRepository.create(dataBulkInsert)
        )
    }
    async export(dto:SearchExportExcelDto):Promise<any>{
        const builder = this.createQueryBuider<VwStudentSupportItem>(dto,this.itemRepository)
        const data = await builder
        .getMany();
        return exportExcel(data)
      }
    constructor(
        @InjectRepository(StudentSupport)
        private readonly studentsupportRepository: Repository<StudentSupport>,
        @InjectRepository(VwStudentSupportList)
        private readonly vwStudentSupportRepository: Repository<VwStudentSupportList>,
        @InjectRepository(VwStudentSupportItem)
        private readonly itemRepository:Repository<VwStudentSupportItem>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async list(dto:SearchStudentSupportDto):Promise<SearchResult<VwStudentSupportList>>{
        const builder = this.createQueryBuider<VwStudentSupportList>(dto,this.vwStudentSupportRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentSupportList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentSupportDto,req:CustomRequest):Promise<StudentSupport>{        
        const en = this.toCreateModel(dto,req) as StudentSupport  
        return await this.studentsupportRepository.save(
            this.studentsupportRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentSupportDto,req:CustomRequest):Promise<StudentSupportDto>{
        const m = await this.studentsupportRepository.findOne({where:{id:id}})
        return await this.studentsupportRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentSupportDto>{
        let m = await this.studentsupportRepository.findOne({where:{id:id}})
        return await this.studentsupportRepository.softRemove(
            await this.studentsupportRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
