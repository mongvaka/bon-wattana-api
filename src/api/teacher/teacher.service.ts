import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateTeacherDto, TeacherDto, SearchTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { Teacher, VwTeacherDropdown, VwTeacherItem, VwTeacherList } from './teacher.entity';
import { VwGendarDropdown } from 'src/api/gendar/gendar.entity';
import { SearchGendarDto } from 'src/api/gendar/gendar.dto';
import { VwNationalityDropdown } from 'src/api/nationality/nationality.entity';
import { SearchNationalityDto } from 'src/api/nationality/nationality.dto';
import { VwEthnicityDropdown } from 'src/api/ethnicity/ethnicity.entity';
import { SearchEthnicityDto } from 'src/api/ethnicity/ethnicity.dto';
import { VwReligionDropdown } from 'src/api/religion/religion.entity';
import { SearchReligionDto } from 'src/api/religion/religion.dto';
import { VwPractitionerLevelDropdown } from 'src/api/practitioner-level/practitioner-level.entity';
import { SearchPractitionerLevelDto } from 'src/api/practitioner-level/practitioner-level.dto';
import { VwEducationBackgroundDropdown } from 'src/api/education-background/education-background.entity';
import { SearchEducationBackgroundDto } from 'src/api/education-background/education-background.dto';
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
        @InjectRepository(VwGendarDropdown)
        private readonly vwDropdownGendarRepository:Repository<VwGendarDropdown>,
        @InjectRepository(VwNationalityDropdown)
        private readonly vwDropdownNationalityRepository:Repository<VwNationalityDropdown>,
        @InjectRepository(VwEthnicityDropdown)
        private readonly vwDropdownEthnicityRepository:Repository<VwEthnicityDropdown>,
        @InjectRepository(VwReligionDropdown)
        private readonly vwDropdownReligionRepository:Repository<VwReligionDropdown>,
        @InjectRepository(VwPractitionerLevelDropdown)
        private readonly vwDropdownPractitionerLevelRepository:Repository<VwPractitionerLevelDropdown>,
        @InjectRepository(VwEducationBackgroundDropdown)
        private readonly vwDropdownEducationBackgroundRepository:Repository<VwEducationBackgroundDropdown>,
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
    async gendarDropdown(dto: SearchGendarDto):Promise<SelectItems[]> {
        return await this.dropdownService.gendarDropdown(dto,this.vwDropdownGendarRepository);
      }
    async nationalityDropdown(dto: SearchNationalityDto):Promise<SelectItems[]> {
        return await this.dropdownService.nationalityDropdown(dto,this.vwDropdownNationalityRepository);
      }
    async ethnicityDropdown(dto: SearchEthnicityDto):Promise<SelectItems[]> {
        return await this.dropdownService.ethnicityDropdown(dto,this.vwDropdownEthnicityRepository);
      }
    async religionDropdown(dto: SearchReligionDto):Promise<SelectItems[]> {
        return await this.dropdownService.religionDropdown(dto,this.vwDropdownReligionRepository);
      }
    async practitionerLevelDropdown(dto: SearchPractitionerLevelDto):Promise<SelectItems[]> {
        return await this.dropdownService.practitionerlevelDropdown(dto,this.vwDropdownPractitionerLevelRepository);
      }
    async educationBackgroundDropdown(dto: SearchEducationBackgroundDto):Promise<SelectItems[]> {
        return await this.dropdownService.educationbackgroundDropdown(dto,this.vwDropdownEducationBackgroundRepository);
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
