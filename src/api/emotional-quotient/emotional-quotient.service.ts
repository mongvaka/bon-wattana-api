import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateEmotionalQuotientDto, EmotionalQuotientDto, SearchEmotionalQuotientDto, UpdateEmotionalQuotientDto } from './emotional-quotient.dto';
import { EmotionalQuotient, VwEmotionalQuotientDropdown, VwEmotionalQuotientItem, VwEmotionalQuotientList } from './emotional-quotient.entity';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { SearchStudentDto } from 'src/api/student/student.dto';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { SearchYearTermDto } from 'src/api/year-term/year-term.dto';

@Injectable()
export class EmotionalQuotientService extends BaseService {

    constructor(
        @InjectRepository(EmotionalQuotient)
        private readonly emotionalquotientRepository: Repository<EmotionalQuotient>,
        @InjectRepository(VwEmotionalQuotientList)
        private readonly vwEmotionalQuotientRepository: Repository<VwEmotionalQuotientList>,
        @InjectRepository(VwEmotionalQuotientItem)
        private readonly itemRepository:Repository<VwEmotionalQuotientItem>,
        @InjectRepository(VwStudentDropdown)
        private readonly vwDropdownStudentRepository:Repository<VwStudentDropdown>,
        @InjectRepository(VwYearTermDropdown)
        private readonly vwDropdownYearTermRepository:Repository<VwYearTermDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async studentDropdown(dto: SearchStudentDto):Promise<SelectItems[]> {
        return await this.dropdownService.studentDropdown(dto,this.vwDropdownStudentRepository);
      }
    async yearTermDropdown(dto: SearchYearTermDto):Promise<SelectItems[]> {
        return await this.dropdownService.yeartermDropdown(dto,this.vwDropdownYearTermRepository);
      }
    async list(dto:SearchEmotionalQuotientDto):Promise<SearchResult<VwEmotionalQuotientList>>{
        const builder = this.createQueryBuider<VwEmotionalQuotientList>(dto,this.vwEmotionalQuotientRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwEmotionalQuotientList>(dto.paginator,count,data);
    }
    async create(dto:CreateEmotionalQuotientDto,req:CustomRequest):Promise<EmotionalQuotient>{        
        const en = this.toCreateModel(dto,req) as EmotionalQuotient  
        return await this.emotionalquotientRepository.save(
            this.emotionalquotientRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateEmotionalQuotientDto,req:CustomRequest):Promise<EmotionalQuotientDto>{
        const m = await this.emotionalquotientRepository.findOne({where:{id:id}})
        return await this.emotionalquotientRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<EmotionalQuotientDto>{
        let m = await this.emotionalquotientRepository.findOne({where:{id:id}})
        return await this.emotionalquotientRepository.softRemove(
            await this.emotionalquotientRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
