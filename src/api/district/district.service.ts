import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDistrictDto, DistrictDto, SearchDistrictDto, UpdateDistrictDto } from './district.dto';
import { District, VwDistrictDropdown, VwDistrictItem, VwDistrictList } from './district.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';

@Injectable()
export class DistrictService extends BaseService {

    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,
        @InjectRepository(VwDistrictList)
        private readonly vwDistrictRepository: Repository<VwDistrictList>,
        @InjectRepository(VwDistrictItem)
        private readonly itemRepository:Repository<VwDistrictItem>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
        return await this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
      }
    async list(dto:SearchDistrictDto):Promise<SearchResult<VwDistrictList>>{
        const builder = this.createQueryBuider<VwDistrictList>(dto,this.vwDistrictRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDistrictList>(dto.paginator,count,data);
    }
    async create(dto:CreateDistrictDto,req:CustomRequest):Promise<District>{        
        const en = this.toCreateModel(dto,req) as District  
        return await this.districtRepository.save(
            this.districtRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDistrictDto,req:CustomRequest):Promise<DistrictDto>{
        const m = await this.districtRepository.findOne({where:{id:id}})
        return await this.districtRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DistrictDto>{
        let m = await this.districtRepository.findOne({where:{id:id}})
        return await this.districtRepository.softRemove(
            await this.districtRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
