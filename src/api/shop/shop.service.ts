import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateShopDto, ShopDto, SearchShopDto, UpdateShopDto } from './shop.dto';
import { Shop, VwShopDropdown, VwShopItem, VwShopList } from './shop.entity';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';

@Injectable()
export class ShopService extends BaseService {

    constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(VwShopList)
        private readonly vwShopRepository: Repository<VwShopList>,
        @InjectRepository(VwShopItem)
        private readonly itemRepository:Repository<VwShopItem>,
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
    async list(dto:SearchShopDto):Promise<SearchResult<VwShopList>>{
        const builder = this.createQueryBuider<VwShopList>(dto,this.vwShopRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwShopList>(dto.paginator,count,data);
    }
    async create(dto:CreateShopDto,req:CustomRequest):Promise<Shop>{        
        const en = this.toCreateModel(dto,req) as Shop  
        return await this.shopRepository.save(
            this.shopRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateShopDto,req:CustomRequest):Promise<ShopDto>{
        const m = await this.shopRepository.findOne({where:{id:id}})
        return await this.shopRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ShopDto>{
        let m = await this.shopRepository.findOne({where:{id:id}})
        return await this.shopRepository.softRemove(
            await this.shopRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
