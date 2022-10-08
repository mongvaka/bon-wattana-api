import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { MoreThan, Not, Repository } from 'typeorm';
import { ClassroomType } from '../classroom-type/classroom-type.entity';
import { Classroom } from '../classroom/classroom.entity';
import { EReportType } from '../export-pdf/enum/report-enum';
import { ExportPdfService } from '../export-pdf/export-pdf.service';
import { DataRowModel, HeaderReport } from '../export-pdf/interface/interface';
import { StudentConsultant } from '../student-consultant/student-consultant.entity';
import { StudentService } from '../student/student.service';
import { YearTerm } from '../year-term/year-term.entity';
import { ReportCheckStudentSumarize } from './check-student.entity';
import { ReportEqSumarize, ReportEqByRoom, ReportEqByClass, ReportEqByClassAndRoom } from './eq.entity';
import { ReportHomvisitSumarize } from './home-visit.entity';
import { ReportDepressionSumarize, ReportDepressionByClass, ReportDepressionByClassAndRoom, ReportDepressionByRoom } from './report-depression.entity';
import { ReportStudentFilterSumarize, ReportStudentFilterByClass, ReportStudentFilterByClassAndRoom, ReportStudentFilterByRoom, ReportStudentFilterSumarizeByClassAndRoom, ReportStudentFilterPosonal } from './report-student-filter.entity';
import { ReportStudentHelpByClass, ReportStudentHelpByRoom, ReportStudentHelpByClassAndRoom } from './report-student-help.entity';
import { ReportStudentScolarByClass, ReportStudentScolarByRoom, ReportStudentScolarByClassAndRoom } from './report-student-scolar.entity';
import { ReportStudentSendToByClass, ReportStudentSendToByRoom, ReportStudentSendToByClassAndRoom, ReportStudentSendToSumarize } from './report-student-send-to.entity';
import { CreateYearTermDto, YearTermDto, SearchYearTermDto, UpdateYearTermDto } from './report.dto';
import { ReportStudentByClass, ReportStudentByRoom, ReportStudentSumarize } from './report.entity';
import { ReportStressSumarize, ReportStressByClass, ReportStressByClassAndRoom, ReportStressByRoom } from './stress-report.entity';
import { ReportTeacherBySubject, ReportTeacherSumarize } from './teacher.entity';

@Injectable()
export class ReportService extends BaseService {
   checkStudentSumarize(): any {
        return this.checkStudentSumarizeRepository.find()
    }
    teacherBySubject(): any {
        return this.teacherBySubjectRepository.find()
    }
    teacherSumarize(): any {
        return this.teacherSumarizeRepository.find()
    }
    async studentSumarize() {
      return this.studentSumarizeRepository.find()
    }
    async studentByclass() {
        return this.studentByClassRepository.find()
    }
    async studentByroom() {
        return this.studentByRoomRepository.find()
    }






    async getReportEqSumarize() {
        return this.reportEqSumarize.find()
    }
    async getReportEqByRoom() {
        return this.reportEqByRoom.find()
    }
    async getReportEqByClass() {
        return this.reportEqByClass.find()
    }
    async getReportEqByClassAndRoom() {
        return this.reportEqByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)},{value4:MoreThan(0)}]})
    }
    async getReportHomvisitSumarize() {
        return this.reportHomvisitSumarize.find()
    }
    async getReportDepressionSumarize() {
        return this.reportDepressionSumarize.find()
    }
    async getReportDepressionByClass() {
        return this.reportDepressionByClass.find()
    }
    async getReportDepressionByClassAndRoom() {
        return this.reportDepressionByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)},{value4:MoreThan(0)},{value5:MoreThan(0)}]})
    }
    async getReportDepressionByRoom() {
        return this.reportDepressionByRoom.find()
    }
    async getReportStudentFilterSumarize() {
        const result = await this.reportStudentFilterSumarize.find()
        let sumVa1:number = 0;
        let sumVa2:number = 0;
        let sumVa3:number = 0;
        
        result.forEach(en=>{
             sumVa1 += +(en.value1?en.value1:0)
             sumVa2 += +(en.value2?en.value2:0)
             sumVa3 += +(en.value3?en.value3:0)
           
        })
        result.push({
            name:' สรุปผลการคัดกรอง',
            value1:sumVa1,
            value2:sumVa2,
            value3:sumVa3,
           
        })
        // return this.exportPdfService.downloadPdf()
    }
    async getReportStudentFilterByClass() {
        const result =await this.reportStudentFilterByClass.find()
        let sumVa1:number = 0;
        let sumVa2:number = 0;
        let sumVa3:number = 0;
        let sumVa4:number = 0;
        let sumVa5:number = 0;
        let sumVa6:number = 0;
        let sumVa7:number = 0;
        let sumVa8:number = 0;
        let sumVa9:number = 0;
        let sumVa10:number = 0;
        let sumVa11:number = 0;
        let sumVa12:number = 0;
        let sumVa13:number = 0;
        let sumVa14:number = 0;
        let sumVa15:number = 0;
        let sumVa16:number = 0;
        let sumVa17:number = 0;
        let sumVa18:number = 0;
        let sumVa19:number = 0;
        let sumVa20:number = 0;
        let sumVa21:number = 0;
        let sumVa22:number = 0;
        let sumVa23:number = 0;
        let sumVa24:number = 0;
        let sumVa25:number = 0;
        let sumVa26:number = 0;
        let sumVa27:number = 0;
        let sumVa28:number = 0;
        let sumVa29:number = 0;
        let sumVa30:number = 0;
        result.forEach(en=>{
             sumVa1 += +(en.value1?en.value1:0)
             sumVa2 += +(en.value2?en.value2:0)
             sumVa3 += +(en.value3?en.value3:0)
             sumVa4 += +(en.value4?en.value4:0)
             sumVa5 += +(en.value5?en.value5:0)
             sumVa6 += +(en.value6?en.value6:0)
             sumVa7 += +(en.value7?en.value7:0)
             sumVa8 += +(en.value8?en.value8:0)
             sumVa9 += +(en.value9?en.value9:0)
             sumVa10 += +(en.value10?en.value10:0)
             sumVa11 += +(en.value11?en.value11:0)
             sumVa12 += +(en.value12?en.value12:0)
             sumVa13 += +(en.value13?en.value13:0)
             sumVa14 += +(en.value14?en.value14:0)
             sumVa15 += +(en.value15?en.value15:0)
             sumVa16 += +(en.value16?en.value16:0)
             sumVa17 += +(en.value17?en.value17:0)
             sumVa18 += +(en.value18?en.value18:0)
             sumVa19 += +(en.value19?en.value19:0)
             sumVa20 += +(en.value20?en.value20:0)
             sumVa21 += +(en.value21?en.value21:0)
             sumVa22 += +(en.value22?en.value22:0)
             sumVa23 += +(en.value23?en.value23:0)
             sumVa24 += +(en.value24?en.value24:0)
             sumVa25 += +(en.value25?en.value25:0)
             sumVa26 += +(en.value26?en.value26:0)
             sumVa27 += +(en.value27?en.value27:0)
             sumVa28 += +(en.value28?en.value28:0)
             sumVa29 += +(en.value29?en.value29:0)
             sumVa30 += +(en.value30?en.value30:0)
        })
        result.push({
            name1:'รวม',
            value1:sumVa1,
            value2:sumVa2,
            value3:sumVa3,
            value4:sumVa4,
            value5:sumVa5,
            value6:sumVa6,
            value7:sumVa7,
            value8:sumVa8,
            value9:sumVa9,
            value10:sumVa10,
            value11:sumVa11,
            value12:sumVa12,
            value13:sumVa13,
            value14:sumVa14,
            value15:sumVa15,
            value16:sumVa16,
            value17:sumVa17,
            value18:sumVa18,
            value19:sumVa19,
            value20:sumVa20,
            value21:sumVa21,
            value22:sumVa22,
            value23:sumVa23,
            value24:sumVa24,
            value25:sumVa25,
            value26:sumVa26,
            value27:sumVa27,
            value28:sumVa28,
            value29:sumVa29,
            value30:sumVa30,
        })
        const header:HeaderReport = {
            reportType:EReportType.SUMARIZE,
            reportName:'ผลการคัดกรองนักเรียน',
            year:'2556',
            term:'2',
            className:'ม.6'
        }
        const dataList:DataRowModel[] = result.map(m=>{return {
            name1:m.name1,
            name2:'',
            v1:m.value1,
            v2:m.value2,
            v3:m.value3,
            v4:m.value4,
            v5:m.value5,
            v6:m.value6,
            v7:m.value7,
            v8:m.value8,
            v9:m.value9,
            v10:m.value10,
            v11:m.value11,
            v12:m.value12,
            v13:m.value13,
            v14:m.value14,
            v15:m.value15,
            v16:m.value16,
            v17:m.value17,
            v18:m.value18,
            v19:m.value19,
            v20:m.value20,
            v21:m.value21,
            v22:m.value22,
            v23:m.value23,
            v24:m.value24,
            v25:m.value25,
            v26:m.value26,
            v27:m.value27,
            v28:m.value28,
            v29:m.value29,
            v30:m.value30,
           
        }}) 
        return this.exportPdfService.getStudentFilterReport(header,dataList)
    }
    async getReportStudentFilterByClassAndRoom() {
        const result = await this.reportStudentFilterByClassAndRoom.find({where:[
            {value2:MoreThan(0)},
            {value3:MoreThan(0)},
            {value4:MoreThan(0)},
            {value5:MoreThan(0)},
            {value6:MoreThan(0)},
            {value7:MoreThan(0)},
            {value8:MoreThan(0)},
            {value9:MoreThan(0)},
            {value10:MoreThan(0)},
            {value11:MoreThan(0)},
            {value12:MoreThan(0)},
            {value13:MoreThan(0)},
            {value14:MoreThan(0)},
            {value15:MoreThan(0)},
            {value16:MoreThan(0)},
            {value17:MoreThan(0)},
            {value18:MoreThan(0)},
            {value19:MoreThan(0)},
            {value20:MoreThan(0)},
            {value21:MoreThan(0)},
            {value22:MoreThan(0)},
            {value23:MoreThan(0)},
            {value24:MoreThan(0)},
            {value25:MoreThan(0)},
            {value26:MoreThan(0)},
            {value27:MoreThan(0)},
            {value28:MoreThan(0)},
            {value29:MoreThan(0)},
            {value30:MoreThan(0)},
        ]})
        let sumVa1:number = 0;
        let sumVa2:number = 0;
        let sumVa3:number = 0;
        let sumVa4:number = 0;
        let sumVa5:number = 0;
        let sumVa6:number = 0;
        let sumVa7:number = 0;
        let sumVa8:number = 0;
        let sumVa9:number = 0;
        let sumVa10:number = 0;
        let sumVa11:number = 0;
        let sumVa12:number = 0;
        let sumVa13:number = 0;
        let sumVa14:number = 0;
        let sumVa15:number = 0;
        let sumVa16:number = 0;
        let sumVa17:number = 0;
        let sumVa18:number = 0;
        let sumVa19:number = 0;
        let sumVa20:number = 0;
        let sumVa21:number = 0;
        let sumVa22:number = 0;
        let sumVa23:number = 0;
        let sumVa24:number = 0;
        let sumVa25:number = 0;
        let sumVa26:number = 0;
        let sumVa27:number = 0;
        let sumVa28:number = 0;
        let sumVa29:number = 0;
        let sumVa30:number = 0;
        result.forEach(en=>{
            sumVa1 += +(en.value1?en.value1:0)
             sumVa2 += +(en.value2?en.value2:0)
             sumVa3 += +(en.value3?en.value3:0)
             sumVa4 += +(en.value4?en.value4:0)
             sumVa5 += +(en.value5?en.value5:0)
             sumVa6 += +(en.value6?en.value6:0)
             sumVa7 += +(en.value7?en.value7:0)
             sumVa8 += +(en.value8?en.value8:0)
             sumVa9 += +(en.value9?en.value9:0)
             sumVa10 += +(en.value10?en.value10:0)
             sumVa11 += +(en.value11?en.value11:0)
             sumVa12 += +(en.value12?en.value12:0)
             sumVa13 += +(en.value13?en.value13:0)
             sumVa14 += +(en.value14?en.value14:0)
             sumVa15 += +(en.value15?en.value15:0)
             sumVa16 += +(en.value16?en.value16:0)
             sumVa17 += +(en.value17?en.value17:0)
             sumVa18 += +(en.value18?en.value18:0)
             sumVa19 += +(en.value19?en.value19:0)
             sumVa20 += +(en.value20?en.value20:0)
             sumVa21 += +(en.value21?en.value21:0)
             sumVa22 += +(en.value22?en.value22:0)
             sumVa23 += +(en.value23?en.value23:0)
             sumVa24 += +(en.value24?en.value24:0)
             sumVa25 += +(en.value25?en.value25:0)
             sumVa26 += +(en.value26?en.value26:0)
             sumVa27 += +(en.value27?en.value27:0)
             sumVa28 += +(en.value28?en.value28:0)
             sumVa29 += +(en.value29?en.value29:0)
             sumVa30 += +(en.value30?en.value30:0)
        })
        result.push({
            name1:'รวม',
            name2:'รวม',
            value1:sumVa1,
            value2:sumVa2,
            value3:sumVa3,
            value4:sumVa4,
            value5:sumVa5,
            value6:sumVa6,
            value7:sumVa7,
            value8:sumVa8,
            value9:sumVa9,
            value10:sumVa10,
            value11:sumVa11,
            value12:sumVa12,
            value13:sumVa13,
            value14:sumVa14,
            value15:sumVa15,
            value16:sumVa16,
            value17:sumVa17,
            value18:sumVa18,
            value19:sumVa19,
            value20:sumVa20,
            value21:sumVa21,
            value22:sumVa22,
            value23:sumVa23,
            value24:sumVa24,
            value25:sumVa25,
            value26:sumVa26,
            value27:sumVa27,
            value28:sumVa28,
            value29:sumVa29,
            value30:sumVa30,
        })
        const header:HeaderReport = {
            reportType:EReportType.CLASS,
            reportName:'ผลการคัดกรองนักเรียน',
            year:'2556',
            term:'2',
            className:'ม.6'
        }
        const dataList:DataRowModel[] = result.map(m=>{return {
            name1:m.name1,
            name2:m.name2,
            v1:m.value1,
            v2:m.value2,
            v3:m.value3,
            v4:m.value4,
            v5:m.value5,
            v6:m.value6,
            v7:m.value7,
            v8:m.value8,
            v9:m.value9,
            v10:m.value10,
            v11:m.value11,
            v12:m.value12,
            v13:m.value13,
            v14:m.value14,
            v15:m.value15,
            v16:m.value16,
            v17:m.value17,
            v18:m.value18,
            v19:m.value19,
            v20:m.value20,
            v21:m.value21,
            v22:m.value22,
            v23:m.value23,
            v24:m.value24,
            v25:m.value25,
            v26:m.value26,
            v27:m.value27,
            v28:m.value28,
            v29:m.value29,
            v30:m.value30,
           
        }}) 
        return this.exportPdfService.getStudentFilterReport(header,dataList)
    }
    async getReportStudentFilterByRoom(yearTermId:number,classroomId:number,classroomTypeId:number) {
        const yearTerm = await this.yearTerm.findOne({where:{id:yearTermId}})
        const classroom = await this.classroom.findOne({where:{id:classroomId}})
        if(!classroom){
            throw new BadRequestException({describe:'ไม่มีข้อมูลห้องเรียน'})
        }
        const classroomType = await this.classroomType.findOne({where:{id:classroomTypeId}})
        if(!classroomType){
            throw new BadRequestException({describe:'ไม่มีข้อมูลชั้นเรียน'})
        }
        const sumarize =await this.reportStudentFilterSumarizeByClassAndRoom.find({where:{yearTermId:yearTermId,classroomId:classroomId,classroomTypeId:classroomTypeId}})
        const personal = await this.reportStudentFilterPosonal.find({where:{classroomId:classroomId,classroomTypeId:classroomTypeId}})
        const personalMaped:DataRowModel[] = personal.map((m,i)=>{
            return {
                    name1:'',
                    name2:'',
                    v1:(i+1),
                    v2:m.studentValue,
                    v3:this.getNormalPerson(m.summarize), 
                    v4:this.getTextNormalPerson(m.sdq1,m.sdq2,m.sdq3),
                    v5:m.specialSkill,
                    v6:this.getNormalPersonTextA(m.lernStatus),
                    v7:this.getNormalPersonTextB(m.lernStatus),
                    v8:this.getNormalPersonTextA(m.healtyStatus),
                    v9:this.getNormalPersonTextB(m.healtyStatus),
                    v10:this.getNormalPersonTextA(m.feelingStatus),
                    v11:this.getNormalPersonTextB(m.feelingStatus),
                    v12:this.getNormalPersonTextA(m.sexualStatus),
                    v13:this.getNormalPersonTextB(m.sexualStatus),
                    v14:this.getNormalPersonTextA(m.drugStatus),
                    v15:this.getNormalPersonTextB(m.drugStatus),
                    v16:this.getNormalPersonTextA(m.gameStatus),
                    v17:this.getNormalPersonTextB(m.gameStatus),
                    v18:this.getNormalPersonTextA(m.economicStatus),
                    v19:this.getNormalPersonTextB(m.economicStatus),
                    v20:this.getNormalPersonTextA(m.securityStatus),
                    v21:this.getNormalPersonTextB(m.securityStatus),
                    v22:this.getNormalPersonTextA(m.specialStatus),
                    v23:this.getNormalPersonTextB(m.specialStatus),
                    v24:this.getNormalPersonTextA(m.electronicStatus),
                    v25:this.getNormalPersonTextB(m.electronicStatus),
                    v26:this.getNormalPersonText(m.summarize),
                    v27:'',
                    v28:'',
                    v29:'',
                    v30:''
   
            }
        })
        const sumarizeMaped:DataRowModel[] = sumarize.map(m=>{
            return {
                name1:'',
                name2:'',
                v1:m.name,
                v2:m.value1?m.value1:'-',
                v3:m.value2?m.value2:'-', 
                v4:m.value3?m.value3:'-',
                v5:'',
                v6:'',
                v7:'',
                v8:'',
                v9:'',
                v10:'',
                v11:'',
                v12:'',
                v13:'',
                v14:'',
                v15:'',
                v16:'',
                v17:'',
                v18:'',
                v19:'',
                v20:'',
                v21:'',
                v22:'',
                v23:'',
                v24:'',
                v25:'',
                v26:'',
                v27:'',
                v28:'',
                v29:'',
                v30:''
            }
        })
        const header:HeaderReport = {
            reportName:'',
            reportType:EReportType.ROOM,
            term:yearTerm.term,
            year:yearTerm.year,
            className:classroomType.typeName,
            roomName:classroom.name

        }
        return this.exportPdfService.getStudentFilterReportByRoom(header,personalMaped,sumarizeMaped)
    }
    getNormalPersonTextB(b: number): any {
        if(!b){
            return ''
        }
        if(b>1){
            return '/'
        }
        return ''
    }
    getNormalPersonTextA(a: number): any {
        if(a==1){
            return '/'
        }
        return ''
    }
    getNormalPersonText(lernStatus: number): any {
        if(!lernStatus){
            return ''
        }
        if(lernStatus >1){
            return 'ส'
        }
        return 'ป'
    }
    getTextNormalPerson(sdq1: string, sdq2: string, sdq3: string): any {
        if(sdq1 == 'มีปัญหา'|| sdq2 == 'มีปัญหา'|| sdq3 == 'มีปัญหา'||sdq1 == 'เสี่ยง'|| sdq2 == 'เสี่ยง'|| sdq3 == 'เสี่ยง'){
            return 'ส'
        }
        return 'ป'
    }
    getNormalPerson(summarize: number): any {
        if(!summarize){
            return ''
        }
        if(summarize<3){
            return '-'
        }
        return '/'
    }
    async getReportStudentHelpByClass() {
        return this.reportStudentHelpByClass.find()
    }
    async getReportStudentHelpByRoom() {
        return this.reportStudentHelpByRoom.find()
    }
    async getReportStudentHelpByClassAndRoom() {
        return this.reportStudentHelpByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)}]})
    }
    async getReportStudentScolarByClass() {
        return this.reportStudentScolarByClass.find()
    }
    async getReportStudentScolarByRoom() {
        return this.reportStudentScolarByRoom.find()
    }
    async getReportStudentScolarByClassAndRoom() {
        return this.reportStudentScolarByClassAndRoom.find({where:[{value2:MoreThan(0)}]})
    }
    async getReportStudentSendToByClass() {
        return this.reportStudentSendToByClass.find()
    }
    async getReportStudentSendToByRoom() {
        return this.reportStudentSendToByRoom.find()
    }
    async getReportStudentSendToByClassAndRoom() {
        return this.reportStudentSendToByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)}]})
    }
    async getReportStudentSendToSumarize() {
        return this.reportStudentSendToSumarize.find()
    }
    
    async getReportStressSumarize() {
        return this.reportStressSumarize.find()
    }
    async getReportStressByClass() {
        return this.reportStressByClass.find()
    }
    async getReportStressByClassAndRoom() {
        return this.reportStressByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)},{value4:MoreThan(0)},{value5:MoreThan(0)}]})
    }
    async getReportStressByRoom() {
        return this.reportStressByRoom.find()
    }
    // async getReportStudentConsultant() {
    //     const sumConsult = await this.studentConsultant.count({where:{deletedAt:null,sentType:Not(null)}})
    //     const sumSentTo = await this.studentConsultant.count({where:{deletedAt:null,storyType:3}})
    //     return [
    //     {
    //         name:'นักเรียนที่รับคำปรึกษา',
    //         value1:sumConsult
    //     },
    //     {
    //         name:'นักเรียนที่ส่งต่อ',
    //         value1:sumSentTo
    //     }
    // ]
    // }
    
    constructor(
        @InjectRepository(ReportStudentByClass)
        private readonly studentByClassRepository: Repository<ReportStudentByClass>,
        @InjectRepository(ReportStudentByRoom)
        private readonly studentByRoomRepository: Repository<ReportStudentByRoom>,
        @InjectRepository(ReportStudentSumarize)
        private readonly studentSumarizeRepository: Repository<ReportStudentSumarize>,
        @InjectRepository(ReportTeacherBySubject)
        private readonly teacherBySubjectRepository: Repository<ReportTeacherBySubject>,
        @InjectRepository(ReportTeacherSumarize)
        private readonly teacherSumarizeRepository: Repository<ReportTeacherSumarize>,
        @InjectRepository(ReportCheckStudentSumarize)
        private readonly checkStudentSumarizeRepository: Repository<ReportCheckStudentSumarize>,
        @InjectRepository(ReportEqSumarize)
        private readonly reportEqSumarize: Repository<ReportEqSumarize>,
        @InjectRepository(ReportEqByRoom)
        private readonly reportEqByRoom: Repository<ReportEqByRoom>,
        @InjectRepository(ReportEqByClass)
        private readonly reportEqByClass: Repository<ReportEqByClass>,
        @InjectRepository(ReportEqByClassAndRoom)
        private readonly reportEqByClassAndRoom: Repository<ReportEqByClassAndRoom>,
        @InjectRepository(ReportHomvisitSumarize)
        private readonly reportHomvisitSumarize: Repository<ReportHomvisitSumarize>,
        @InjectRepository(ReportDepressionSumarize)
        private readonly reportDepressionSumarize: Repository<ReportDepressionSumarize>,
        @InjectRepository(ReportDepressionByClass)
        private readonly reportDepressionByClass: Repository<ReportDepressionByClass>,
        @InjectRepository(ReportDepressionByClassAndRoom)
        private readonly reportDepressionByClassAndRoom: Repository<ReportDepressionByClassAndRoom>,
        @InjectRepository(ReportDepressionByRoom)
        private readonly reportDepressionByRoom: Repository<ReportDepressionByRoom>,
        @InjectRepository(ReportStudentFilterSumarize)
        private readonly reportStudentFilterSumarize: Repository<ReportStudentFilterSumarize>,
        @InjectRepository(ReportStudentFilterByClass)
        private readonly reportStudentFilterByClass: Repository<ReportStudentFilterByClass>,
        @InjectRepository(ReportStudentFilterByClassAndRoom)
        private readonly reportStudentFilterByClassAndRoom: Repository<ReportStudentFilterByClassAndRoom>,
        @InjectRepository( ReportStudentFilterByRoom)
        private readonly reportStudentFilterByRoom: Repository<ReportStudentFilterByRoom>,
        @InjectRepository(ReportStudentHelpByClass)
        private readonly reportStudentHelpByClass: Repository<ReportStudentHelpByClass>,
        @InjectRepository(ReportStudentHelpByRoom)
        private readonly reportStudentHelpByRoom: Repository<ReportStudentHelpByRoom>,
        @InjectRepository(ReportStudentHelpByClassAndRoom)
        private readonly reportStudentHelpByClassAndRoom: Repository<ReportStudentHelpByClassAndRoom>,
        @InjectRepository(ReportStudentScolarByClass)
        private readonly reportStudentScolarByClass: Repository<ReportStudentScolarByClass>,
        @InjectRepository(ReportStudentScolarByRoom)
        private readonly reportStudentScolarByRoom: Repository<ReportStudentScolarByRoom>,
        @InjectRepository(ReportStudentScolarByClassAndRoom)
        private readonly reportStudentScolarByClassAndRoom: Repository<ReportStudentScolarByClassAndRoom>,
        @InjectRepository(ReportStudentSendToByClass)
        private readonly reportStudentSendToByClass: Repository<ReportStudentSendToByClass>,
        @InjectRepository(ReportStudentSendToByRoom)
        private readonly reportStudentSendToByRoom: Repository<ReportStudentSendToByRoom>,
        @InjectRepository(ReportStudentSendToByClassAndRoom)
        private readonly reportStudentSendToByClassAndRoom: Repository<ReportStudentSendToByClassAndRoom>,
        @InjectRepository(ReportStudentSendToSumarize)
        private readonly reportStudentSendToSumarize: Repository<ReportStudentSendToSumarize>,
        
        @InjectRepository(ReportStressSumarize)
        private readonly reportStressSumarize: Repository<ReportStressSumarize>,
        @InjectRepository(ReportStressByClass)
        private readonly reportStressByClass: Repository<ReportStressByClass>,
        @InjectRepository(ReportStressByClassAndRoom)
        private readonly reportStressByClassAndRoom: Repository<ReportStressByClassAndRoom>,
        @InjectRepository(ReportStressByRoom)
        private readonly reportStressByRoom: Repository<ReportStressByRoom>,
        @InjectRepository(ReportStudentFilterSumarizeByClassAndRoom)
        private readonly reportStudentFilterSumarizeByClassAndRoom: Repository<ReportStudentFilterSumarizeByClassAndRoom>,
        @InjectRepository(ReportStudentFilterPosonal)
        private readonly reportStudentFilterPosonal: Repository<ReportStudentFilterPosonal>,

        @InjectRepository(Classroom)
        private readonly classroom: Repository<Classroom>,
        @InjectRepository(ClassroomType)
        private readonly classroomType: Repository<ClassroomType>,
        @InjectRepository(YearTerm)
        private readonly yearTerm: Repository<YearTerm>,
        private readonly exportPdfService:ExportPdfService
        ){
        super()
    }


    
}
