import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateCheckStudentDto, CheckStudentDto, SearchCheckStudentDto, UpdateCheckStudentDto } from './check-student.dto';
import { CheckStudent, VwCheckStudentDropdown, VwCheckStudentItem, VwCheckStudentList } from './check-student.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { StudentService } from '../student/student.service';
import { VwYearTermDropdown } from '../year-term/year-term.entity';
import { YearTermService } from '../year-term/year-term.service';
import { SearchClassroomDto } from '../classroom/classroom.dto';
import { VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';
import { VwClassroomDropdown } from '../classroom/classroom.entity';

@Injectable()
export class CheckStudentService extends BaseService {
    async currentTerm() {
       return this.yearTermService.findCurrrentTerm()
    }

    constructor(
        @InjectRepository(CheckStudent)
        private readonly checkstudentRepository: Repository<CheckStudent>,
        @InjectRepository(VwCheckStudentList)
        private readonly vwCheckStudentRepository: Repository<VwCheckStudentList>,
        @InjectRepository(VwCheckStudentItem)
        private readonly itemRepository:Repository<VwCheckStudentItem>,
        @InjectRepository(VwYearTermDropdown)
        private readonly vwYearTermDropdownRepository:Repository<VwYearTermDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly studentService:StudentService,
        private readonly yearTermService:YearTermService
        ){
        super()
    }
    async yearTermDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.yeartermDropdown(dto,this.vwYearTermDropdownRepository);
      }
    async list(dto:SearchCheckStudentDto):Promise<SearchResult<VwCheckStudentList>>{
        const builder = this.createQueryBuider<VwCheckStudentList>(dto,this.vwCheckStudentRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwCheckStudentList>(dto.paginator,count,data);
    }
    async create(dto:CreateCheckStudentDto,req:CustomRequest):Promise<CheckStudent>{        
        const en = this.toCreateModel(dto,req) as CheckStudent  
        return await this.checkstudentRepository.save(
            this.checkstudentRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateCheckStudentDto,req:CustomRequest):Promise<CheckStudentDto>{
        const currentYearTerm = await this.yearTermService.findCurrrentTerm()
        const m = await this.checkstudentRepository.findOne({where:{studentId:id,yearTermId:currentYearTerm.id}})
        return await this.checkstudentRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<CheckStudentDto>{
        let m = await this.checkstudentRepository.findOne({where:{id:id}})
        return await this.checkstudentRepository.softRemove(
            await this.checkstudentRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        const currentYearTerm = await this.yearTermService.findCurrrentTerm()
        return await this.itemRepository.findOne({where:{studentId:id,yearTermId:currentYearTerm.id}})
    }
    async itemStudent(id:number):Promise<any>{
        return await this.studentService.item(id)
    }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }
}
