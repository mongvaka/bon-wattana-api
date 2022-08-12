import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDeliveryDto, DeliveryDto, SearchDeliveryDto, UpdateDeliveryDto } from './delivery.dto';
import { Delivery, VwDeliveryDropdown, VwDeliveryItem, VwDeliveryList } from './delivery.entity';

import { VwOrderHeaderDropdown } from 'src/api/order-header/order-header.entity';
import { SearchOrderHeaderDto } from 'src/api/order-header/order-header.dto';
import { VwUserDropdown } from 'src/core/users/users.entity';
import { SearchUserDto } from 'src/core/users/users.dto';

@Injectable()
export class DeliveryService extends BaseService {

    constructor(
        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,
        @InjectRepository(VwDeliveryList)
        private readonly vwDeliveryRepository: Repository<VwDeliveryList>,
        @InjectRepository(VwDeliveryItem)
        private readonly itemRepository:Repository<VwDeliveryItem>,
        @InjectRepository(VwUserDropdown)
        private readonly vwDropdownUserRepository:Repository<VwUserDropdown>,
        @InjectRepository(VwOrderHeaderDropdown)
        private readonly vwDropdownOrderHeaderRepository:Repository<VwOrderHeaderDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async userDropdown(dto: SearchUserDto):Promise<SelectItems[]> {
        return await this.dropdownService.userDropdown(dto,this.vwDropdownUserRepository);
      }
    async orderHeaderDropdown(dto: SearchOrderHeaderDto):Promise<SelectItems[]> {
        return await this.dropdownService.orderHeaderDropdown(dto,this.vwDropdownOrderHeaderRepository);
      }
    async list(dto:SearchDeliveryDto):Promise<SearchResult<VwDeliveryList>>{
        const builder = this.createQueryBuider<VwDeliveryList>(dto,this.vwDeliveryRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDeliveryList>(dto.paginator,count,data);
    }
    async create(dto:CreateDeliveryDto,req:CustomRequest):Promise<Delivery>{        
        const en = this.toCreateModel(dto,req) as Delivery  
        return await this.deliveryRepository.save(
            this.deliveryRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDeliveryDto,req:CustomRequest):Promise<DeliveryDto>{
        const m = await this.deliveryRepository.findOne({where:{id:id}})
        return await this.deliveryRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DeliveryDto>{
        let m = await this.deliveryRepository.findOne({where:{id:id}})
        return await this.deliveryRepository.softRemove(
            await this.deliveryRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
