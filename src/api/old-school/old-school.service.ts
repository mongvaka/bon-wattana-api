import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateOldSchoolDto, OldSchoolDto, SearchOldSchoolDto, UpdateOldSchoolDto } from './old-school.dto';
import { OldSchool, VwOldSchoolDropdown, VwOldSchoolItem, VwOldSchoolList } from './old-school.entity';
import { VwAddressDropdown } from 'src/api/address/address.entity';
import { SearchAddressDto } from 'src/api/address/address.dto';

@Injectable()
export class OldSchoolService extends BaseService {

    constructor(
        @InjectRepository(OldSchool)
        private readonly oldschoolRepository: Repository<OldSchool>,
        @InjectRepository(VwOldSchoolList)
        private readonly vwOldSchoolRepository: Repository<VwOldSchoolList>,
        @InjectRepository(VwOldSchoolItem)
        private readonly itemRepository:Repository<VwOldSchoolItem>,
        @InjectRepository(VwAddressDropdown)
        private readonly vwDropdownAddressRepository:Repository<VwAddressDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async addressDropdown(dto: SearchAddressDto):Promise<SelectItems[]> {
        return await this.dropdownService.addressDropdown(dto,this.vwDropdownAddressRepository);
      }
    async list(dto:SearchOldSchoolDto):Promise<SearchResult<VwOldSchoolList>>{
        const builder = this.createQueryBuider<VwOldSchoolList>(dto,this.vwOldSchoolRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwOldSchoolList>(dto.paginator,count,data);
    }
    async create(dto:CreateOldSchoolDto,req:CustomRequest):Promise<OldSchool>{        
        const en = this.toCreateModel(dto,req) as OldSchool  
        return await this.oldschoolRepository.save(
            this.oldschoolRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateOldSchoolDto,req:CustomRequest):Promise<OldSchoolDto>{
        const m = await this.oldschoolRepository.findOne({where:{id:id}})
        return await this.oldschoolRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<OldSchoolDto>{
        let m = await this.oldschoolRepository.findOne({where:{id:id}})
        return await this.oldschoolRepository.softRemove(
            await this.oldschoolRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
