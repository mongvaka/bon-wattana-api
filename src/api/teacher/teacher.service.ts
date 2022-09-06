import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Not, Repository } from 'typeorm';
import { CreateTeacherDto, TeacherDto, SearchTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { Teacher, VwTeacherDropdown, VwTeacherItem, VwTeacherList } from './teacher.entity';
import { VwGendarDropdown } from 'src/api/gendar/gendar.entity';
import { SearchGendarDto } from 'src/api/gendar/gendar.dto';
import { VwNationalityDropdown } from 'src/api/nationality/nationality.entity';
import { SearchNationalityDto } from 'src/api/nationality/nationality.dto';
import { VwEthnicityDropdown } from 'src/api/ethnicity/ethnicity.entity';
import { SearchEthnicityDto } from 'src/api/ethnicity/ethnicity.dto';
import { VwReligionDropdown } from 'src/api/religion/religion.entity';
import { SearchReligionDto } from 'src/api/religion/religion.dto';
import { VwPractitionerLevelDropdown } from 'src/api/practitioner-level/practitioner-level.entity';
import { SearchPractitionerLevelDto } from 'src/api/practitioner-level/practitioner-level.dto';
import { VwEducationBackgroundDropdown } from 'src/api/education-background/education-background.entity';
import { SearchEducationBackgroundDto } from 'src/api/education-background/education-background.dto';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { SearchCountryDto } from 'src/api/country/country.dto';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { SearchProvinceDto } from 'src/api/province/province.dto';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { SearchDistrictDto } from 'src/api/district/district.dto';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { SearchSubDistrictDto } from 'src/api/sub-district/sub-district.dto';
import { VwPracticleDropdown } from '../practicle/practicle.entity';
import { filename } from 'src/core/shared/utils/image.util';
import { savefileWithName } from 'src/core/shared/services/files.service';
import { ImagesService } from 'src/core/images/images.service';
import { RegisterDto } from 'src/core/authentications/authentications.dto';
import { UserType } from 'src/core/shared/constans/enum-constans';
import { AuthenticationsService } from 'src/core/authentications/authentications.service';
import { Student } from '../student/student.entity';
import { exportExcel } from 'src/core/shared/services/export-excel.service';
import { SearchExportExcelDto } from 'src/core/excel/excel.dto';
import { Operators } from 'src/core/shared/constans/constanst';
import { ColumnType } from 'src/core/shared/constans/enum-system';
import { SearchClassroomDto } from '../classroom/classroom.dto';
import { VwClassroomDropdown } from '../classroom/classroom.entity';
import { VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';

@Injectable()
export class TeacherService extends BaseService {
  async import(data: any[]): Promise<any> {    
    console.log('import');
        
    for (const el of data) {
      console.log('el',el);
      
      const model:Teacher = {...el,birthDate:null}
      const studentIsexist = await this.teacherRepository.findOne({where:{teacherCode:el.teacherCode,deleted:false}})
      if(!studentIsexist){
        const info = await this.teacherRepository.save(
          this.teacherRepository.create(model)
        )
        
        const regisModel:RegisterDto = {
          email:`${info.teacherCode}`,
          password:`${info.teacherCode}`,
          firstname:'',
          lastname:'',
          inforId:info.id,
          type:UserType.TEACHER
        }
        await this.authService.register(regisModel)
      }
      
    }
    return {}

}
async export(dto:SearchExportExcelDto):Promise<any>{
  const builder = this.createQueryBuider<VwTeacherItem>(dto,this.itemRepository)
  const data = await builder
  .getMany();
  return exportExcel(data)
}

    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
        @InjectRepository(VwTeacherList)
        private readonly vwTeacherRepository: Repository<VwTeacherList>,
        @InjectRepository(VwTeacherItem)
        private readonly itemRepository:Repository<VwTeacherItem>,
        @InjectRepository(VwGendarDropdown)
        private readonly vwDropdownGendarRepository:Repository<VwGendarDropdown>,
        @InjectRepository(VwNationalityDropdown)
        private readonly vwDropdownNationalityRepository:Repository<VwNationalityDropdown>,
        @InjectRepository(VwEthnicityDropdown)
        private readonly vwDropdownEthnicityRepository:Repository<VwEthnicityDropdown>,
        @InjectRepository(VwReligionDropdown)
        private readonly vwDropdownReligionRepository:Repository<VwReligionDropdown>,
        @InjectRepository(VwPractitionerLevelDropdown)
        private readonly vwDropdownPractitionerLevelRepository:Repository<VwPractitionerLevelDropdown>,
        @InjectRepository(VwEducationBackgroundDropdown)
        private readonly vwDropdownEducationBackgroundRepository:Repository<VwEducationBackgroundDropdown>,
        @InjectRepository(VwCountryDropdown)
        private readonly vwDropdownCountryRepository:Repository<VwCountryDropdown>,
        @InjectRepository(VwProvinceDropdown)
        private readonly vwDropdownProvinceRepository:Repository<VwProvinceDropdown>,
        @InjectRepository(VwDistrictDropdown)
        private readonly vwDropdownDistrictRepository:Repository<VwDistrictDropdown>,
        @InjectRepository(VwSubDistrictDropdown)
        private readonly vwDropdownSubDistrictRepository:Repository<VwSubDistrictDropdown>,
        @InjectRepository(VwPracticleDropdown)
        private readonly vwPracticleDropdownRepository:Repository<VwPracticleDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly imagesService:ImagesService,
        private readonly authService: AuthenticationsService
        ){
        super()
    }
    async gendarDropdown(dto: SearchGendarDto):Promise<SelectItems[]> {
        return this.dropdownService.gendarDropdown(dto,this.vwDropdownGendarRepository);
      }
    async nationalityDropdown(dto: SearchNationalityDto):Promise<SelectItems[]> {
        return this.dropdownService.nationalityDropdown(dto,this.vwDropdownNationalityRepository);
      }
    async ethnicityDropdown(dto: SearchEthnicityDto):Promise<SelectItems[]> {
        return this.dropdownService.ethnicityDropdown(dto,this.vwDropdownEthnicityRepository);
      }
    async religionDropdown(dto: SearchReligionDto):Promise<SelectItems[]> {
        return this.dropdownService.religionDropdown(dto,this.vwDropdownReligionRepository);
      }
    async practitionerLevelDropdown(dto: SearchPractitionerLevelDto):Promise<SelectItems[]> {
        return this.dropdownService.practitionerlevelDropdown(dto,this.vwDropdownPractitionerLevelRepository);
      }
    async educationBackgroundDropdown(dto: SearchEducationBackgroundDto):Promise<SelectItems[]> {
        return this.dropdownService.educationbackgroundDropdown(dto,this.vwDropdownEducationBackgroundRepository);
      }
    async countryDropdown(dto: SearchCountryDto):Promise<SelectItems[]> {
        return this.dropdownService.countryDropdown(dto,this.vwDropdownCountryRepository);
      }
    // async provinceDropdown(dto: SearchProvinceDto):Promise<SelectItems[]> {
    //     return this.dropdownService.provinceDropdown(dto,this.vwDropdownProvinceRepository);
    //   }
    // async districtDropdown(dto: SearchDistrictDto):Promise<SelectItems[]> {
    //     return this.dropdownService.districtDropdown(dto,this.vwDropdownDistrictRepository);
    //   }
    // async subDistrictDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
    //     return this.dropdownService.subDistrictDropdown(dto,this.vwDropdownSubDistrictRepository);
    //   }
      
      async subjectGroupDropdown(dto: SearchSubDistrictDto):Promise<SelectItems[]> {
        return this.dropdownService.practicleDropdown(dto,this.vwPracticleDropdownRepository);
      }
    async list(dto:SearchTeacherDto):Promise<SearchResult<VwTeacherList>>{
        const builder = this.createQueryBuider<VwTeacherList>(dto,this.vwTeacherRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwTeacherList>(dto.paginator,count,data);
    }
    async create(dto:CreateTeacherDto,req:CustomRequest):Promise<Teacher>{       
      const duplicat = await this.teacherRepository.findOne({where:{deleted:false,teacherCode:dto.teacherCode}})
      if(duplicat){
        throw new BadRequestException('รหัสครูมีอยู่แล้ว')
      } 
        const en = this.toCreateModel(dto,req) as Teacher  
        const moduleName = 'images'
        const fileName = filename()
        if(dto.teacherPhoto){
          await savefileWithName(dto.teacherPhoto[0],fileName,moduleName)
        }
        const result = await this.teacherRepository.save(
          this.teacherRepository.create(en)
      );
        if(dto.teacherPhoto){
          await this.imagesService.create({imageUrl:fileName,refId:result.id,refType:0,imageType:0},req)
        }
        const regisModel:RegisterDto = {
          email:`${result.teacherCode}`,
          password:`${result.teacherCode}`,
          firstname:'',
          lastname:'',
          inforId:result.id,
          type:UserType.TEACHER
        }
         await this.authService.register(regisModel)
        return result
    }
    async update(id:number,dto:UpdateTeacherDto,req:CustomRequest):Promise<TeacherDto>{
      const duplicat = await this.teacherRepository.findOne({where:{deleted:false,teacherCode:dto.teacherCode,id:Not(id)}})
      console.log(duplicat);
      
      if(duplicat){
        throw new BadRequestException('รหัสครูมีอยู่แล้ว')
      }
      const moduleName = 'images'
      const fileName = filename()

      if(dto.teacherPhoto){
        await this.imagesService.removeWithRefId(id)
        await savefileWithName(dto.teacherPhoto[0],fileName,moduleName)
      }
        const m = await this.teacherRepository.findOne({where:{id:id}})
        const result =  await this.teacherRepository.save(
            this.toUpdateModel(m,dto,req)
        );
        if(dto.teacherPhoto){
          await this.imagesService.create({imageUrl:fileName,refId:result.id,refType:0,imageType:0},req)
        }
        return result
    }
    async delete(id:number,req:CustomRequest):Promise<TeacherDto>{
        let m = await this.teacherRepository.findOne({where:{id:id}})
        return this.teacherRepository.softRemove(
            await this.teacherRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        const model = await this.itemRepository.findOne({where:{id:id}})
        // model.birthDate?.setDate(model.birthDate.getDate() + 1)
        // model.setInDate?.setDate(model.setInDate.getDate() + 1)
        // model.setInDate?.setDate(model.setInDate.getDate() + 1)
        return model
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
        return this.dropdownService.subDistrictDropdown(searchDto,this.vwDropdownSubDistrictRepository);
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
        return this.dropdownService.districtDropdown(searchDto,this.vwDropdownDistrictRepository);
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
        return this.dropdownService.provinceDropdown(searchDto,this.vwDropdownProvinceRepository);
      }
      async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }
}
