import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportExcelDto } from 'src/core/excel/excel.dto';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { Repository } from 'typeorm';
import { CreateCountryDto, CountryDto, SearchCountryDto, UpdateCountryDto } from './country.dto';
import { Country, VwCountryDropdown, VwCountryItem, VwCountryList } from './country.entity';

@Injectable()
export class CountryService extends BaseService {
    async import(data: any[]): Promise<any> {        
        const dataBulkInsert:Country[] = []
        data.forEach(el=>{
            dataBulkInsert.push({...el})
        })
        return await this.countryRepository.save(
            this.countryRepository.create(dataBulkInsert)
        )
    }
    async export():Promise<any>{
      const data = await this.itemRepository.find()
      return exportExcel(data)
    }

    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(VwCountryList)
        private readonly vwCountryRepository: Repository<VwCountryList>,
        @InjectRepository(VwCountryItem)
        private readonly itemRepository:Repository<VwCountryItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchCountryDto):Promise<SearchResult<VwCountryList>>{
        const builder = this.createQueryBuider<VwCountryList>(dto,this.vwCountryRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwCountryList>(dto.paginator,count,data);
    }
    async create(dto:CreateCountryDto,req:CustomRequest):Promise<Country>{        
        const en = this.toCreateModel(dto,req) as Country  
        return await this.countryRepository.save(
            this.countryRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateCountryDto,req:CustomRequest):Promise<CountryDto>{
        const m = await this.countryRepository.findOne({where:{id:id}})
        return await this.countryRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<CountryDto>{
        let m = await this.countryRepository.findOne({where:{id:id}})
        return await this.countryRepository.softRemove(
            await this.countryRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
