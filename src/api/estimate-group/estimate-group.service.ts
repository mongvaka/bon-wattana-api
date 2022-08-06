import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateEstimateGroupDto, EstimateGroupDto, SearchEstimateGroupDto, UpdateEstimateGroupDto } from './estimate-group.dto';
import { EstimateGroup, VwEstimateGroupDropdown, VwEstimateGroupItem, VwEstimateGroupList } from './estimate-group.entity';

@Injectable()
export class EstimateGroupService extends BaseService {

    constructor(
        @InjectRepository(EstimateGroup)
        private readonly estimategroupRepository: Repository<EstimateGroup>,
        @InjectRepository(VwEstimateGroupList)
        private readonly vwEstimateGroupRepository: Repository<VwEstimateGroupList>,
        @InjectRepository(VwEstimateGroupItem)
        private readonly itemRepository:Repository<VwEstimateGroupItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchEstimateGroupDto):Promise<SearchResult<VwEstimateGroupList>>{
        const builder = this.createQueryBuider<VwEstimateGroupList>(dto,this.vwEstimateGroupRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwEstimateGroupList>(dto.paginator,count,data);
    }
    async create(dto:CreateEstimateGroupDto,req:CustomRequest):Promise<EstimateGroup>{        
        const en = this.toCreateModel(dto,req) as EstimateGroup  
        return await this.estimategroupRepository.save(
            this.estimategroupRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateEstimateGroupDto,req:CustomRequest):Promise<EstimateGroupDto>{
        const m = await this.estimategroupRepository.findOne({where:{id:id}})
        return await this.estimategroupRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<EstimateGroupDto>{
        let m = await this.estimategroupRepository.findOne({where:{id:id}})
        return await this.estimategroupRepository.softRemove(
            await this.estimategroupRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
