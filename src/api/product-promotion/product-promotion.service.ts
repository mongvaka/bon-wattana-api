import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateProductPromotionDto, ProductPromotionDto, SearchProductPromotionDto, UpdateProductPromotionDto } from './product-promotion.dto';
import { ProductPromotion, VwProductPromotionDropdown, VwProductPromotionItem, VwProductPromotionList } from './product-promotion.entity';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { SearchProductDto } from 'src/api/product/product.dto';

@Injectable()
export class ProductPromotionService extends BaseService {

    constructor(
        @InjectRepository(ProductPromotion)
        private readonly productpromotionRepository: Repository<ProductPromotion>,
        @InjectRepository(VwProductPromotionList)
        private readonly vwProductPromotionRepository: Repository<VwProductPromotionList>,
        @InjectRepository(VwProductPromotionItem)
        private readonly itemRepository:Repository<VwProductPromotionItem>,
        @InjectRepository(VwProductDropdown)
        private readonly vwDropdownProductRepository:Repository<VwProductDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async productDropdown(dto: SearchProductDto):Promise<SelectItems[]> {
        return await this.dropdownService.productDropdown(dto,this.vwDropdownProductRepository);
      }
    async list(dto:SearchProductPromotionDto):Promise<SearchResult<VwProductPromotionList>>{
        const builder = this.createQueryBuider<VwProductPromotionList>(dto,this.vwProductPromotionRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwProductPromotionList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductPromotionDto,req:CustomRequest):Promise<ProductPromotion>{        
        const en = this.toCreateModel(dto,req) as ProductPromotion  
        return await this.productpromotionRepository.save(
            this.productpromotionRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductPromotionDto,req:CustomRequest):Promise<ProductPromotionDto>{
        const m = await this.productpromotionRepository.findOne({where:{id:id}})
        return await this.productpromotionRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ProductPromotionDto>{
        let m = await this.productpromotionRepository.findOne({where:{id:id}})
        return await this.productpromotionRepository.softRemove(
            await this.productpromotionRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
