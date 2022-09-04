import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateTeacherWorkDto, TeacherWorkDto, SearchTeacherWorkDto, UpdateTeacherWorkDto } from './teacher-work.dto';
import { TeacherWork, VwTeacherWorkDropdown, VwTeacherWorkItem, VwTeacherWorkList } from './teacher-work.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';

@Injectable()
export class TeacherWorkService extends BaseService {
    async export(dto:SearchExportExcelDto):Promise<any>{
        const builder = this.createQueryBuider<VwTeacherWorkItem>(dto,this.itemRepository)
        const data = await builder
        .getMany();
        return exportExcel(data)
      }
      async import(data: any[]): Promise<any> {        
        const dataBulkInsert:TeacherWork[] = []
        data.forEach(el=>{
            const contain = dataBulkInsert.filter(fn=>fn.id == el.id)            
            if(contain.length==0){
                dataBulkInsert.push({...el})
            }
        })
        return await this.teacherworkRepository.save(
            this.teacherworkRepository.create(dataBulkInsert)
        )
    }
    constructor(
        @InjectRepository(TeacherWork)
        private readonly teacherworkRepository: Repository<TeacherWork>,
        @InjectRepository(VwTeacherWorkList)
        private readonly vwTeacherWorkRepository: Repository<VwTeacherWorkList>,
        @InjectRepository(VwTeacherWorkItem)
        private readonly itemRepository:Repository<VwTeacherWorkItem>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async list(dto:SearchTeacherWorkDto):Promise<SearchResult<VwTeacherWorkList>>{
        const builder = this.createQueryBuider<VwTeacherWorkList>(dto,this.vwTeacherWorkRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwTeacherWorkList>(dto.paginator,count,data);
    }
    async create(dto:CreateTeacherWorkDto,req:CustomRequest):Promise<TeacherWork>{        
        const en = this.toCreateModel(dto,req) as TeacherWork  
        return await this.teacherworkRepository.save(
            this.teacherworkRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateTeacherWorkDto,req:CustomRequest):Promise<TeacherWorkDto>{
        const m = await this.teacherworkRepository.findOne({where:{id:id}})
        return await this.teacherworkRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<TeacherWorkDto>{
        let m = await this.teacherworkRepository.findOne({where:{id:id}})
        return await this.teacherworkRepository.softRemove(
            await this.teacherworkRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
