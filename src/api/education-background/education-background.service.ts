import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateEducationBackgroundDto, EducationBackgroundDto, SearchEducationBackgroundDto, UpdateEducationBackgroundDto } from './education-background.dto';
import { EducationBackground, VwEducationBackgroundDropdown, VwEducationBackgroundItem, VwEducationBackgroundList } from './education-background.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';

@Injectable()
export class EducationBackgroundService extends BaseService {
    async export(dto:SearchExportExcelDto):Promise<any>{
        const builder = this.createQueryBuider<VwEducationBackgroundItem>(dto,this.itemRepository)
        const data = await builder
        .getMany();
        return exportExcel(data)
      }
      async import(data: any[]): Promise<any> {        
        const dataBulkInsert:EducationBackground[] = []
        data.forEach(el=>{
            const contain = dataBulkInsert.filter(fn=>fn.id == el.id)            
            if(contain.length==0){
                dataBulkInsert.push({...el})
            }
        })
        return this.educationbackgroundRepository.save(
            this.educationbackgroundRepository.create(dataBulkInsert)
        )
    }
    constructor(
        @InjectRepository(EducationBackground)
        private readonly educationbackgroundRepository: Repository<EducationBackground>,
        @InjectRepository(VwEducationBackgroundList)
        private readonly vwEducationBackgroundRepository: Repository<VwEducationBackgroundList>,
        @InjectRepository(VwEducationBackgroundItem)
        private readonly itemRepository:Repository<VwEducationBackgroundItem>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async list(dto:SearchEducationBackgroundDto):Promise<SearchResult<VwEducationBackgroundList>>{
        const builder = this.createQueryBuider<VwEducationBackgroundList>(dto,this.vwEducationBackgroundRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwEducationBackgroundList>(dto.paginator,count,data);
    }
    async create(dto:CreateEducationBackgroundDto,req:CustomRequest):Promise<EducationBackground>{        
        const en = this.toCreateModel(dto,req) as EducationBackground  
        return this.educationbackgroundRepository.save(
            this.educationbackgroundRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateEducationBackgroundDto,req:CustomRequest):Promise<EducationBackgroundDto>{
        const m = await this.educationbackgroundRepository.findOne({where:{id:id}})
        return this.educationbackgroundRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<EducationBackgroundDto>{
        let m = await this.educationbackgroundRepository.findOne({where:{id:id}})
        return this.educationbackgroundRepository.softRemove(
            await this.educationbackgroundRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return this.itemRepository.findOne({where:{id:id}})
    }
}
