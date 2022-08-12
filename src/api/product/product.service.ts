import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateProductDto, ProductDto, SearchProductDto, UpdateProductDto } from './product.dto';
import { Product, VwProductDropdown, VwProductItem, VwProductList } from './product.entity';

@Injectable()
export class ProductService extends BaseService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(VwProductList)
        private readonly vwProductRepository: Repository<VwProductList>,
        @InjectRepository(VwProductItem)
        private readonly itemRepository:Repository<VwProductItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchProductDto):Promise<SearchResult<VwProductList>>{
        const builder = this.createQueryBuider<VwProductList>(dto,this.vwProductRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwProductList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductDto,req:CustomRequest):Promise<Product>{        
        const en = this.toCreateModel(dto,req) as Product  
        return await this.productRepository.save(
            this.productRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductDto,req:CustomRequest):Promise<ProductDto>{
        const m = await this.productRepository.findOne({where:{id:id}})
        return await this.productRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ProductDto>{
        let m = await this.productRepository.findOne({where:{id:id}})
        return await this.productRepository.softRemove(
            await this.productRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
