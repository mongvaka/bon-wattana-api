import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/shared/models/request-model';
import { Paginator, SearchResult } from 'src/shared/models/search-param-model';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateDemoDto, DeleteDemoDto, DemoDto, SearchDemoDto, UpdateDemoDto } from './demo.dto';
import { Demo, VwDemoItem, VwDemoList } from './demo.entity';

@Injectable()
export class DemoService extends BaseService {
    constructor(
        @InjectRepository(Demo)
        private readonly demoRepository: Repository<Demo>,
        @InjectRepository(VwDemoList)
        private readonly vwDemoRepository: Repository<VwDemoList>,
        @InjectRepository(VwDemoItem)
        private readonly itemRepository:Repository<VwDemoItem>,
        ){
        super()
    }
    async list(dto:SearchDemoDto):Promise<SearchResult<VwDemoList>>{
        // const filterCondition = this.getSearchCondition(dto.searchCondition);        
        const builder = this.createQueryBuider<VwDemoList>(dto,this.vwDemoRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDemoList>(dto.paginator,count,data);
    }
    async create(dto:CreateDemoDto,req:CustomRequest):Promise<Demo>{
        const en = this.toCreateModel(dto,req) as Demo  
        return await this.demoRepository.save(
            this.demoRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDemoDto,req:CustomRequest):Promise<DemoDto>{
        const m = await this.demoRepository.find({where:{id:dto.id}})
        const en = this.toUpdateModel(m,dto,req)
        return await this.demoRepository.save(en);
    }
    async delete(id:number,req:CustomRequest):Promise<DemoDto>{
        let m = await this.demoRepository.findOne({where:{id:id}})
        const en = this.toDeleteModel(m,req)
        return await this.demoRepository.softRemove(
            await this.demoRepository.save(en)
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
