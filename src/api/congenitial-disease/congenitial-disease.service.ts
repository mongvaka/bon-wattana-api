import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateCongenitialDiseaseDto, CongenitialDiseaseDto, SearchCongenitialDiseaseDto, UpdateCongenitialDiseaseDto } from './congenitial-disease.dto';
import { CongenitialDisease, VwCongenitialDiseaseDropdown, VwCongenitialDiseaseItem, VwCongenitialDiseaseList } from './congenitial-disease.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';

@Injectable()
export class CongenitialDiseaseService extends BaseService {

    constructor(
        @InjectRepository(CongenitialDisease)
        private readonly congenitialdiseaseRepository: Repository<CongenitialDisease>,
        @InjectRepository(VwCongenitialDiseaseList)
        private readonly vwCongenitialDiseaseRepository: Repository<VwCongenitialDiseaseList>,
        @InjectRepository(VwCongenitialDiseaseItem)
        private readonly itemRepository:Repository<VwCongenitialDiseaseItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchCongenitialDiseaseDto):Promise<SearchResult<VwCongenitialDiseaseList>>{
        const builder = this.createQueryBuider<VwCongenitialDiseaseList>(dto,this.vwCongenitialDiseaseRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwCongenitialDiseaseList>(dto.paginator,count,data);
    }
    async create(dto:CreateCongenitialDiseaseDto,req:CustomRequest):Promise<CongenitialDisease>{        
        const en = this.toCreateModel(dto,req) as CongenitialDisease  
        return await this.congenitialdiseaseRepository.save(
            this.congenitialdiseaseRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateCongenitialDiseaseDto,req:CustomRequest):Promise<CongenitialDiseaseDto>{
        const m = await this.congenitialdiseaseRepository.findOne({where:{id:id}})
        return await this.congenitialdiseaseRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<CongenitialDiseaseDto>{
        let m = await this.congenitialdiseaseRepository.findOne({where:{id:id}})
        return await this.congenitialdiseaseRepository.softRemove(
            await this.congenitialdiseaseRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
