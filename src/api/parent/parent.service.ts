import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateParentDto, ParentDto, SearchParentDto, UpdateParentDto } from './parent.dto';
import { Parent, VwParentDropdown, VwParentItem, VwParentList } from './parent.entity';

@Injectable()
export class ParentService extends BaseService {

    constructor(
        @InjectRepository(Parent)
        private readonly parentRepository: Repository<Parent>,
        @InjectRepository(VwParentList)
        private readonly vwParentRepository: Repository<VwParentList>,
        @InjectRepository(VwParentItem)
        private readonly itemRepository:Repository<VwParentItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchParentDto):Promise<SearchResult<VwParentList>>{
        const builder = this.createQueryBuider<VwParentList>(dto,this.vwParentRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwParentList>(dto.paginator,count,data);
    }
    async create(dto:CreateParentDto,req:CustomRequest):Promise<Parent>{        
        const en = this.toCreateModel(dto,req) as Parent  
        return await this.parentRepository.save(
            this.parentRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateParentDto,req:CustomRequest):Promise<ParentDto>{
        const m = await this.parentRepository.findOne({where:{id:id}})
        return await this.parentRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ParentDto>{
        let m = await this.parentRepository.findOne({where:{id:id}})
        return await this.parentRepository.softRemove(
            await this.parentRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
