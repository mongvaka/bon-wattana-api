import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import {Not, Repository } from 'typeorm';
import { CreateStudentDto, StudentDto, SearchStudentDto, UpdateStudentDto } from './student.dto';
import { Student, VwStudentDropdown, VwStudentItem, VwStudentList } from './student.entity';
import { VwGendarDropdown } from 'src/api/gendar/gendar.entity';
import { SearchGendarDto } from 'src/api/gendar/gendar.dto';
import { VwNationalityDropdown } from 'src/api/nationality/nationality.entity';
import { SearchNationalityDto } from 'src/api/nationality/nationality.dto';
import { VwEthnicityDropdown } from 'src/api/ethnicity/ethnicity.entity';
import { SearchEthnicityDto } from 'src/api/ethnicity/ethnicity.dto';
import { VwReligionDropdown } from 'src/api/religion/religion.entity';
import { SearchReligionDto } from 'src/api/religion/religion.dto';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwAliveWithDropdown } from 'src/api/alive-with/alive-with.entity';
import { SearchAliveWithDto } from 'src/api/alive-with/alive-with.dto';
import { VwClassroomDropdown } from 'src/api/classroom/classroom.entity';
import { SearchClassroomDto } from 'src/api/classroom/classroom.dto';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { ImportExcelDto } from 'src/core/excel/excel.dto';
import { VwParentStatusDropdown } from '../parent-status/parent-status.entity';
import { savefileWithName } from 'src/core/shared/services/files.service';
import { filename } from 'src/core/shared/utils/image.util';
import { ImagesService } from 'src/core/images/images.service';
import { Operators } from 'src/core/shared/constans/constanst';
import { ColumnType } from 'src/core/shared/constans/enum-system';
import { AuthenticationsService } from 'src/core/authentications/authentications.service';
import { RegisterDto } from 'src/core/authentications/authentications.dto';
import { UserType } from 'src/core/shared/constans/enum-constans';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StudentService extends BaseService {
    async import(data: any[]): Promise<any> {        
        for (const el of data) {
          
          const model:Student = {...el,birthDate:null}
          const studentIsexist = await this.studentRepository.findOne({where:{studentCode:el.studentCode,deleted:false}})
          if(!studentIsexist){
            const info = await this.studentRepository.save(
              this.studentRepository.create(model)
            )
            
            const regisModel:RegisterDto = {
              email:`${el.studentCode}`,
              password:`${el.studentCode}`,
              firstname:'',
              lastname:'',
              inforId:info.id,
              type:UserType.STUDENT
            }
            const user = await this.authService.register(regisModel)
          }
          
        }
        return {}

    }

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(VwStudentList)
        private readonly vwStudentRepository: Repository<VwStudentList>,
        @InjectRepository(VwStudentItem)
        private readonly itemRepository:Repository<VwStudentItem>,
        @InjectRepository(VwGendarDropdown)
        private readonly vwDropdownGendarRepository:Repository<VwGendarDropdown>,
        @InjectRepository(VwNationalityDropdown)
        private readonly vwDropdownNationalityRepository:Repository<VwNationalityDropdown>,
        @InjectRepository(VwEthnicityDropdown)
        private readonly vwDropdownEthnicityRepository:Repository<VwEthnicityDropdown>,
        @InjectRepository(VwReligionDropdown)
        private readonly vwDropdownReligionRepository:Repository<VwReligionDropdown>,
        @InjectRepository(VwCountryDropdown)
        private readonly vwDropdownCountryRepository:Repository<VwCountryDropdown>,
        @InjectRepository(VwSubDistrictDropdown)
        private readonly vwDropdownSubDistrictRepository:Repository<VwSubDistrictDropdown>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        @InjectRepository(VwAliveWithDropdown)
        private readonly vwDropdownAliveWithRepository:Repository<VwAliveWithDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwParentStatusDropdown)
        private readonly vwDropdownParentStatusRepository:Repository<VwParentStatusDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly imagesService:ImagesService,
        private readonly authService: AuthenticationsService
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
    async countryDropdown(dto: SearchCountryDto):Promise<SelectItems[]> {

        return await this.dropdownService.countryDropdown(dto,this.vwDropdownCountryRepository);
      }
    async subDistrictDropdown(dto: SearchSubDistrictDto,id:number):Promise<SelectItems[]> {
      if(id==0){
        return []
      }
      const searchDto = new SearchCountryDto()
      searchDto.refTable = 'sub_district'
      searchDto.tableKey = 'sub_district'
      searchDto.searchCondition = [{
          columnName:'refId',
          tableName:'sub_district',
          feildName:'refId',
          value:`${id}`,
          inputType:ColumnType.INT,
          equalityOperator: Operators.EQUAL,
          operator:Operators.EQUAL
      }]
        return await this.dropdownService.subDistrictDropdown(searchDto,this.vwDropdownSubDistrictRepository);
      }
    async districtDropdown(dto: SearchDistrictDto,id:number):Promise<SelectItems[]> {
      if(id==0){
        return []
      }
      const searchDto = new SearchCountryDto()
      searchDto.refTable = 'district'
      searchDto.tableKey = 'district'
      searchDto.searchCondition = [{
          columnName:'refId',
          tableName:'district',
          feildName:'refId',
          value:`${id}`,
          inputType:ColumnType.INT,
          equalityOperator: Operators.EQUAL,
          operator:Operators.EQUAL
      }]
        return await this.dropdownService.districtDropdown(searchDto,this.vwDropdownDistrictRepository);
      }
    async provinceDropdown(dto: SearchProvinceDto,id:number):Promise<SelectItems[]> {
      if(id==0){
        return []
      }
      const searchDto = new SearchCountryDto()
      searchDto.refTable = 'province'
      searchDto.tableKey = 'province'
      searchDto.searchCondition = [{
          columnName:'refId',
          tableName:'province',
          feildName:'refId',
          value:`${id}`,
          inputType:ColumnType.INT,
          equalityOperator: Operators.EQUAL,
          operator:Operators.EQUAL
      }]
        return await this.dropdownService.provinceDropdown(searchDto,this.vwDropdownProvinceRepository);
      }
    async aliveWithDropdown(dto: SearchAliveWithDto):Promise<SelectItems[]> {
        return await this.dropdownService.aliveWithDropdown(dto,this.vwDropdownAliveWithRepository);
      }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return await this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async parentStatusDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return await this.dropdownService.parentStatusDropdown(dto,this.vwDropdownParentStatusRepository);
      }
      
    async list(dto:SearchStudentDto):Promise<SearchResult<VwStudentList>>{
        const builder = this.createQueryBuider<VwStudentList>(dto,this.vwStudentRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwStudentList>(dto.paginator,count,data);
    }
    async create(dto:CreateStudentDto,req:CustomRequest):Promise<Student>{   
      const duplicat = await this.studentRepository.find({where:{deleted:false,studentCode:dto.studentCode}})
      if(duplicat){
        throw new BadRequestException('รหัสนักเรียนมีอยู่แล้ว')
      }
      const moduleName = 'images'
      const fileName = filename()
      if(dto.imageProfile){
        await savefileWithName(dto.imageProfile[0],fileName,moduleName)
      }
        const en = this.toCreateModel(dto,req) as Student  
        const result = await this.studentRepository.save(
            this.studentRepository.create(en)
        );
        if(dto.imageProfile){
          await this.imagesService.create({imageUrl:fileName,refId:result.id,refType:0,imageType:0},req)
        }
        return result
    }
    async update(id:number,dto:UpdateStudentDto,req:CustomRequest):Promise<StudentDto>{
      const duplicat = await this.studentRepository.find({where:{deleted:false,studentCode:dto.studentCode,id:Not(id)}})
      if(duplicat){
        throw new BadRequestException('รหัสนักเรียนมีอยู่แล้ว')
      }
      const moduleName = 'images'
      const fileName = filename()

      if(dto.imageProfile){
        await savefileWithName(dto.imageProfile[0],fileName,moduleName)
      }
      const m = await this.studentRepository.findOne({where:{id:id}})
      const result = await this.studentRepository.save(
          this.toUpdateModel(m,dto,req)
      );
      if(dto.imageProfile){
        await this.imagesService.create({imageUrl:fileName,refId:result.id,refType:0,imageType:0},req)
      }
        return result
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
    async export():Promise<any>{
      const data = await this.itemRepository.find()
      return exportExcel(data)
    }
}
