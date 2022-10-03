import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { MoreThan, Not, Repository } from 'typeorm';
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
        return this.reportStudentFilterSumarize.find()
    }
    async getReportStudentFilterByClass() {
        return this.reportStudentFilterByClass.find()
    }
    async getReportStudentFilterByClassAndRoom() {
        return this.reportStudentFilterByClassAndRoom.find({where:[
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
    }
    async getReportStudentFilterByRoom() {
        return this.reportStudentFilterByRoom.find()
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
        ){
        super()
    }


    
}
