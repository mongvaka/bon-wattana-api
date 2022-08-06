import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateTeacherDto, TeacherDto, SearchTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { Teacher, VwTeacherDropdown, VwTeacherItem, VwTeacherList } from './teacher.entity';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';

@Injectable()
export class TeacherService extends BaseService {

    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
        @InjectRepository(VwTeacherList)
        private readonly vwTeacherRepository: Repository<VwTeacherList>,
        @InjectRepository(VwTeacherItem)
        private readonly itemRepository:Repository<VwTeacherItem>,
        @InjectRepository(VwCountryDropdown)
        private readonly vwDropdownCountryRepository:Repository<VwCountryDropdown>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        @InjectRepository(VwSubDistrictDropdown)
        private readonly vwDropdownSubDistrictRepository:Repository<VwSubDistrictDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async countryDropdown(dto: SearchCountryDto):Promise<SelectItems[]> {
        return await this.dropdownService.countryDropdown(dto,this.vwDropdownCountryRepository);
      }
    async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
        return await this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
      }
    async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
      }
    async subDistrictDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.subDistrictDropdown(dto,this.vwDropdownSubDistrictRepository);
      }
    async list(dto:SearchTeacherDto):Promise<SearchResult<VwTeacherList>>{
        const builder = this.createQueryBuider<VwTeacherList>(dto,this.vwTeacherRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwTeacherList>(dto.paginator,count,data);
    }
    async create(dto:CreateTeacherDto,req:CustomRequest):Promise<Teacher>{        
        const en = this.toCreateModel(dto,req) as Teacher  
        return await this.teacherRepository.save(
            this.teacherRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateTeacherDto,req:CustomRequest):Promise<TeacherDto>{
        const m = await this.teacherRepository.findOne({where:{id:id}})
        return await this.teacherRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<TeacherDto>{
        let m = await this.teacherRepository.findOne({where:{id:id}})
        return await this.teacherRepository.softRemove(
            await this.teacherRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
