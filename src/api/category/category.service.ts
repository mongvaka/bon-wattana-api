import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto, CategoryDto, SearchCategoryDto, UpdateCategoryDto } from './category.dto';
import { Category, VwCategoryDropdown, VwCategoryItem, VwCategoryList } from './category.entity';

@Injectable()
export class CategoryService extends BaseService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(VwCategoryList)
        private readonly vwCategoryRepository: Repository<VwCategoryList>,
        @InjectRepository(VwCategoryItem)
        private readonly itemRepository:Repository<VwCategoryItem>,
        @InjectRepository(VwCategoryDropdown)
        private readonly vwDropdownCategoryRepository:Repository<VwCategoryDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async categoryDropdown(dto: SearchCategoryDto):Promise<SelectItems[]> {
        return await this.dropdownService.categoryDropdown(dto,this.vwDropdownCategoryRepository);
      }
    async list(dto:SearchCategoryDto):Promise<SearchResult<VwCategoryList>>{
        const builder = this.createQueryBuider<VwCategoryList>(dto,this.vwCategoryRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwCategoryList>(dto.paginator,count,data);
    }
    async create(dto:CreateCategoryDto,req:CustomRequest):Promise<Category>{        
        const en = this.toCreateModel(dto,req) as Category  
        return await this.categoryRepository.save(
            this.categoryRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateCategoryDto,req:CustomRequest):Promise<CategoryDto>{
        const m = await this.categoryRepository.findOne({where:{id:id}})
        return await this.categoryRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<CategoryDto>{
        let m = await this.categoryRepository.findOne({where:{id:id}})
        return await this.categoryRepository.softRemove(
            await this.categoryRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
