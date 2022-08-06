import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateScholarshipDto, ScholarshipDto, SearchScholarshipDto, UpdateScholarshipDto } from './scholarship.dto';
import { Scholarship, VwScholarshipDropdown, VwScholarshipItem, VwScholarshipList } from './scholarship.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';

@Injectable()
export class ScholarshipService extends BaseService {

    constructor(
        @InjectRepository(Scholarship)
        private readonly scholarshipRepository: Repository<Scholarship>,
        @InjectRepository(VwScholarshipList)
        private readonly vwScholarshipRepository: Repository<VwScholarshipList>,
        @InjectRepository(VwScholarshipItem)
        private readonly itemRepository:Repository<VwScholarshipItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchScholarshipDto):Promise<SearchResult<VwScholarshipList>>{
        const builder = this.createQueryBuider<VwScholarshipList>(dto,this.vwScholarshipRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwScholarshipList>(dto.paginator,count,data);
    }
    async create(dto:CreateScholarshipDto,req:CustomRequest):Promise<Scholarship>{        
        const en = this.toCreateModel(dto,req) as Scholarship  
        return await this.scholarshipRepository.save(
            this.scholarshipRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateScholarshipDto,req:CustomRequest):Promise<ScholarshipDto>{
        const m = await this.scholarshipRepository.findOne({where:{id:id}})
        return await this.scholarshipRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ScholarshipDto>{
        let m = await this.scholarshipRepository.findOne({where:{id:id}})
        return await this.scholarshipRepository.softRemove(
            await this.scholarshipRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
