import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateTeachScheduleDto, TeachScheduleDto, SearchTeachScheduleDto, UpdateTeachScheduleDto } from './teach-schedule.dto';
import { TeachSchedule, VwTeachScheduleDropdown, VwTeachScheduleItem, VwTeachScheduleList } from './teach-schedule.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
// import { VwCourseDropdown } from 'src/api/course/course.entity';
// import { SearchCourseDto } from 'src/api/course/course.dto';

@Injectable()
export class TeachScheduleService extends BaseService {

    constructor(
        @InjectRepository(TeachSchedule)
        private readonly teachscheduleRepository: Repository<TeachSchedule>,
        @InjectRepository(VwTeachScheduleList)
        private readonly vwTeachScheduleRepository: Repository<VwTeachScheduleList>,
        @InjectRepository(VwTeachScheduleItem)
        private readonly itemRepository:Repository<VwTeachScheduleItem>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        // @InjectRepository(VwCourseDropdown)
        // private readonly vwDropdownCourseRepository:Repository<VwCourseDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    // async courseDropdown(dto: SearchCourseDto):Promise<SelectItems[]> {
    //     return await this.dropdownService.courseDropdown(dto,this.vwDropdownCourseRepository);
    //   }
    async list(dto:SearchTeachScheduleDto):Promise<SearchResult<VwTeachScheduleList>>{
        const builder = this.createQueryBuider<VwTeachScheduleList>(dto,this.vwTeachScheduleRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwTeachScheduleList>(dto.paginator,count,data);
    }
    async create(dto:CreateTeachScheduleDto,req:CustomRequest):Promise<TeachSchedule>{        
        const en = this.toCreateModel(dto,req) as TeachSchedule  
        return await this.teachscheduleRepository.save(
            this.teachscheduleRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateTeachScheduleDto,req:CustomRequest):Promise<TeachScheduleDto>{
        const m = await this.teachscheduleRepository.findOne({where:{id:id}})
        return await this.teachscheduleRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<TeachScheduleDto>{
        let m = await this.teachscheduleRepository.findOne({where:{id:id}})
        return await this.teachscheduleRepository.softRemove(
            await this.teachscheduleRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
