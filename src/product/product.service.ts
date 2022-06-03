import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/shared/models/request-model';
import { Paginator, SearchResult } from 'src/shared/models/search-param-model';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import {  CreateProductDto, ProductDto, SearchProductDto, UpdateProductDto } from './product.dto';
import {  Product, VwProductItem, VwProductList } from './product.entity';

@Injectable()
export class ProductService extends BaseService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(VwProductList)
        private readonly vwProductRepository: Repository<VwProductList>,
        @InjectRepository(VwProductItem)
        private readonly itemRepository:Repository<VwProductItem>,
        ){
        super()
    }
    async list(dto:SearchProductDto):Promise<SearchResult<VwProductList>>{
        const builder = this.createQueryBuider<VwProductList>(dto,this.vwProductRepository)
        const [data, count] = await builder
        .getManyAndCount();
        console.log('data',data);
        
        return this.toSearchResult<VwProductList>(dto.paginator,count,data);
    }
    async create(dto:CreateProductDto,req:CustomRequest):Promise<Product>{
        const en = this.toCreateModel(dto,req) as Product  
        return await this.productRepository.save(
            this.productRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateProductDto,req:CustomRequest):Promise<ProductDto>{
        const m = await this.productRepository.find({where:{productId:dto.productId}})
        const en = this.toUpdateModel(m,dto,req)
        return await this.productRepository.save(en);
    }
    async delete(id:number,req:CustomRequest):Promise<ProductDto>{
        let m = await this.productRepository.findOne({where:{productId:id}})
        const en = this.toDeleteModel(m,req)
        return await this.productRepository.softRemove(
            await this.productRepository.save(en)
        )
    }
    async item(id:number):Promise<ProductDto>{
        return await this.itemRepository.findOne({where:{productId:id}})
    }
}
