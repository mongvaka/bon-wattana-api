import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateHomeVisitDto, HomeVisitDto, SearchHomeVisitDto, UpdateHomeVisitDto } from './home-visit.dto';
import { HomeVisit, VwHomeVisitDropdown, VwHomeVisitItem, VwHomeVisitList } from './home-visit.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwCongenitialDiseaseDropdown } from 'src/api/congenitial-disease/congenitial-disease.entity';
import { SearchCongenitialDiseaseDto } from 'src/api/congenitial-disease/congenitial-disease.dto';

@Injectable()
export class HomeVisitService extends BaseService {

    constructor(
        @InjectRepository(HomeVisit)
        private readonly homevisitRepository: Repository<HomeVisit>,
        @InjectRepository(VwHomeVisitList)
        private readonly vwHomeVisitRepository: Repository<VwHomeVisitList>,
        @InjectRepository(VwHomeVisitItem)
        private readonly itemRepository:Repository<VwHomeVisitItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwCongenitialDiseaseDropdown)
        private readonly vwDropdownCongenitialDiseaseRepository:Repository<VwCongenitialDiseaseDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async congenitialDiseaseDropdown(dto: SearchCongenitialDiseaseDto):Promise<SelectItems[]> {
        return await this.dropdownService.congenitialDiseaseDropdown(dto,this.vwDropdownCongenitialDiseaseRepository);
      }
    async list(dto:SearchHomeVisitDto):Promise<SearchResult<VwHomeVisitList>>{
        const builder = this.createQueryBuider<VwHomeVisitList>(dto,this.vwHomeVisitRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwHomeVisitList>(dto.paginator,count,data);
    }
    async create(dto:CreateHomeVisitDto,req:CustomRequest):Promise<HomeVisit>{        
        const en = this.toCreateModel(dto,req) as HomeVisit  
        return await this.homevisitRepository.save(
            this.homevisitRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateHomeVisitDto,req:CustomRequest):Promise<HomeVisitDto>{
        const m = await this.homevisitRepository.findOne({where:{id:id}})
        return await this.homevisitRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<HomeVisitDto>{
        let m = await this.homevisitRepository.findOne({where:{id:id}})
        return await this.homevisitRepository.softRemove(
            await this.homevisitRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
