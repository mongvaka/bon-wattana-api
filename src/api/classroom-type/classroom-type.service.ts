import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportExcelDto } from 'src/core/excel/excel.dto';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { Repository } from 'typeorm';
import { CreateClassroomTypeDto, ClassroomTypeDto, SearchClassroomTypeDto, UpdateClassroomTypeDto } from './classroom-type.dto';
import { ClassroomType, VwClassroomTypeDropdown, VwClassroomTypeItem, VwClassroomTypeList } from './classroom-type.entity';

@Injectable()
export class ClassroomTypeService extends BaseService {
    async import(data: any[]): Promise<any> {        
        const dataBulkInsert:ClassroomType[] = []
        data.forEach(el=>{
            dataBulkInsert.push({...el})
        })
        return await this.classroomtypeRepository.save(
            this.classroomtypeRepository.create(dataBulkInsert)
        )
    }
    async export():Promise<any>{
      const data = await this.itemRepository.find()
      return exportExcel(data)
    }

    constructor(
        @InjectRepository(ClassroomType)
        private readonly classroomtypeRepository: Repository<ClassroomType>,
        @InjectRepository(VwClassroomTypeList)
        private readonly vwClassroomTypeRepository: Repository<VwClassroomTypeList>,
        @InjectRepository(VwClassroomTypeItem)
        private readonly itemRepository:Repository<VwClassroomTypeItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchClassroomTypeDto):Promise<SearchResult<VwClassroomTypeList>>{
        const builder = this.createQueryBuider<VwClassroomTypeList>(dto,this.vwClassroomTypeRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwClassroomTypeList>(dto.paginator,count,data);
    }
    async create(dto:CreateClassroomTypeDto,req:CustomRequest):Promise<ClassroomType>{        
        const en = this.toCreateModel(dto,req) as ClassroomType  
        return await this.classroomtypeRepository.save(
            this.classroomtypeRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateClassroomTypeDto,req:CustomRequest):Promise<ClassroomTypeDto>{
        const m = await this.classroomtypeRepository.findOne({where:{id:id}})
        return await this.classroomtypeRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<ClassroomTypeDto>{
        let m = await this.classroomtypeRepository.findOne({where:{id:id}})
        return await this.classroomtypeRepository.softRemove(
            await this.classroomtypeRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
