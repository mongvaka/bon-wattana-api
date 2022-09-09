import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { SearchClassroomDto } from 'src/api/classroom/classroom.dto';
import { VwClassroomDropdown } from 'src/api/classroom/classroom.entity';
import { VwStudentItem } from 'src/api/student/student.entity';
import { VwClassroomTypeDropdown } from 'src/api/classroom-type/classroom-type.entity';
import { CreateStudentHomeVisitDto, StudentHomeVisitDto, SearchStudentHomeVisitDto, UpdateStudentHomeVisitDto } from './student-home-visit.dto';
import { StudentHomeVisit, VwStudentHomeVisitDropdown, VwStudentHomeVisitItem, VwStudentHomeVisitList } from './student-home-visit.entity';
//import { VwnullDropdown } from 'src/api/null/null.entity';
//import { SearchnullDto } from 'src/api/null/null.dto';

@Injectable()
export class StudentHomeVisitService extends BaseService {

    constructor(
        @InjectRepository(StudentHomeVisit)
        private readonly studenthomevisitRepository: Repository<StudentHomeVisit>,
        @InjectRepository(VwStudentHomeVisitList)
        private readonly vwStudentHomeVisitRepository: Repository<VwStudentHomeVisitList>,
        @InjectRepository(VwStudentHomeVisitItem)
        private readonly itemRepository:Repository<VwStudentHomeVisitItem>,
      //  @InjectRepository(VwnullDropdown)
      //  private readonly vwDropdownnullRepository:Repository<VwnullDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        private readonly dropdownService: DropdownService,
        @InjectRepository(VwStudentItem)
        private readonly itemStudentRepository:Repository<VwStudentItem>,
        ){
        super()
    }
  //  async nullDropdown(dto: SearchnullDto):Promise<SelectItems[]> {
  //      return await this.dropdownService.nullDropdown(dto,this.vwDropdownnullRepository);
   //   }
    async list(dto:SearchStudentHomeVisitDto):Promise<SearchResult<VwStudentHomeVisitList>>{
        const builder = this.createQueryBuider<VwStudentHomeVisitList>(dto,this.vwStudentHomeVisitRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentHomeVisitList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentHomeVisitDto,req:CustomRequest):Promise<StudentHomeVisit>{        
        const en = this.toCreateModel(dto,req) as StudentHomeVisit  
        return await this.studenthomevisitRepository.save(
            this.studenthomevisitRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentHomeVisitDto,req:CustomRequest):Promise<StudentHomeVisitDto>{
        const m = await this.studenthomevisitRepository.findOne({where:{id:id}})
        return await this.studenthomevisitRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentHomeVisitDto>{
        let m = await this.studenthomevisitRepository.findOne({where:{id:id}})
        return await this.studenthomevisitRepository.softRemove(
            await this.studenthomevisitRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }

      async getStudentHomeVisitInitialData(id:number):Promise<any>{
        return await this.itemStudentRepository.findOne({where:{id:id}})
    }
}
