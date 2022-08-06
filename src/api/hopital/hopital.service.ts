import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateHopitalDto, HopitalDto, SearchHopitalDto, UpdateHopitalDto } from './hopital.dto';
import { Hopital, VwHopitalDropdown, VwHopitalItem, VwHopitalList } from './hopital.entity';
import { VwAddressDropdown } from 'src/api/address/address.entity';
import { SearchAddressDto } from 'src/api/address/address.dto';

@Injectable()
export class HopitalService extends BaseService {

    constructor(
        @InjectRepository(Hopital)
        private readonly hopitalRepository: Repository<Hopital>,
        @InjectRepository(VwHopitalList)
        private readonly vwHopitalRepository: Repository<VwHopitalList>,
        @InjectRepository(VwHopitalItem)
        private readonly itemRepository:Repository<VwHopitalItem>,
        @InjectRepository(VwAddressDropdown)
        private readonly vwDropdownAddressRepository:Repository<VwAddressDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async addressDropdown(dto: SearchAddressDto):Promise<SelectItems[]> {
        return await this.dropdownService.addressDropdown(dto,this.vwDropdownAddressRepository);
      }
    async list(dto:SearchHopitalDto):Promise<SearchResult<VwHopitalList>>{
        const builder = this.createQueryBuider<VwHopitalList>(dto,this.vwHopitalRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwHopitalList>(dto.paginator,count,data);
    }
    async create(dto:CreateHopitalDto,req:CustomRequest):Promise<Hopital>{        
        const en = this.toCreateModel(dto,req) as Hopital  
        return await this.hopitalRepository.save(
            this.hopitalRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateHopitalDto,req:CustomRequest):Promise<HopitalDto>{
        const m = await this.hopitalRepository.findOne({where:{id:id}})
        return await this.hopitalRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<HopitalDto>{
        let m = await this.hopitalRepository.findOne({where:{id:id}})
        return await this.hopitalRepository.softRemove(
            await this.hopitalRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
