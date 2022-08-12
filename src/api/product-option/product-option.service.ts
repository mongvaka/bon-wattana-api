import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateProductOptionDto, ProductOptionDto, SearchProductOptionDto, UpdateProductOptionDto } from './product-option.dto';
import { ProductOption, VwProductOptionDropdown, VwProductOptionItem, VwProductOptionList } from './product-option.entity';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { SearchProductDto } from 'src/api/product/product.dto';

@Injectable()
export class ProductOptionService extends BaseService {

    constructor(
        @InjectRepository(ProductOption)
        private readonly productoptionRepository: Repository<ProductOption>,
        @InjectRepository(VwProductOptionList)
        private readonly vwProductOptionRepository: Repository<VwProductOptionList>,
        @InjectRepository(VwProductOptionItem)
        private readonly itemRepository:Repository<VwProductOptionItem>,
        @InjectRepository(VwProductDropdown)
        private readonly vwDropdownProductRepository:Repository<VwProductDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async productDropdown(dto: SearchProductDto):Promise<SelectItems[]> {
        return await this.dropdownService.productDropdown(dto,this.vwDropdownProductRepository);
      }
    async list(dto:SearchProductOptionDto):Promise<SearchResult<VwProductOptionList>>{
        const builder = this.createQueryBuider<VwProductOptionList>(dto,this.vwProductOptionRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwProductOptionList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductOptionDto,req:CustomRequest):Promise<ProductOption>{        
        const en = this.toCreateModel(dto,req) as ProductOption  
        return await this.productoptionRepository.save(
            this.productoptionRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductOptionDto,req:CustomRequest):Promise<ProductOptionDto>{
        const m = await this.productoptionRepository.findOne({where:{id:id}})
        return await this.productoptionRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ProductOptionDto>{
        let m = await this.productoptionRepository.findOne({where:{id:id}})
        return await this.productoptionRepository.softRemove(
            await this.productoptionRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
