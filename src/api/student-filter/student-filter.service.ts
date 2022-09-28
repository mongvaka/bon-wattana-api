import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentFilterDto, StudentFilterDto, SearchStudentFilterDto, UpdateStudentFilterDto } from './student-filter.dto';
import { StudentFilter, VwStudentFilterDropdown, VwStudentFilterItem, VwStudentFilterList } from './student-filter.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { SearchYearTermDto } from 'src/api/year-term/year-term.dto';

@Injectable()
export class StudentFilterService extends BaseService {

    constructor(
        @InjectRepository(StudentFilter)
        private readonly studentfilterRepository: Repository<StudentFilter>,
        @InjectRepository(VwStudentFilterList)
        private readonly vwStudentFilterRepository: Repository<VwStudentFilterList>,
        @InjectRepository(VwStudentFilterItem)
        private readonly itemRepository:Repository<VwStudentFilterItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwYearTermDropdown)
        private readonly vwDropdownYearTermRepository:Repository<VwYearTermDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async yearTermDropdown(dto: SearchYearTermDto):Promise<SelectItems[]> {
        return await this.dropdownService.yeartermDropdown(dto,this.vwDropdownYearTermRepository);
      }
    async list(dto:SearchStudentFilterDto):Promise<SearchResult<VwStudentFilterList>>{
        const builder = this.createQueryBuider<VwStudentFilterList>(dto,this.vwStudentFilterRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentFilterList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentFilterDto,req:CustomRequest):Promise<StudentFilter>{        
        const en = this.toCreateModel(dto,req) as StudentFilter  
        return await this.studentfilterRepository.save(
            this.studentfilterRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentFilterDto,req:CustomRequest):Promise<StudentFilterDto>{
        const m = await this.studentfilterRepository.findOne({where:{id:id}})
        return await this.studentfilterRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentFilterDto>{
        let m = await this.studentfilterRepository.findOne({where:{id:id}})
        return await this.studentfilterRepository.softRemove(
            await this.studentfilterRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
