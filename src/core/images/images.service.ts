import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { Repository } from 'typeorm';
import { Operators } from '../shared/constans/constanst';
import { ColumnType } from '../shared/constans/enum-system';
import { CreateImagesDto, SearchImagesDto, UpdateImagesDto } from './images.dto';
import { Images } from './images.entity';
@Injectable()
export class ImagesService extends BaseService {
    constructor(
        @InjectRepository(Images)
        private readonly repository: Repository<Images>,
        ){
        super()
    }
    async list(id:number):Promise<SearchResult<Images>>{
        const searchDto = new SearchImagesDto()
        searchDto.refTable = 'images'
        searchDto.tableKey = 'images'
        searchDto.searchCondition = [{
            columnName:'refId',
            tableName:'images',
            feildName:'refId',
            value:`${id}`,
            inputType:ColumnType.INT,
            equalityOperator: Operators.EQUAL,
            operator:Operators.EQUAL
        }]
        const builder = this.createQueryBuider<Images>(searchDto,this.repository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<Images>(searchDto.paginator,count,data);
    }
    async create(dto:CreateImagesDto,req:CustomRequest):Promise<Images>{        
        const en = this.toCreateModel(dto,req) as Images  
        return this.repository.save(
            this.repository.create(en)
        );
    }
    async update(id:number,dto:UpdateImagesDto,req:CustomRequest):Promise<Images>{
        const m = await this.repository.find({where:{id:id}})
        return this.repository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<Images>{
        let m = await this.repository.findOne({where:{id:id}})
        return this.repository.softRemove(
            await this.repository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return this.repository.findOne({where:{id:id}})
    }
}
