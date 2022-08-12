import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { SearchUserDto } from 'src/core/users/users.dto';
import { VwUserDropdown } from 'src/core/users/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderHeaderDto, OrderHeaderDto, SearchOrderHeaderDto, UpdateOrderHeaderDto } from './order-header.dto';
import { OrderHeader, VwOrderHeaderDropdown, VwOrderHeaderItem, VwOrderHeaderList } from './order-header.entity';


@Injectable()
export class OrderHeaderService extends BaseService {

    constructor(
        @InjectRepository(OrderHeader)
        private readonly orderheaderRepository: Repository<OrderHeader>,
        @InjectRepository(VwOrderHeaderList)
        private readonly vwOrderHeaderRepository: Repository<VwOrderHeaderList>,
        @InjectRepository(VwOrderHeaderItem)
        private readonly itemRepository:Repository<VwOrderHeaderItem>,
        @InjectRepository(VwUserDropdown)
        private readonly vwDropdownUserRepository:Repository<VwUserDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async userDropdown(dto: SearchUserDto):Promise<SelectItems[]> {
        return await this.dropdownService.userDropdown(dto,this.vwDropdownUserRepository);
      }
    async list(dto:SearchOrderHeaderDto):Promise<SearchResult<VwOrderHeaderList>>{
        const builder = this.createQueryBuider<VwOrderHeaderList>(dto,this.vwOrderHeaderRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwOrderHeaderList>(dto.paginator,count,data);
    }
    async create(dto:CreateOrderHeaderDto,req:CustomRequest):Promise<OrderHeader>{        
        const en = this.toCreateModel(dto,req) as OrderHeader  
        return await this.orderheaderRepository.save(
            this.orderheaderRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateOrderHeaderDto,req:CustomRequest):Promise<OrderHeaderDto>{
        const m = await this.orderheaderRepository.findOne({where:{id:id}})
        return await this.orderheaderRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<OrderHeaderDto>{
        let m = await this.orderheaderRepository.findOne({where:{id:id}})
        return await this.orderheaderRepository.softRemove(
            await this.orderheaderRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
