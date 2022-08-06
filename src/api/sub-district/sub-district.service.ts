import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateSubDistrictDto, SubDistrictDto, SearchSubDistrictDto, UpdateSubDistrictDto } from './sub-district.dto';
import { SubDistrict, VwSubDistrictDropdown, VwSubDistrictItem, VwSubDistrictList } from './sub-district.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';

@Injectable()
export class SubDistrictService extends BaseService {

    constructor(
        @InjectRepository(SubDistrict)
        private readonly subdistrictRepository: Repository<SubDistrict>,
        @InjectRepository(VwSubDistrictList)
        private readonly vwSubDistrictRepository: Repository<VwSubDistrictList>,
        @InjectRepository(VwSubDistrictItem)
        private readonly itemRepository:Repository<VwSubDistrictItem>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
      }
    async list(dto:SearchSubDistrictDto):Promise<SearchResult<VwSubDistrictList>>{
        const builder = this.createQueryBuider<VwSubDistrictList>(dto,this.vwSubDistrictRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwSubDistrictList>(dto.paginator,count,data);
    }
    async create(dto:CreateSubDistrictDto,req:CustomRequest):Promise<SubDistrict>{        
        const en = this.toCreateModel(dto,req) as SubDistrict  
        return await this.subdistrictRepository.save(
            this.subdistrictRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateSubDistrictDto,req:CustomRequest):Promise<SubDistrictDto>{
        const m = await this.subdistrictRepository.findOne({where:{id:id}})
        return await this.subdistrictRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<SubDistrictDto>{
        let m = await this.subdistrictRepository.findOne({where:{id:id}})
        return await this.subdistrictRepository.softRemove(
            await this.subdistrictRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
