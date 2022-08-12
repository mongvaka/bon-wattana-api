import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDeliveryTrackingDto, DeliveryTrackingDto, SearchDeliveryTrackingDto, UpdateDeliveryTrackingDto } from './delivery-tracking.dto';
import { DeliveryTracking, VwDeliveryTrackingDropdown, VwDeliveryTrackingItem, VwDeliveryTrackingList } from './delivery-tracking.entity';
import { VwDeliveryDropdown } from 'src/api/delivery/delivery.entity';
import { SearchDeliveryDto } from 'src/api/delivery/delivery.dto';

@Injectable()
export class DeliveryTrackingService extends BaseService {

    constructor(
        @InjectRepository(DeliveryTracking)
        private readonly deliverytrackingRepository: Repository<DeliveryTracking>,
        @InjectRepository(VwDeliveryTrackingList)
        private readonly vwDeliveryTrackingRepository: Repository<VwDeliveryTrackingList>,
        @InjectRepository(VwDeliveryTrackingItem)
        private readonly itemRepository:Repository<VwDeliveryTrackingItem>,
        @InjectRepository(VwDeliveryDropdown)
        private readonly vwDropdownDeliveryRepository:Repository<VwDeliveryDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async deliveryDropdown(dto: SearchDeliveryDto):Promise<SelectItems[]> {
        return await this.dropdownService.deliveryDropdown(dto,this.vwDropdownDeliveryRepository);
      }
    async list(dto:SearchDeliveryTrackingDto):Promise<SearchResult<VwDeliveryTrackingList>>{
        const builder = this.createQueryBuider<VwDeliveryTrackingList>(dto,this.vwDeliveryTrackingRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDeliveryTrackingList>(dto.paginator,count,data);
    }
    async create(dto:CreateDeliveryTrackingDto,req:CustomRequest):Promise<DeliveryTracking>{        
        const en = this.toCreateModel(dto,req) as DeliveryTracking  
        return await this.deliverytrackingRepository.save(
            this.deliverytrackingRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDeliveryTrackingDto,req:CustomRequest):Promise<DeliveryTrackingDto>{
        const m = await this.deliverytrackingRepository.findOne({where:{id:id}})
        return await this.deliverytrackingRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DeliveryTrackingDto>{
        let m = await this.deliverytrackingRepository.findOne({where:{id:id}})
        return await this.deliverytrackingRepository.softRemove(
            await this.deliverytrackingRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
