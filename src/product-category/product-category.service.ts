import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/shared/models/request-model';
import { Paginator, SearchResult } from 'src/shared/models/search-param-model';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import {  CreateProductCategoryDto, ProductCategoryDto, SearchProductCategoryDto, UpdateProductCategoryDto } from './product-category.dto';
import {  ProductCategory, VwProductCategoryItem, VwProductCategoryList } from './product-category.entity';

@Injectable()
export class ProductCategoryService extends BaseService {
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
        @InjectRepository(VwProductCategoryList)
        private readonly vwProductCategoryRepository: Repository<VwProductCategoryList>,
        @InjectRepository(VwProductCategoryItem)
        private readonly itemRepository:Repository<VwProductCategoryItem>,
        ){
        super()
    }
    async list(dto:SearchProductCategoryDto):Promise<SearchResult<VwProductCategoryList>>{
        const builder = this.createQueryBuider<VwProductCategoryList>(dto,this.vwProductCategoryRepository)
        const [data, count] = await builder
        .getManyAndCount();
        console.log('data',data);
        
        return this.toSearchResult<VwProductCategoryList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductCategoryDto,req:CustomRequest):Promise<ProductCategory>{
        const en = this.toCreateModel(dto,req) as ProductCategory  
        return await this.productCategoryRepository.save(
            this.productCategoryRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductCategoryDto,req:CustomRequest):Promise<ProductCategoryDto>{
        const m = await this.productCategoryRepository.find({where:{productCategoryId:dto.productCategoryId}})
        const en = this.toUpdateModel(m,dto,req)
        return await this.productCategoryRepository.save(en);
    }
    async delete(id:number,req:CustomRequest):Promise<ProductCategoryDto>{
        let m = await this.productCategoryRepository.findOne({where:{productCategoryId:id}})
        const en = this.toDeleteModel(m,req)
        return await this.productCategoryRepository.softRemove(
            await this.productCategoryRepository.save(en)
        )
    }
    async item(id:number):Promise<ProductCategoryDto>{
        return await this.itemRepository.findOne({where:{productCategoryId:id}})
    }
}
