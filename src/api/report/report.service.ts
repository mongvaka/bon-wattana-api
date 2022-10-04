import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { MoreThan, Not, Repository } from 'typeorm';
import { ExportPdfService } from '../export-pdf/export-pdf.service';
import { StudentConsultant } from '../student-consultant/student-consultant.entity';
import { StudentService } from '../student/student.service';
import { ReportCheckStudentSumarize } from './check-student.entity';
import { ReportEqSumarize, ReportEqByRoom, ReportEqByClass, ReportEqByClassAndRoom } from './eq.entity';
import { ReportHomvisitSumarize } from './home-visit.entity';
import { ReportDepressionSumarize, ReportDepressionByClass, ReportDepressionByClassAndRoom, ReportDepressionByRoom } from './report-depression.entity';
import { ReportStudentFilterSumarize, ReportStudentFilterByClass, ReportStudentFilterByClassAndRoom, ReportStudentFilterByRoom } from './report-student-filter.entity';
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
        return this.exportPdfService.downloadPdf()
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
        return result
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
            name1:'',
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
        return result
    }
    async getReportStudentFilterByRoom() {
        const result =await this.reportStudentFilterByRoom.find()
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
        return result
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
        // @InjectRepository(StudentConsultant)
        // private readonly studentConsultant: Repository<StudentConsultant>,
        private readonly exportPdfService:ExportPdfService
        ){
        super()
    }


    
}
