import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateDegreeDto, DegreeDto, SearchDegreeDto, UpdateDegreeDto } from './degree.dto';
import { Degree, VwDegreeDropdown, VwDegreeItem, VwDegreeList } from './degree.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { VwUniversityDropdown } from 'src/api/university/university.entity';
import { SearchUniversityDto } from 'src/api/university/university.dto';

@Injectable()
export class DegreeService extends BaseService {

    constructor(
        @InjectRepository(Degree)
        private readonly degreeRepository: Repository<Degree>,
        @InjectRepository(VwDegreeList)
        private readonly vwDegreeRepository: Repository<VwDegreeList>,
        @InjectRepository(VwDegreeItem)
        private readonly itemRepository:Repository<VwDegreeItem>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        @InjectRepository(VwUniversityDropdown)
        private readonly vwDropdownUniversityRepository:Repository<VwUniversityDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async universityDropdown(dto: SearchUniversityDto):Promise<SelectItems[]> {
        return await this.dropdownService.universityDropdown(dto,this.vwDropdownUniversityRepository);
      }
    async list(dto:SearchDegreeDto):Promise<SearchResult<VwDegreeList>>{
        const builder = this.createQueryBuider<VwDegreeList>(dto,this.vwDegreeRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwDegreeList>(dto.paginator,count,data);
    }
    async create(dto:CreateDegreeDto,req:CustomRequest):Promise<Degree>{        
        const en = this.toCreateModel(dto,req) as Degree  
        return await this.degreeRepository.save(
            this.degreeRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateDegreeDto,req:CustomRequest):Promise<DegreeDto>{
        const m = await this.degreeRepository.findOne({where:{id:id}})
        return await this.degreeRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<DegreeDto>{
        let m = await this.degreeRepository.findOne({where:{id:id}})
        return await this.degreeRepository.softRemove(
            await this.degreeRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
