import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentDto, StudentDto, SearchStudentDto, UpdateStudentDto } from './student.dto';
import { Student, VwStudentDropdown, VwStudentItem, VwStudentList } from './student.entity';
import { VwHopitalDropdown } from 'src/api/hopital/hopital.entity';
import { SearchHopitalDto } from 'src/api/hopital/hopital.dto';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwOldSchoolDropdown } from 'src/api/old-school/old-school.entity';
import { SearchOldSchoolDto } from 'src/api/old-school/old-school.dto';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';


@Injectable()
export class StudentService extends BaseService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(VwStudentList)
        private readonly vwStudentRepository: Repository<VwStudentList>,
        @InjectRepository(VwStudentItem)
        private readonly itemRepository:Repository<VwStudentItem>,
        @InjectRepository(VwHopitalDropdown)
        private readonly vwDropdownHopitalRepository:Repository<VwHopitalDropdown>,
        @InjectRepository(VwCountryDropdown)
        private readonly vwDropdownCountryRepository:Repository<VwCountryDropdown>,
        @InjectRepository(VwSubDistrictDropdown)
        private readonly vwDropdownSubDistrictRepository:Repository<VwSubDistrictDropdown>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        @InjectRepository(VwOldSchoolDropdown)
        private readonly vwDropdownOldSchoolRepository:Repository<VwOldSchoolDropdown>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async hopitalDropdown(dto: SearchHopitalDto):Promise<SelectItems[]> {
        return await this.dropdownService.hopitalDropdown(dto,this.vwDropdownHopitalRepository);
      }
    async countryDropdown(dto: SearchCountryDto):Promise<SelectItems[]> {
        return await this.dropdownService.countryDropdown(dto,this.vwDropdownCountryRepository);
      }
    async subDistrictDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.subDistrictDropdown(dto,this.vwDropdownSubDistrictRepository);
      }
    async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
        return await this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
      }
    async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
        return await this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
      }
    async oldSchoolDropdown(dto: SearchOldSchoolDto):Promise<SelectItems[]> {
        return await this.dropdownService.oldSchoolDropdown(dto,this.vwDropdownOldSchoolRepository);
      }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchStudentDto):Promise<SearchResult<VwStudentList>>{
        const builder = this.createQueryBuider<VwStudentList>(dto,this.vwStudentRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentDto,req:CustomRequest):Promise<Student>{        
        const en = this.toCreateModel(dto,req) as Student  
        return await this.studentRepository.save(
            this.studentRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentDto,req:CustomRequest):Promise<StudentDto>{
        const m = await this.studentRepository.findOne({where:{id:id}})
        return await this.studentRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentDto>{
        let m = await this.studentRepository.findOne({where:{id:id}})
        return await this.studentRepository.softRemove(
            await this.studentRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
