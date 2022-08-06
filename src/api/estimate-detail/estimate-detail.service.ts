import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateEstimateDetailDto, EstimateDetailDto, SearchEstimateDetailDto, UpdateEstimateDetailDto } from './estimate-detail.dto';
import { EstimateDetail, VwEstimateDetailDropdown, VwEstimateDetailItem, VwEstimateDetailList } from './estimate-detail.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwEstimateTempDropdown } from 'src/api/estimate-temp/estimate-temp.entity';
import { SearchEstimateTempDto } from 'src/api/estimate-temp/estimate-temp.dto';

@Injectable()
export class EstimateDetailService extends BaseService {

    constructor(
        @InjectRepository(EstimateDetail)
        private readonly estimatedetailRepository: Repository<EstimateDetail>,
        @InjectRepository(VwEstimateDetailList)
        private readonly vwEstimateDetailRepository: Repository<VwEstimateDetailList>,
        @InjectRepository(VwEstimateDetailItem)
        private readonly itemRepository:Repository<VwEstimateDetailItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwEstimateTempDropdown)
        private readonly vwDropdownEstimateTempRepository:Repository<VwEstimateTempDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async estimateTempDropdown(dto: SearchEstimateTempDto):Promise<SelectItems[]> {
        return await this.dropdownService.estimateTempDropdown(dto,this.vwDropdownEstimateTempRepository);
      }
    async list(dto:SearchEstimateDetailDto):Promise<SearchResult<VwEstimateDetailList>>{
        const builder = this.createQueryBuider<VwEstimateDetailList>(dto,this.vwEstimateDetailRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwEstimateDetailList>(dto.paginator,count,data);
    }
    async create(dto:CreateEstimateDetailDto,req:CustomRequest):Promise<EstimateDetail>{        
        const en = this.toCreateModel(dto,req) as EstimateDetail  
        return await this.estimatedetailRepository.save(
            this.estimatedetailRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateEstimateDetailDto,req:CustomRequest):Promise<EstimateDetailDto>{
        const m = await this.estimatedetailRepository.findOne({where:{id:id}})
        return await this.estimatedetailRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<EstimateDetailDto>{
        let m = await this.estimatedetailRepository.findOne({where:{id:id}})
        return await this.estimatedetailRepository.softRemove(
            await this.estimatedetailRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
