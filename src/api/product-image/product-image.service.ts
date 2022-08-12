import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateProductImageDto, ProductImageDto, SearchProductImageDto, UpdateProductImageDto } from './product-image.dto';
import { ProductImage, VwProductImageDropdown, VwProductImageItem, VwProductImageList } from './product-image.entity';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { SearchProductDto } from 'src/api/product/product.dto';

@Injectable()
export class ProductImageService extends BaseService {

    constructor(
        @InjectRepository(ProductImage)
        private readonly productimageRepository: Repository<ProductImage>,
        @InjectRepository(VwProductImageList)
        private readonly vwProductImageRepository: Repository<VwProductImageList>,
        @InjectRepository(VwProductImageItem)
        private readonly itemRepository:Repository<VwProductImageItem>,
        @InjectRepository(VwProductDropdown)
        private readonly vwDropdownProductRepository:Repository<VwProductDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async productDropdown(dto: SearchProductDto):Promise<SelectItems[]> {
        return await this.dropdownService.productDropdown(dto,this.vwDropdownProductRepository);
      }
    async list(dto:SearchProductImageDto):Promise<SearchResult<VwProductImageList>>{
        const builder = this.createQueryBuider<VwProductImageList>(dto,this.vwProductImageRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwProductImageList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductImageDto,req:CustomRequest):Promise<ProductImage>{        
        const en = this.toCreateModel(dto,req) as ProductImage  
        return await this.productimageRepository.save(
            this.productimageRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductImageDto,req:CustomRequest):Promise<ProductImageDto>{
        const m = await this.productimageRepository.findOne({where:{id:id}})
        return await this.productimageRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ProductImageDto>{
        let m = await this.productimageRepository.findOne({where:{id:id}})
        return await this.productimageRepository.softRemove(
            await this.productimageRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
