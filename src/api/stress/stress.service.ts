import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStressDto, StressDto, SearchStressDto, UpdateStressDto } from './stress.dto';
import { Stress, VwStressDropdown, VwStressItem, VwStressList } from './stress.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { SearchYearTermDto } from 'src/api/year-term/year-term.dto';

@Injectable()
export class StressService extends BaseService {

    constructor(
        @InjectRepository(Stress)
        private readonly stressRepository: Repository<Stress>,
        @InjectRepository(VwStressList)
        private readonly vwStressRepository: Repository<VwStressList>,
        @InjectRepository(VwStressItem)
        private readonly itemRepository:Repository<VwStressItem>,
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
    async list(dto:SearchStressDto):Promise<SearchResult<VwStressList>>{
        const builder = this.createQueryBuider<VwStressList>(dto,this.vwStressRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStressList>(dto.paginator,count,data);
    }
    async create(dto:CreateStressDto,req:CustomRequest):Promise<Stress>{        
        const en = this.toCreateModel(dto,req) as Stress  
        return await this.stressRepository.save(
            this.stressRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStressDto,req:CustomRequest):Promise<StressDto>{
        const m = await this.stressRepository.findOne({where:{id:id}})
        return await this.stressRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StressDto>{
        let m = await this.stressRepository.findOne({where:{id:id}})
        return await this.stressRepository.softRemove(
            await this.stressRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
