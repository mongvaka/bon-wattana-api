import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateBmiHistoryDto, BmiHistoryDto, SearchBmiHistoryDto, UpdateBmiHistoryDto } from './bmi-history.dto';
import { BmiHistory, VwBmiHistoryDropdown, VwBmiHistoryItem, VwBmiHistoryList } from './bmi-history.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';

@Injectable()
export class BmiHistoryService extends BaseService {

    constructor(
        @InjectRepository(BmiHistory)
        private readonly bmihistoryRepository: Repository<BmiHistory>,
        @InjectRepository(VwBmiHistoryList)
        private readonly vwBmiHistoryRepository: Repository<VwBmiHistoryList>,
        @InjectRepository(VwBmiHistoryItem)
        private readonly itemRepository:Repository<VwBmiHistoryItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchBmiHistoryDto):Promise<SearchResult<VwBmiHistoryList>>{
        const builder = this.createQueryBuider<VwBmiHistoryList>(dto,this.vwBmiHistoryRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwBmiHistoryList>(dto.paginator,count,data);
    }
    async create(dto:CreateBmiHistoryDto,req:CustomRequest):Promise<BmiHistory>{        
        const en = this.toCreateModel(dto,req) as BmiHistory  
        return await this.bmihistoryRepository.save(
            this.bmihistoryRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateBmiHistoryDto,req:CustomRequest):Promise<BmiHistoryDto>{
        const m = await this.bmihistoryRepository.findOne({where:{id:id}})
        return await this.bmihistoryRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<BmiHistoryDto>{
        let m = await this.bmihistoryRepository.findOne({where:{id:id}})
        return await this.bmihistoryRepository.softRemove(
            await this.bmihistoryRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
