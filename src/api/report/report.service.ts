import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { MoreThan, Not, Repository } from 'typeorm';
import { ClassroomType, VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';
import { SearchClassroomDto } from '../classroom/classroom.dto';
import { Classroom, VwClassroomDropdown } from '../classroom/classroom.entity';
import { EReportType } from '../export-pdf/enum/report-enum';
import { ExportPdfService } from '../export-pdf/export-pdf.service';
import { DataRowModel, HeaderReport } from '../export-pdf/interface/interface';
import { ISumarizeRoomDepressionReport } from '../export-pdf/libs/depression-report/room-depression-report';
import { StudentConsultant } from '../student-consultant/student-consultant.entity';
import { StudentService } from '../student/student.service';
import { VwYearTermDropdown, YearTerm } from '../year-term/year-term.entity';
import { YearTermService } from '../year-term/year-term.service';
import { ReportCheckStudentSumarize } from './check-student.entity';
import { ReportEqSumarize, ReportEqByRoom, ReportEqByClass, ReportEqByClassAndRoom } from './eq.entity';
import { ReportHomvisitSumarize } from './home-visit.entity';
import { ReportDepressionSumarize, ReportDepressionByClass, ReportDepressionByClassAndRoom, ReportDepressionPesonal } from './report-depression.entity';
import { ReportStudentFilterSumarize, ReportStudentFilterByClass, ReportStudentFilterByClassAndRoom, ReportStudentFilterByRoom, ReportStudentFilterSumarizeByClassAndRoom, ReportStudentFilterPosonal } from './report-student-filter.entity';
import { ReportStudentHelpByClass, ReportStudentHelpByRoom, ReportStudentHelpByClassAndRoom } from './report-student-help.entity';
import { ReportStudentScolarByClass, ReportStudentScolarByRoom, ReportStudentScolarByClassAndRoom } from './report-student-scolar.entity';
import { ReportStudentSendToByClass, ReportStudentSendToByRoom, ReportStudentSendToByClassAndRoom, ReportStudentSendToSumarize } from './report-student-send-to.entity';
import { CreateYearTermDto, YearTermDto, SearchYearTermDto, UpdateYearTermDto, ExportPdfDto } from './report.dto';
import { ReportStudentByClass, ReportStudentByRoom, ReportStudentSumarize } from './report.entity';
import { ReportStressSumarize, ReportStressByClass, ReportStressByClassAndRoom, ReportStressByRoom } from './stress-report.entity';
import { ReportTeacherBySubject, ReportTeacherSumarize } from './teacher.entity';

@Injectable()
export class ReportService extends BaseService {
  async downloadReport(dto: ExportPdfDto) {
    switch(dto.reportName){
        case'DEPRESSION':
            return this.depresstionReport(dto)
        case 'STUDENT_FILTER':
            return this.studentFilterReport(dto)
        case 'HOME_VISIT':
            return this.homeVisitReport(dto)
        case 'CHECK_STUDENT':
            return this.checkStudentReport(dto)
        case 'SDQ_TEACHER':
            return this.sdqTeacherReport(dto)
        case 'SDQ_STUDENT':
            return this.sdqStudentReport(dto)
        case 'SDQ_PARENT':
            return this.sdqParentReport(dto)
        case 'STRESS':
            return this.stressReport(dto)
        case 'EQ':
            return this.eqReport(dto)
        case 'STUDENT_SUPPORT':
            return this.studentSupportReport(dto)
        case 'STUDENT_CONSULT':
            return this.studentConsultReport(dto)
        case 'STUDENT_SCOLAR':
            return this.studentScolarReport(dto)
        case 'STUDENT_HELP':
            return this.studentHelpReport(dto)
        case 'STUDENT_SEND_TO':
            return this.studentSendtoReport(dto)

    }
  }
    homeVisitReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportHomeVisitReport (dto)
            case 'CLASS':
                return this.getReportHomeVisitReportByClass(dto)
            case 'ROOM':
                return this.getReportHomeVisitReportByRoom(dto)
        }
    }
    getReportHomeVisitReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportHomeVisitReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportHomeVisitReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    checkStudentReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportCheckStudentReport (dto)
            case 'CLASS':
                return this.getReportCheckStudentReportByClass(dto)
            case 'ROOM':
                return this.getReportCheckStudentReportByRoom(dto)
        }
    }
    getReportCheckStudentReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportCheckStudentReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportCheckStudentReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    sdqTeacherReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportSdqTeacherReport (dto)
            case 'CLASS':
                return this.getReportSdqTeacherReportByClass(dto)
            case 'ROOM':
                return this.getReportSdqTeacherReportByRoom(dto)
        }
    }
    getReportSdqTeacherReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqTeacherReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqTeacherReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    sdqStudentReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportSdqStudentReport (dto)
            case 'CLASS':
                return this.getReportSdqStudentReportByClass(dto)
            case 'ROOM':
                return this.getReportSdqStudentReportByRoom(dto)
        }
    }
    getReportSdqStudentReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqStudentReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqStudentReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    sdqParentReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportSdqParentReport (dto)
            case 'CLASS':
                return this.getReportSdqParentReportByClass(dto)
            case 'ROOM':
                return this.getReportSdqParentReportByRoom(dto)
        }
    }
    getReportSdqParentReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqParentReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportSdqParentReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    stressReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStressReport (dto)
            case 'CLASS':
                return this.getReportStressReportByClass(dto)
            case 'ROOM':
                return this.getReportStressReportByRoom(dto)
        }
    }
    getReportStressReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStressReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStressReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    eqReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportEqReport (dto)
            case 'CLASS':
                return this.getReportEqReportByClass(dto)
            case 'ROOM':
                return this.getReportEqReportByRoom(dto)
        }
    }
    getReportEqReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportEqReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportEqReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentSupportReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentSupportReport (dto)
            case 'CLASS':
                return this.getReportStudentSupportReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentSupportReportByRoom(dto)
        }
    }
    getReportStudentSupportReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentSupportReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentSupportReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentConsultReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentConsultReport (dto)
            case 'CLASS':
                return this.getReportStudentConsultReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentConsultReportByRoom(dto)
        }
    }
    getReportStudentConsultReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentConsultReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentConsultReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentScolarReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentScolarReport (dto)
            case 'CLASS':
                return this.getReportStudentScolarReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentScolarReportByRoom(dto)
        }
    }
    getReportStudentScolarReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentScolarReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentScolarReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentHelpReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentHelpReport (dto)
            case 'CLASS':
                return this.getReportStudentHelpReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentHelpReportByRoom(dto)
        }
    }
    getReportStudentHelpReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentHelpReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentHelpReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentSendtoReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentSendtoReport (dto)
            case 'CLASS':
                return this.getReportStudentSendtoReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentSendtoReportByRoom(dto)
        }
    }
    getReportStudentSendtoReport(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentSendtoReportByClass(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    getReportStudentSendtoReportByRoom(dto: ExportPdfDto) {
        throw new Error('Method not implemented.');
    }
    studentFilterReport(dto: ExportPdfDto) {        
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStudentFilter(dto)
            case 'CLASS':
                return this.getReportStudentFilterByClass(dto)
            case 'ROOM':
                return this.getReportStudentFilterByRoom(dto)
        }
    }
   async depresstionReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportDepression(dto)
            case 'CLASS':
                return this.getReportDepressionByRoom(dto)
            case 'ROOM':
                return this.getReportDepressionByClass(dto)
        }
    }
    async classroomDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomDropdown(dto,this.vwDropdownClassroomRepository);
      }
      async classroomTypeDropdown(dto: SearchClassroomDto):Promise<SelectItems[]> {
        return this.dropdownService.classroomTypeDropdown(dto,this.vwDropdownClassroomTypeRepository);
      }

      async currentTerm() {
        return this.yearTermService.findCurrrentTerm()
     }
     async yearTermDropdown(dto: SearchYearTermDto):Promise<SelectItems[]> {
        return await this.dropdownService.yeartermDropdown(dto,this.vwDropdownYearTermRepository);
      }
//    checkStudentSumarize(): any {
//         return this.checkStudentSumarizeRepository.find()
//     }
//     teacherBySubject(): any {
//         return this.teacherBySubjectRepository.find()
//     }
//     teacherSumarize(): any {
//         return this.teacherSumarizeRepository.find()
//     }
//     async studentSumarize() {
//       return this.studentSumarizeRepository.find()
//     }
//     async studentByclass() {
//         return this.studentByClassRepository.find()
//     }
//     async studentByroom() {
//         return this.studentByRoomRepository.find()
//     }
//     async getReportEqSumarize() {
//         return this.reportEqSumarize.find()
//     }
//     async getReportEqByRoom() {
//         return this.reportEqByRoom.find()
//     }
//     async getReportEqByClass() {
//         return this.reportEqByClass.find()
//     }
//     async getReportEqByClassAndRoom() {
//         return this.reportEqByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)},{value4:MoreThan(0)}]})
//     }
//     async getReportHomvisitSumarize() {
//         return this.reportHomvisitSumarize.find()
//     }
    async getReportDepression(dto:ExportPdfDto) {
        const result = await this.reportDepressionPesonal.find({where:{yearTermId:dto.yearTermId},order:{classId:'ASC',roomId:'ASC',studentNumber:'ASC'}})
        const headerName = 'รายงานผลประเมินโรคซึมเศร้าของนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.studentValue,
                v2:m.className,
                v3:m.roomName,
                v4:m.studentNumber??'',
                v5:m.depressionValue,
                v6:m.sucuidValue,
                v7:this.getDateLabel(m.updatedAt) ,
            }
        })
        const allClass = await this.classroomType.find({where:{active:true},order:{id:'ASC'}})
        const depression = this.getDepressionBySumarize(allClass,result)
        const sucuid = this.getSucuidBySumarize(allClass,result)
        return this.exportPdfService.getDepressionReportSumarize(header,dataList,depression,sucuid)
    }
    getSucuidBySumarize(allClass: ClassroomType[], result: ReportDepressionPesonal[]) {
        const sumList:DataRowModel[] = []
        allClass.forEach(el=>{
            const model:DataRowModel = {
                v1:el.typeName,
                v2:this.getSumNoneSucuidByClass(result,el.id),
                v3:this.getSumLitleSucuidByClass(result,el.id),
                v4:this.getSumMeduimSucuidByClass(result,el.id),
                v5:this.getSumStrongSucuidByClass(result,el.id)
            }
            sumList.push(model)
        })
        return sumList
    }
    getDepressionBySumarize(allClass: ClassroomType[], result: ReportDepressionPesonal[]) {
        const sumList:DataRowModel[] = []
        allClass.forEach(el=>{
            const model:DataRowModel = {
                v1:el.typeName,
                v2:this.getSumNoneDepressionByClass(result,el.id),
                v3:this.getSumLitleDepressionByClass(result,el.id),
                v4:this.getSumMeduimDeprssionByClass(result,el.id),
                v5:this.getSumStrongDepressionByClass(result,el.id)
            }
            sumList.push(model)
        })
        return sumList
    }
    async getReportDepressionByClass(dto:ExportPdfDto) {
        const result = await this.reportDepressionPesonal.find({where:{classId:dto.classId,yearTermId:dto.yearTermId},order:{classId:'ASC',roomId:'ASC',studentNumber:'ASC'}})
        const headerName = 'รายงานผลประเมินโรคซึมเศร้าของนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.studentValue,
                v2:m.roomName,
                v3:m.studentNumber??'',
                v4:m.depressionValue,
                v5:m.sucuidValue,
                v6:this.getDateLabel(m.updatedAt) ,
            }
        })
        const allRoom = await this.classroom.find({where:{active:true},order:{id:'ASC'}})
        const depression = this.getDepressionByClass(allRoom,result)
        const sucuid = this.getSucuidByClass(allRoom,result)
        return this.exportPdfService.getDepressionReportByClass(header,dataList,depression,sucuid)
    }
    getSucuidByClass(allRoom: Classroom[], result: ReportDepressionPesonal[]) {
        const sumList:DataRowModel[] = []
        allRoom.forEach(el=>{
            const model:DataRowModel = {
                v1:el.name,
                v2:this.getSumNoneSucuid(result,el.id),
                v3:this.getSumLitleSucuid(result,el.id),
                v4:this.getSumMeduimSucuid(result,el.id),
                v5:this.getSumStrongSucuid(result,el.id)
            }
            sumList.push(model)
        })
        return sumList
    }
    getSumStrongSucuid(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=17&&fl.roomId == id).length
    }
    getSumMeduimSucuid(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=9 && fl.sucuidValue<=16&&fl.roomId == id).length
    }
    getSumLitleSucuid(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=1 && fl.sucuidValue<=8&&fl.roomId == id).length
    }
    getSumNoneSucuid(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>(fl.sucuidValue==0 || fl.sucuidValue==null)&&fl.roomId == id).length
    }


    getSumStrongSucuidByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=17&&fl.classId == id).length
    }
    getSumMeduimSucuidByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=9 && fl.sucuidValue<=16&&fl.classId == id).length
    }
    getSumLitleSucuidByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.sucuidValue >=1 && fl.sucuidValue<=8&&fl.classId == id).length
    }
    getSumNoneSucuidByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>(fl.sucuidValue==0 || fl.sucuidValue==null)&&fl.classId == id).length
    }



    getDepressionByClass(allRoom: Classroom[], result: ReportDepressionPesonal[]) {
        const sumList:DataRowModel[] = []
        allRoom.forEach(el=>{
            const model:DataRowModel = {
                v1:el.name,
                v2:this.getSumNoneDepression(result,el.id),
                v3:this.getSumLitleDepression(result,el.id),
                v4:this.getSumMeduimDeprssion(result,el.id),
                v5:this.getSumStrongDepression(result,el.id)
            }
            sumList.push(model)
        })
        return sumList
    }


    getSumStrongDepression(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=19&&fl.roomId==id).length
    }
    getSumMeduimDeprssion(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=13&&fl.depressionValue<=18&&fl.roomId==id).length
    }
    getSumLitleDepression(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=7&&fl.depressionValue<=12&&fl.roomId==id).length
    }
    getSumNoneDepression(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue<7&&fl.roomId==id).length
    }

    getSumStrongDepressionByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=19&&fl.classId==id).length
    }
    getSumMeduimDeprssionByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=13&&fl.depressionValue<=18&&fl.classId==id).length
    }
    getSumLitleDepressionByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue>=7&&fl.depressionValue<=12&&fl.classId==id).length
    }
    getSumNoneDepressionByClass(result: ReportDepressionPesonal[],id:number): any {
        return result.filter(fl=>fl.depressionValue<7&&fl.classId==id).length
    }

    async getReportDepressionByRoom(dto:ExportPdfDto) {
        const result = await this.reportDepressionPesonal.find({where:{classId:dto.classId,roomId:dto.roomId,yearTermId:dto.yearTermId},order:{classId:'ASC',roomId:'ASC',studentNumber:'ASC'}})
        const headerName = 'รายงานผลประเมินโรคซึมเศร้าของนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.studentValue,
                v2:m.studentNumber??'',
                v3:m.depressionValue,
                v4:m.sucuidValue,
                v5:this.getDateLabel(m.updatedAt) ,
            }
        })
        const noneDepression = this.getNoneDepression(dataList)
        const litleDepression = this.getLitleDepression(dataList)
        const meduimDeprssion = this.getMeduimDepression(dataList)
        const strongDepression = this.getStrongDepresson(dataList)

        const noneSucuid = this.getNoneSucuid(dataList)
        const litleSucuid = this.getLitleSucuid(dataList)
        const meduimSucuid = this.getMeduimSucuid(dataList)
        const strongSucuid =this.getStrongSucuid(dataList)
        const sumModel:ISumarizeRoomDepressionReport = {
            noneDepression:noneDepression,
            litleDepression:litleDepression,
            meduimDepression:meduimDeprssion,
            strongDepression:strongDepression,
            noneSucuid:noneSucuid,
            litleSuciud:litleSucuid,
            meduimSuciud:meduimSucuid,
            strongSucuid:strongSucuid
        }
        return this.exportPdfService.getDepressionReportByRoom(header,dataList,sumModel)
    }
    getDateLabel(updatedAt: Date): any {
        if(updatedAt){
            return `${updatedAt.getDate()}/${updatedAt.getMonth()+1}/${updatedAt.getFullYear()}`
        }else{
            return ''
        }
    }
    getNoneDepression(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v3<7)
        return count.length
    }
    getLitleDepression(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v3>=7&&fl.v3<=12)
        return count.length
    }
    getMeduimDepression(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v3>=13&&fl.v3<=18)
        return count.length
    }
    getStrongDepresson(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v3>=19)
        return count.length
    }
    getNoneSucuid(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v4==0||fl.v4==null)
        return count.length
    }
    getLitleSucuid(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v4>=1&&fl.v4<=8)
        return count.length
    }
    getMeduimSucuid(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v4>=9&&fl.v4<=16)
        return count.length
    }
    getStrongSucuid(dataList: DataRowModel[]):number {
        let count = dataList.filter(fl=>fl.v4>=17)
        return count.length
    }
    async getHeaderReport(headerName: string, yearTermId: any, classId: any, roomId: any): Promise<HeaderReport> {
        const yearTermModel = await this.yearTerm.findOne({where:{id:yearTermId}})
        const classModel = await this.classroomType.findOne({where:{id:classId}})
        const roomModel = await this.classroom.findOne({where:{id:roomId}})
        const header:HeaderReport = {
            reportName:headerName,
            className:classModel?.typeName,
            roomName:roomModel?.name,
            year:yearTermModel?.year,
            term:yearTermModel?.term
        }
        return header
    }

    async getReportStudentFilterSumarize(dto: ExportPdfDto) {
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
    async getReportStudentFilter(dto: ExportPdfDto) {
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
    async getReportStudentFilterByClass(dto: ExportPdfDto) {
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
    async getReportStudentFilterByRoom(dto: ExportPdfDto) {
        const yearTerm = await this.yearTerm.findOne({where:{id:dto.yearTermId}})
        const classroom = await this.classroom.findOne({where:{id:dto.roomId}})
        if(!classroom){
            throw new BadRequestException({describe:'ไม่มีข้อมูลห้องเรียน'})
        }
        const classroomType = await this.classroomType.findOne({where:{id:dto.classId}})
        if(!classroomType){
            throw new BadRequestException({describe:'ไม่มีข้อมูลชั้นเรียน'})
        }
        const sumarize =await this.reportStudentFilterSumarizeByClassAndRoom.find({where:{yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
        const personal = await this.reportStudentFilterPosonal.find({where:{classroomId:dto.roomId,classroomTypeId:dto.classId}})
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
    // async getReportStudentHelpByClass() {
    //     return this.reportStudentHelpByClass.find()
    // }
    // async getReportStudentHelpByRoom() {
    //     return this.reportStudentHelpByRoom.find()
    // }
    // async getReportStudentHelpByClassAndRoom() {
    //     return this.reportStudentHelpByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)}]})
    // }
    // async getReportStudentScolarByClass() {
    //     return this.reportStudentScolarByClass.find()
    // }
    // async getReportStudentScolarByRoom() {
    //     return this.reportStudentScolarByRoom.find()
    // }
    // async getReportStudentScolarByClassAndRoom() {
    //     return this.reportStudentScolarByClassAndRoom.find({where:[{value2:MoreThan(0)}]})
    // }
    // async getReportStudentSendToByClass() {
    //     return this.reportStudentSendToByClass.find()
    // }
    // async getReportStudentSendToByRoom() {
    //     return this.reportStudentSendToByRoom.find()
    // }
    // async getReportStudentSendToByClassAndRoom() {
    //     return this.reportStudentSendToByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)}]})
    // }
    // async getReportStudentSendToSumarize() {
    //     return this.reportStudentSendToSumarize.find()
    // }
    
    // async getReportStressSumarize() {
    //     return this.reportStressSumarize.find()
    // }
    // async getReportStressByClass() {
    //     return this.reportStressByClass.find()
    // }
    // async getReportStressByClassAndRoom() {
    //     return this.reportStressByClassAndRoom.find({where:[{value2:MoreThan(0)},{value3:MoreThan(0)},{value4:MoreThan(0)},{value5:MoreThan(0)}]})
    // }
    // async getReportStressByRoom() {
    //     return this.reportStressByRoom.find()
    // }
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
        @InjectRepository(ReportDepressionPesonal)
        private readonly reportDepressionPesonal: Repository<ReportDepressionPesonal>,
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
        @InjectRepository(VwYearTermDropdown)
        private readonly vwDropdownYearTermRepository:Repository<VwYearTermDropdown>,
        @InjectRepository(VwClassroomDropdown)
        private readonly vwDropdownClassroomRepository:Repository<VwClassroomDropdown>,
        @InjectRepository(VwClassroomTypeDropdown)
        private readonly vwDropdownClassroomTypeRepository:Repository<VwClassroomTypeDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly yearTermService:YearTermService,
        private readonly exportPdfService:ExportPdfService
        ){
        super()
    }


    
}
