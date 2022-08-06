import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateStudentSiblingDto, StudentSiblingDto, SearchStudentSiblingDto, UpdateStudentSiblingDto } from './student-sibling.dto';
import { StudentSibling, VwStudentSiblingDropdown, VwStudentSiblingItem, VwStudentSiblingList } from './student-sibling.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';

@Injectable()
export class StudentSiblingService extends BaseService {

    constructor(
        @InjectRepository(StudentSibling)
        private readonly studentsiblingRepository: Repository<StudentSibling>,
        @InjectRepository(VwStudentSiblingList)
        private readonly vwStudentSiblingRepository: Repository<VwStudentSiblingList>,
        @InjectRepository(VwStudentSiblingItem)
        private readonly itemRepository:Repository<VwStudentSiblingItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async list(dto:SearchStudentSiblingDto):Promise<SearchResult<VwStudentSiblingList>>{
        const builder = this.createQueryBuider<VwStudentSiblingList>(dto,this.vwStudentSiblingRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentSiblingList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentSiblingDto,req:CustomRequest):Promise<StudentSibling>{        
        const en = this.toCreateModel(dto,req) as StudentSibling  
        return await this.studentsiblingRepository.save(
            this.studentsiblingRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateStudentSiblingDto,req:CustomRequest):Promise<StudentSiblingDto>{
        const m = await this.studentsiblingRepository.findOne({where:{id:id}})
        return await this.studentsiblingRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<StudentSiblingDto>{
        let m = await this.studentsiblingRepository.findOne({where:{id:id}})
        return await this.studentsiblingRepository.softRemove(
            await this.studentsiblingRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
