import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto, OrderDetailDto, SearchOrderDetailDto, UpdateOrderDetailDto } from './order-detail.dto';
import { OrderDetail, VwOrderDetailDropdown, VwOrderDetailItem, VwOrderDetailList } from './order-detail.entity';
import { VwOrderHeaderDropdown } from 'src/api/order-header/order-header.entity';
import { SearchOrderHeaderDto } from 'src/api/order-header/order-header.dto';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { SearchProductDto } from 'src/api/product/product.dto';
import { VwProductOptionDropdown } from 'src/api/product-option/product-option.entity';
import { SearchProductOptionDto } from 'src/api/product-option/product-option.dto';

@Injectable()
export class OrderDetailService extends BaseService {

    constructor(
        @InjectRepository(OrderDetail)
        private readonly orderdetailRepository: Repository<OrderDetail>,
        @InjectRepository(VwOrderDetailList)
        private readonly vwOrderDetailRepository: Repository<VwOrderDetailList>,
        @InjectRepository(VwOrderDetailItem)
        private readonly itemRepository:Repository<VwOrderDetailItem>,
        @InjectRepository(VwOrderHeaderDropdown)
        private readonly vwDropdownOrderHeaderRepository:Repository<VwOrderHeaderDropdown>,
        @InjectRepository(VwProductDropdown)
        private readonly vwDropdownProductRepository:Repository<VwProductDropdown>,
        @InjectRepository(VwProductOptionDropdown)
        private readonly vwDropdownProductOptionRepository:Repository<VwProductOptionDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async orderHeaderDropdown(dto: SearchOrderHeaderDto):Promise<SelectItems[]> {
        return await this.dropdownService.orderHeaderDropdown(dto,this.vwDropdownOrderHeaderRepository);
      }
    async productDropdown(dto: SearchProductDto):Promise<SelectItems[]> {
        return await this.dropdownService.productDropdown(dto,this.vwDropdownProductRepository);
      }
    async productOptionDropdown(dto: SearchProductOptionDto):Promise<SelectItems[]> {
        return await this.dropdownService.productOptionDropdown(dto,this.vwDropdownProductOptionRepository);
      }
    async list(dto:SearchOrderDetailDto):Promise<SearchResult<VwOrderDetailList>>{
        const builder = this.createQueryBuider<VwOrderDetailList>(dto,this.vwOrderDetailRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwOrderDetailList>(dto.paginator,count,data);
    }
    async create(dto:CreateOrderDetailDto,req:CustomRequest):Promise<OrderDetail>{        
        const en = this.toCreateModel(dto,req) as OrderDetail  
        return await this.orderdetailRepository.save(
            this.orderdetailRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateOrderDetailDto,req:CustomRequest):Promise<OrderDetailDto>{
        const m = await this.orderdetailRepository.findOne({where:{id:id}})
        return await this.orderdetailRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<OrderDetailDto>{
        let m = await this.orderdetailRepository.findOne({where:{id:id}})
        return await this.orderdetailRepository.softRemove(
            await this.orderdetailRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
