import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateProductDetailDto, ProductDetailDto, SearchProductDetailDto, UpdateProductDetailDto } from './product-detail.dto';
import { ProductDetail, VwProductDetailDropdown, VwProductDetailItem, VwProductDetailList } from './product-detail.entity';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { SearchProductDto } from 'src/api/product/product.dto';

@Injectable()
export class ProductDetailService extends BaseService {

    constructor(
        @InjectRepository(ProductDetail)
        private readonly productdetailRepository: Repository<ProductDetail>,
        @InjectRepository(VwProductDetailList)
        private readonly vwProductDetailRepository: Repository<VwProductDetailList>,
        @InjectRepository(VwProductDetailItem)
        private readonly itemRepository:Repository<VwProductDetailItem>,
        @InjectRepository(VwProductDropdown)
        private readonly vwDropdownProductRepository:Repository<VwProductDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async productDropdown(dto: SearchProductDto):Promise<SelectItems[]> {
        return await this.dropdownService.productDropdown(dto,this.vwDropdownProductRepository);
      }
    async list(dto:SearchProductDetailDto):Promise<SearchResult<VwProductDetailList>>{
        const builder = this.createQueryBuider<VwProductDetailList>(dto,this.vwProductDetailRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwProductDetailList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductDetailDto,req:CustomRequest):Promise<ProductDetail>{        
        const en = this.toCreateModel(dto,req) as ProductDetail  
        return await this.productdetailRepository.save(
            this.productdetailRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductDetailDto,req:CustomRequest):Promise<ProductDetailDto>{
        const m = await this.productdetailRepository.findOne({where:{id:id}})
        return await this.productdetailRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ProductDetailDto>{
        let m = await this.productdetailRepository.findOne({where:{id:id}})
        return await this.productdetailRepository.softRemove(
            await this.productdetailRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
