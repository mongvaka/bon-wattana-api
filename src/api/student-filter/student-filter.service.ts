import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentFilterDto, StudentFilterDto, SearchStudentFilterDto, UpdateStudentFilterDto } from './student-filter.dto';
import { StudentFilter, VwStudentFilterDropdown, VwStudentFilterItem, VwStudentFilterList } from './student-filter.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { SearchYearTermDto } from 'src/api/year-term/year-term.dto';
import { SearchClassroomDto } from '../classroom/classroom.dto';
import { VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';
import { VwClassroomDropdown } from '../classroom/classroom.entity';
import { YearTermService } from '../year-term/year-term.service';

@Injectable()
export class StudentFilterService extends BaseService {

    constructor(
        @InjectRepository(StudentFilter)
        private readonly studentfilterRepository: Repository<StudentFilter>,
        @InjectRepository(VwStudentFilterList)
        private readonly vwStudentFilterRepository: Repository<VwStudentFilterList>,
        @InjectRepository(VwStudentFilterItem)
        private readonly itemRepository:Repository<VwStudentFilterItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwYearTermDropdown)
        private readonly vwDropdownYearTermRepository:Repository<VwYearTermDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly yearTermService:YearTermService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async yearTermDropdown(dto: SearchYearTermDto):Promise<SelectItems[]> {
        return await this.dropdownService.yeartermDropdown(dto,this.vwDropdownYearTermRepository);
      }
    async list(dto:SearchStudentFilterDto):Promise<SearchResult<VwStudentFilterList>>{
        const builder = this.createQueryBuider<VwStudentFilterList>(dto,this.vwStudentFilterRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentFilterList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentFilterDto,req:CustomRequest):Promise<StudentFilter>{        
        const en = this.toCreateModel(dto,req) as StudentFilter  
        return await this.studentfilterRepository.save(
            this.studentfilterRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentFilterDto,req:CustomRequest):Promise<StudentFilterDto>{
        const currentYearTerm = await this.yearTermService.findCurrrentTerm()
        const m = await this.studentfilterRepository.findOne({where:{studentId:id,yearTermId:currentYearTerm?.id}})
        return await this.studentfilterRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentFilterDto>{
        let m = await this.studentfilterRepository.findOne({where:{id:id}})
        return await this.studentfilterRepository.softRemove(
            await this.studentfilterRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        const yearTerm = await this.yearTermService.findCurrrentTerm()
        // return await this.itemRepository.findOne({where:{studentId:id,yearTermId:yearTerm.id}})
        const result =  await this.itemRepository.findOne({where:{studentId:id,yearTermId:yearTerm.id}})
        if(result){
            return {...result,isUpdateMode:true}
        }
        return {
            isUpdateMode:false,
            yearTermId:yearTerm?.id,
            studentId:id,
            
        }
    }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }
}
