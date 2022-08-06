import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateUniversityDto, UniversityDto, SearchUniversityDto, UpdateUniversityDto } from './university.dto';
import { University, VwUniversityDropdown, VwUniversityItem, VwUniversityList } from './university.entity';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';

@Injectable()
export class UniversityService extends BaseService {

    constructor(
        @InjectRepository(University)
        private readonly universityRepository: Repository<University>,
        @InjectRepository(VwUniversityList)
        private readonly vwUniversityRepository: Repository<VwUniversityList>,
        @InjectRepository(VwUniversityItem)
        private readonly itemRepository:Repository<VwUniversityItem>,
        @InjectRepository(VwCountryDropdown)
        private readonly vwDropdownCountryRepository:Repository<VwCountryDropdown>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        @InjectRepository(VwSubDistrictDropdown)
        private readonly vwDropdownSubDistrictRepository:Repository<VwSubDistrictDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async countryDropdown(dto: SearchCountryDto):Promise<SelectItems[]> {
        return await this.dropdownService.countryDropdown(dto,this.vwDropdownCountryRepository);
      }
    async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
        return await this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
      }
    async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
      }
    async subDistrictDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.subDistrictDropdown(dto,this.vwDropdownSubDistrictRepository);
      }
    async list(dto:SearchUniversityDto):Promise<SearchResult<VwUniversityList>>{
        const builder = this.createQueryBuider<VwUniversityList>(dto,this.vwUniversityRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwUniversityList>(dto.paginator,count,data);
    }
    async create(dto:CreateUniversityDto,req:CustomRequest):Promise<University>{        
        const en = this.toCreateModel(dto,req) as University  
        return await this.universityRepository.save(
            this.universityRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateUniversityDto,req:CustomRequest):Promise<UniversityDto>{
        const m = await this.universityRepository.findOne({where:{id:id}})
        return await this.universityRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<UniversityDto>{
        let m = await this.universityRepository.findOne({where:{id:id}})
        return await this.universityRepository.softRemove(
            await this.universityRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
