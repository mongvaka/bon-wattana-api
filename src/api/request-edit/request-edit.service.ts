import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateRequestEditDto, RequestEditDto, SearchRequestEditDto, UpdateRequestEditDto } from './request-edit.dto';
import { RequestEdit, VwRequestEditDropdown, VwRequestEditItem, VwRequestEditList } from './request-edit.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';

@Injectable()
export class RequestEditService extends BaseService {

    constructor(
        @InjectRepository(RequestEdit)
        private readonly requesteditRepository: Repository<RequestEdit>,
        @InjectRepository(VwRequestEditList)
        private readonly vwRequestEditRepository: Repository<VwRequestEditList>,
        @InjectRepository(VwRequestEditItem)
        private readonly itemRepository:Repository<VwRequestEditItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchRequestEditDto):Promise<SearchResult<VwRequestEditList>>{
        const builder = this.createQueryBuider<VwRequestEditList>(dto,this.vwRequestEditRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwRequestEditList>(dto.paginator,count,data);
    }
    async create(dto:CreateRequestEditDto,req:CustomRequest):Promise<RequestEdit>{        
        const en = this.toCreateModel(dto,req) as RequestEdit  
        return await this.requesteditRepository.save(
            this.requesteditRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateRequestEditDto,req:CustomRequest):Promise<RequestEditDto>{
        const m = await this.requesteditRepository.findOne({where:{id:id}})
        return await this.requesteditRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<RequestEditDto>{
        let m = await this.requesteditRepository.findOne({where:{id:id}})
        return await this.requesteditRepository.softRemove(
            await this.requesteditRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
