import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/shared/models/request-model';
import { Paginator, SearchResult, SelectItems } from 'src/shared/models/search-param-model';
import { BaseService } from 'src/shared/services/base.service';
import { DropdownService } from 'src/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDemoDto, DeleteDemoDto, DemoDto, SearchDemoDto, UpdateDemoDto } from './demo.dto';
import { Demo, VwDemoDropdown, VwDemoItem, VwDemoList } from './demo.entity';

@Injectable()
export class DemoService extends BaseService {

    constructor(
        @InjectRepository(Demo)
        private readonly demoRepository: Repository<Demo>,
        @InjectRepository(VwDemoList)
        private readonly vwDemoRepository: Repository<VwDemoList>,
        @InjectRepository(VwDemoItem)
        private readonly itemRepository:Repository<VwDemoItem>,
        @InjectRepository(VwDemoDropdown)
        private readonly vwDropdownDemoRepository:Repository<VwDemoDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async demoDropdown(dto: SearchDemoDto):Promise<SelectItems[]> {
        return await this.dropdownService.demoDropdown(dto,this.vwDropdownDemoRepository);
      }
    async list(dto:SearchDemoDto):Promise<SearchResult<VwDemoList>>{
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
        return await this.demoRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DemoDto>{
        let m = await this.demoRepository.findOne({where:{id:id}})
        return await this.demoRepository.softRemove(
            await this.demoRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
