import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDepressionDto, DepressionDto, SearchDepressionDto, UpdateDepressionDto } from './depression.dto';
import { Depression, VwDepressionDropdown, VwDepressionItem, VwDepressionList } from './depression.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { SearchYearTermDto } from 'src/api/year-term/year-term.dto';

@Injectable()
export class DepressionService extends BaseService {

    constructor(
        @InjectRepository(Depression)
        private readonly depressionRepository: Repository<Depression>,
        @InjectRepository(VwDepressionList)
        private readonly vwDepressionRepository: Repository<VwDepressionList>,
        @InjectRepository(VwDepressionItem)
        private readonly itemRepository:Repository<VwDepressionItem>,
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
    async list(dto:SearchDepressionDto):Promise<SearchResult<VwDepressionList>>{
        const builder = this.createQueryBuider<VwDepressionList>(dto,this.vwDepressionRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDepressionList>(dto.paginator,count,data);
    }
    async create(dto:CreateDepressionDto,req:CustomRequest):Promise<Depression>{        
        const en = this.toCreateModel(dto,req) as Depression  
        return await this.depressionRepository.save(
            this.depressionRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDepressionDto,req:CustomRequest):Promise<DepressionDto>{
        const m = await this.depressionRepository.findOne({where:{id:id}})
        return await this.depressionRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DepressionDto>{
        let m = await this.depressionRepository.findOne({where:{id:id}})
        return await this.depressionRepository.softRemove(
            await this.depressionRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
