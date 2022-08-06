import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateEstimateTempDto, EstimateTempDto, SearchEstimateTempDto, UpdateEstimateTempDto } from './estimate-temp.dto';
import { EstimateTemp, VwEstimateTempDropdown, VwEstimateTempItem, VwEstimateTempList } from './estimate-temp.entity';
import { VwEstimateGroupDropdown } from 'src/api/estimate-group/estimate-group.entity';
import { SearchEstimateGroupDto } from 'src/api/estimate-group/estimate-group.dto';

@Injectable()
export class EstimateTempService extends BaseService {

    constructor(
        @InjectRepository(EstimateTemp)
        private readonly estimatetempRepository: Repository<EstimateTemp>,
        @InjectRepository(VwEstimateTempList)
        private readonly vwEstimateTempRepository: Repository<VwEstimateTempList>,
        @InjectRepository(VwEstimateTempItem)
        private readonly itemRepository:Repository<VwEstimateTempItem>,
        @InjectRepository(VwEstimateGroupDropdown)
        private readonly vwDropdownEstimateGroupRepository:Repository<VwEstimateGroupDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async estimateGroupDropdown(dto: SearchEstimateGroupDto):Promise<SelectItems[]> {
        return await this.dropdownService.estimateGroupDropdown(dto,this.vwDropdownEstimateGroupRepository);
      }
    async list(dto:SearchEstimateTempDto):Promise<SearchResult<VwEstimateTempList>>{
        const builder = this.createQueryBuider<VwEstimateTempList>(dto,this.vwEstimateTempRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwEstimateTempList>(dto.paginator,count,data);
    }
    async create(dto:CreateEstimateTempDto,req:CustomRequest):Promise<EstimateTemp>{        
        const en = this.toCreateModel(dto,req) as EstimateTemp  
        return await this.estimatetempRepository.save(
            this.estimatetempRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateEstimateTempDto,req:CustomRequest):Promise<EstimateTempDto>{
        const m = await this.estimatetempRepository.findOne({where:{id:id}})
        return await this.estimatetempRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<EstimateTempDto>{
        let m = await this.estimatetempRepository.findOne({where:{id:id}})
        return await this.estimatetempRepository.softRemove(
            await this.estimatetempRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
