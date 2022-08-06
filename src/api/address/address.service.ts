import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateAddressDto, AddressDto, SearchAddressDto, UpdateAddressDto } from './address.dto';
import { Address, VwAddressDropdown, VwAddressItem, VwAddressList } from './address.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';

@Injectable()
export class AddressService extends BaseService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(VwAddressList)
        private readonly vwAddressRepository: Repository<VwAddressList>,
        @InjectRepository(VwAddressItem)
        private readonly itemRepository:Repository<VwAddressItem>,
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
    async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
        return await this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
      }
    async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
      }
    async subDistrictDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.subDistrictDropdown(dto,this.vwDropdownSubDistrictRepository);
      }
    async list(dto:SearchAddressDto):Promise<SearchResult<VwAddressList>>{
        const builder = this.createQueryBuider<VwAddressList>(dto,this.vwAddressRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwAddressList>(dto.paginator,count,data);
    }
    async create(dto:CreateAddressDto,req:CustomRequest):Promise<Address>{        
        const en = this.toCreateModel(dto,req) as Address  
        return await this.addressRepository.save(
            this.addressRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateAddressDto,req:CustomRequest):Promise<AddressDto>{
        const m = await this.addressRepository.findOne({where:{id:id}})
        return await this.addressRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<AddressDto>{
        let m = await this.addressRepository.findOne({where:{id:id}})
        return await this.addressRepository.softRemove(
            await this.addressRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
