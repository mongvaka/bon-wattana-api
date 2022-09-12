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
         let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
         let std = await this.itemStudentRepository.findOne({where:{id:id}})
         let sdq=  await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:1}})
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
            birthDate:std.birthDate,
            choice01: sdq.choice01 ,
            choice02: sdq.choice02,
            choice03: sdq.choice03,
            choice04: sdq.choice04 ,
            choice05: sdq.choice05 ,
            choice06: sdq.choice06,
            choice07: sdq.choice07,
            choice08: sdq.choice08,
            choice09: sdq.choice09,
            choice10: sdq.choice10,
            choice11: sdq.choice11,
            choice12: sdq.choice12,
            choice13: sdq.choice13,
            choice14: sdq.choice14,
            choice15: sdq.choice15,
            choice16: sdq.choice16,
            choice17: sdq.choice17,
            choice18: sdq.choice18,
            choice19: sdq.choice19,
            choice20: sdq.choice20,
            choice21: sdq.choice21,
            choice22: sdq.choice22,
            choice23: sdq.choice23,
            choice24: sdq.choice24,
            choice25: sdq.choice25,
            sdq_id:sdq.id
        }
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
     //  console.log(builder.getSql())
        const [data, count] = await builder.getManyAndCount();
         return this.toSearchResult<VwSdqTableListForTeacher>(dto.paginator,count,data);
     }
     async listForParent(dto:SearchStudentDto):Promise<SearchResult<VwSdqTableListForParent>>{
      
        const builder = this.createQueryBuider<VwSdqTableListForParent>(dto,this.vwSdqTableListForParentRepository)
       //console.log(builder.getSql())
        const [data, count] = await builder.getManyAndCount();
         return this.toSearchResult<VwSdqTableListForParent>(dto.paginator,count,data);
     }
     async getSDQCurrentTermDataSTD(id:number):Promise<any>{
        let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
        let sdqCurrentTermData = await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:1}})
     if(sdqCurrentTermData!=undefined){
        return true;
     }else{
        return false;
     }
    }
    async itemparentsdq(id:number):Promise<any>{
        let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
        let std = await this.itemStudentRepository.findOne({where:{id:id}})
        let sdq=  await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:3}})
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
           birthDate:std.birthDate,
           choice01: sdq.choice01 ,
           choice02: sdq.choice02,
           choice03: sdq.choice03,
           choice04: sdq.choice04 ,
           choice05: sdq.choice05 ,
           choice06: sdq.choice06,
           choice07: sdq.choice07,
           choice08: sdq.choice08,
           choice09: sdq.choice09,
           choice10: sdq.choice10,
           choice11: sdq.choice11,
           choice12: sdq.choice12,
           choice13: sdq.choice13,
           choice14: sdq.choice14,
           choice15: sdq.choice15,
           choice16: sdq.choice16,
           choice17: sdq.choice17,
           choice18: sdq.choice18,
           choice19: sdq.choice19,
           choice20: sdq.choice20,
           choice21: sdq.choice21,
           choice22: sdq.choice22,
           choice23: sdq.choice23,
           choice24: sdq.choice24,
           choice25: sdq.choice25,
           sdq_id:sdq.id
       }
   }
   async getSDQCurrentTermDataPRT(id:number):Promise<any>{
    let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
    let sdqCurrentTermData = await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:3}})
 if(sdqCurrentTermData!=undefined){
    return true;
 }else{
    return false;
 }
}
async getSDQCurrentTermDataTeacher(id:number):Promise<any>{
    let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
    let sdqCurrentTermData = await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:2}})
 if(sdqCurrentTermData!=undefined){
    return true;
 }else{
    return false;
 }
}
async itemTeacherSdq(id:number):Promise<any>{
    let yearInit =await this.itemYearTermRepository.findOne({where:{isParent:true}})
    let std = await this.itemStudentRepository.findOne({where:{id:id}})
    let sdq=  await this.itemRepository.findOne({where:{studentId:id,atSemester:yearInit.term,atYear:yearInit.year,estimateType:2}})
    console.log(sdq)
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
       birthDate:std.birthDate,
       choice01: sdq.choice01 ,
       choice02: sdq.choice02,
       choice03: sdq.choice03,
       choice04: sdq.choice04 ,
       choice05: sdq.choice05 ,
       choice06: sdq.choice06,
       choice07: sdq.choice07,
       choice08: sdq.choice08,
       choice09: sdq.choice09,
       choice10: sdq.choice10,
       choice11: sdq.choice11,
       choice12: sdq.choice12,
       choice13: sdq.choice13,
       choice14: sdq.choice14,
       choice15: sdq.choice15,
       choice16: sdq.choice16,
       choice17: sdq.choice17,
       choice18: sdq.choice18,
       choice19: sdq.choice19,
       choice20: sdq.choice20,
       choice21: sdq.choice21,
       choice22: sdq.choice22,
       choice23: sdq.choice23,
       choice24: sdq.choice24,
       choice25: sdq.choice25,
       sdq_id:sdq.id
   }
}
}
