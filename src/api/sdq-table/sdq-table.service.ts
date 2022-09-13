import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateSdqTableDto, SdqTableDto, SearchSdqTableDto, UpdateSdqTableDto } from './sdq-table.dto';
import { SdqTable, VwSdqTableDropdown, VwSdqTableItem, VwSdqTableList} from './sdq-table.entity';
import { SearchClassroomDto } from 'src/api/classroom/classroom.dto';
import { VwClassroomDropdown } from 'src/api/classroom/classroom.entity';
import { VwClassroomTypeDropdown } from 'src/api/classroom-type/classroom-type.entity';
import { VwYearTermItem } from 'src/api/year-term/year-term.entity';
import { VwTeacherItem } from 'src/api/teacher/teacher.entity';
import { VwStudentItem,VwSdqTableListForTeacher,VwSdqTableListForParent,VwSdqTableListForStudent  } from 'src/api/student/student.entity';
import { SearchStudentDto, StudentDto } from 'src/api/student/student.dto';
@Injectable()
export class SdqTableService extends BaseService {

    constructor(
        @InjectRepository(SdqTable)
        private readonly sdqtableRepository: Repository<SdqTable>,
        @InjectRepository(VwSdqTableList)
        private readonly vwSdqTableRepository: Repository<VwSdqTableList>,
        @InjectRepository(VwSdqTableListForTeacher)
        private readonly vwSdqTableListForTeacherRepository: Repository<VwSdqTableListForTeacher>,
        @InjectRepository(VwSdqTableListForParent)
        private readonly vwSdqTableListForParentRepository: Repository<VwSdqTableListForParent>,
        @InjectRepository(VwSdqTableListForStudent)
        private readonly vwSdqTableListForStudentRepository: Repository<VwSdqTableListForStudent>,
        @InjectRepository(VwSdqTableItem)
        private readonly itemRepository:Repository<VwSdqTableItem>,

        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        @InjectRepository(VwStudentItem)
        private readonly itemStudentRepository:Repository<VwStudentItem>,

        @InjectRepository(VwYearTermItem)
        private readonly itemYearTermRepository:Repository<VwYearTermItem>,
        @InjectRepository(VwTeacherItem)
        private readonly itemTeacherRepository:Repository<VwTeacherItem>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async list(dto:SearchStudentDto):Promise<SearchResult<VwSdqTableListForStudent>>{
       const builder = this.createQueryBuider<VwSdqTableListForStudent>(dto,this.vwSdqTableListForStudentRepository)
      console.log(builder.getSql())
       const [data, count] = await builder.getManyAndCount();
        return this.toSearchResult<VwSdqTableListForStudent>(dto.paginator,count,data);
    }
    async create(dto:CreateSdqTableDto,req:CustomRequest):Promise<SdqTable>{   
       
        dto.emotionalBehaviorScore01 =(dto.choice01+dto.choice08+dto.choice13+dto.choice16+dto.choice24);
        dto.nomalBehaviorScore02 =  (dto.choice05+dto.choice07+dto.choice12+dto.choice18+dto.choice22) ;
        dto.ADHDBehaviorScore03 = (dto.choice02+dto.choice10+dto.choice15+dto.choice21+dto.choice25);
        dto.friendBehaviorScore04 =(dto.choice06+dto.choice11+dto.choice14+dto.choice19+dto.choice23);
        dto.socialBehaviorScore05 =(dto.choice01+dto.choice04+dto.choice09+dto.choice17+dto.choice20);
        dto.sumScore =(dto.emotionalBehaviorScore01+ dto.nomalBehaviorScore02 + dto.ADHDBehaviorScore03+ dto.friendBehaviorScore04+ dto.socialBehaviorScore05)
        if(dto.estimateType === 1){  //1 นักเรียนประเมินตนเอง
            if((dto.sumScore>=0)&&(dto.sumScore<=15)){
                dto.sumScore_value ='ปกติ';
            }else if((dto.sumScore>=16)&&(dto.sumScore<=18)){
                dto.sumScore_value ='เสี่ยง';
            }else{
                dto.sumScore_value  = 'มีปัญหา';
            }

            if((dto.emotionalBehaviorScore01>=0)&&(dto.emotionalBehaviorScore01<=4)){
                dto.emotionalBehaviorScore01_value ='ปกติ';
            }else{
                if( dto.emotionalBehaviorScore01 = 5 ){
                    dto.emotionalBehaviorScore01_value ='เสี่ยง';
                }else{
                    dto.emotionalBehaviorScore01_value ='มีปัญหา';
                }
            }
    
            if((dto.nomalBehaviorScore02>=0)&&(dto.nomalBehaviorScore02<=3)){
                dto.nomalBehaviorScore02_value ='ปกติ';
            }else{
                if( dto.nomalBehaviorScore02 = 4 ){
                    dto.nomalBehaviorScore02_value ='เสี่ยง';
                }else{
                    dto.nomalBehaviorScore02_value ='มีปัญหา';
                }
            }
    
            if((dto.ADHDBehaviorScore03>=0)&&(dto.ADHDBehaviorScore03<=5)){
                dto.ADHDBehaviorScore03_value ='ปกติ';
            }else{
                if( dto.ADHDBehaviorScore03 = 6 ){
                    dto.ADHDBehaviorScore03_value ='เสี่ยง';
                }else{
                    dto.ADHDBehaviorScore03_value ='มีปัญหา';
                }
            }
    
            if((dto.friendBehaviorScore04>=0)&&(dto.friendBehaviorScore04<=4)){
                dto.friendBehaviorScore04_value ='ปกติ';
            }else{
                if( dto.friendBehaviorScore04 = 5){
                    dto.friendBehaviorScore04_value ='เสี่ยง';
                }else{
                    dto.friendBehaviorScore04_value ='มีปัญหา';
                }
            }
            if(dto.socialBehaviorScore05<5){
                dto.socialBehaviorScore05_value ='ไม่มีจุดแข็ง';
            }else{
                dto.socialBehaviorScore05_value ='เป็นจุดแข็ง';
            }
        }
        if(dto.estimateType === 2){  //2. ครูประเมินนักเรียน 
            if((dto.sumScore>=0)&&(dto.sumScore<=13)){
                dto.sumScore_value ='ปกติ';
            }else if((dto.sumScore>=14)&&(dto.sumScore<=16)){
                dto.sumScore_value ='เสี่ยง';
            }else{
                dto.sumScore_value  = 'มีปัญหา';
            }
            if((dto.emotionalBehaviorScore01>=0)&&(dto.emotionalBehaviorScore01<=3)){
                dto.emotionalBehaviorScore01_value ='ปกติ';
            }else{
                if( dto.emotionalBehaviorScore01 = 4 ){
                    dto.emotionalBehaviorScore01_value ='เสี่ยง';
                }else{
                    dto.emotionalBehaviorScore01_value ='มีปัญหา';
                }
            }
    
            if((dto.nomalBehaviorScore02>=0)&&(dto.nomalBehaviorScore02<=3)){
                dto.nomalBehaviorScore02_value ='ปกติ';
            }else{
                if( dto.nomalBehaviorScore02 = 4 ){
                    dto.nomalBehaviorScore02_value ='เสี่ยง';
                }else{
                    dto.nomalBehaviorScore02_value ='มีปัญหา';
                }
            }
    
            if((dto.ADHDBehaviorScore03>=0)&&(dto.ADHDBehaviorScore03<=5)){
                dto.ADHDBehaviorScore03_value ='ปกติ';
            }else{
                if( dto.ADHDBehaviorScore03 = 6 ){
                    dto.ADHDBehaviorScore03_value ='เสี่ยง';
                }else{
                    dto.ADHDBehaviorScore03_value ='มีปัญหา';
                }
            }
    
            if((dto.friendBehaviorScore04>=0)&&(dto.friendBehaviorScore04<=4)){
                dto.friendBehaviorScore04_value ='ปกติ';
            }else{
                if( dto.friendBehaviorScore04 = 5){
                    dto.friendBehaviorScore04_value ='เสี่ยง';
                }else{
                    dto.friendBehaviorScore04_value ='มีปัญหา';
                }
            }
            if(dto.socialBehaviorScore05<5){
                dto.socialBehaviorScore05_value ='ไม่มีจุดแข็ง';
            }else{
                dto.socialBehaviorScore05_value ='เป็นจุดแข็ง';
            }
        }
        if(dto.estimateType === 3){//3.ผู้ปกครองประเมินนักเรียน
            if((dto.sumScore>=0)&&(dto.sumScore<=15)){
                dto.sumScore_value ='ปกติ';
            }else if((dto.sumScore>=16)&&(dto.sumScore<=18)){
                dto.sumScore_value ='เสี่ยง';
            }else{
                dto.sumScore_value  = 'มีปัญหา';
            }
            if((dto.emotionalBehaviorScore01>=0)&&(dto.emotionalBehaviorScore01<=4)){
                dto.emotionalBehaviorScore01_value ='ปกติ';
            }else{
                if( dto.emotionalBehaviorScore01 = 5 ){
                    dto.emotionalBehaviorScore01_value ='เสี่ยง';
                }else{
                    dto.emotionalBehaviorScore01_value ='มีปัญหา';
                }
            }
    
            if((dto.nomalBehaviorScore02>=0)&&(dto.nomalBehaviorScore02<=4)){
                dto.nomalBehaviorScore02_value ='ปกติ';
            }else{
                if( dto.nomalBehaviorScore02 = 5 ){
                    dto.nomalBehaviorScore02_value ='เสี่ยง';
                }else{
                    dto.nomalBehaviorScore02_value ='มีปัญหา';
                }
            }
    
            if((dto.ADHDBehaviorScore03>=0)&&(dto.ADHDBehaviorScore03<=5)){
                dto.ADHDBehaviorScore03_value ='ปกติ';
            }else{
                if( dto.ADHDBehaviorScore03 = 6 ){
                    dto.ADHDBehaviorScore03_value ='เสี่ยง';
                }else{
                    dto.ADHDBehaviorScore03_value ='มีปัญหา';
                }
            }
    
            if((dto.friendBehaviorScore04>=0)&&(dto.friendBehaviorScore04<=4)){
                dto.friendBehaviorScore04_value ='ปกติ';
            }else{
                if( dto.friendBehaviorScore04 = 5){
                    dto.friendBehaviorScore04_value ='เสี่ยง';
                }else{
                    dto.friendBehaviorScore04_value ='มีปัญหา';
                }
            }
            if(dto.socialBehaviorScore05<5){
                dto.socialBehaviorScore05_value ='ไม่มีจุดแข็ง';
            }else{
                dto.socialBehaviorScore05_value ='เป็นจุดแข็ง';
            }
        }
        
        dto.evaluateId = req.user.id; 
        dto.evaluateDate = new Date(); 
     
        const en = this.toCreateModel(dto,req) as SdqTable  
        return await this.sdqtableRepository.save(
            this.sdqtableRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateSdqTableDto,req:CustomRequest):Promise<SdqTableDto>{
        const m = await this.sdqtableRepository.findOne({where:{id:id}})
        return await this.sdqtableRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<SdqTableDto>{
        let m = await this.sdqtableRepository.findOne({where:{id:id}})
        return await this.sdqtableRepository.softRemove(
            await this.sdqtableRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
    async initial(id:number):Promise<any>{
        let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
       // console.log("yearInit",yearInit)
        let std = await this.itemStudentRepository.findOne({where:{id:id}})
        var atSemester =null;
        var atYear=null;
if(yearInit!=undefined){
    atYear=yearInit.year;
    atSemester =yearInit.term;
}
        return {
            atYear: atYear, 
            atSemester: atSemester,
            title:std.title,
            firstname : std.firstname,
            lastname: std.lastname,
            classroomTypeValue:std.classroomTypeValue,
            birthDate:std.birthDate
        }
    }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }
      async listForTeacher(dto:SearchStudentDto):Promise<SearchResult<VwSdqTableListForTeacher>>{

        const builder = this.createQueryBuider<VwSdqTableListForTeacher>(dto,this.vwSdqTableListForTeacherRepository)
       console.log(builder.getSql())
        const [data, count] = await builder.getManyAndCount();
         return this.toSearchResult<VwSdqTableListForTeacher>(dto.paginator,count,data);
     }
     async listForParent(dto:SearchStudentDto):Promise<SearchResult<VwSdqTableListForParent>>{
      
        const builder = this.createQueryBuider<VwSdqTableListForParent>(dto,this.vwSdqTableListForParentRepository)
       console.log(builder.getSql())
        const [data, count] = await builder.getManyAndCount();
         return this.toSearchResult<VwSdqTableListForParent>(dto.paginator,count,data);
     }

     async getClassOfTeacher(id:number):Promise<any>{
        return await this.itemTeacherRepository.findOne({where:{id:id}})
      
    }
    async getSdqParentCurrenyStorage(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{studentId:id , estimateType:3}})
      
    }
}
