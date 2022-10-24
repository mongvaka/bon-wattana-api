import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import e from 'express';
import { ImagesService } from 'src/core/images/images.service';
import { DEMO_IMAGE } from 'src/core/shared/constans/constanst';
import { ImageType } from 'src/core/shared/constans/enum-system';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { MoreThan, Not, Repository } from 'typeorm';
import { v1 } from 'uuid';
import { ClassroomType, VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';
import { SearchClassroomDto } from '../classroom/classroom.dto';
import { Classroom, VwClassroomDropdown } from '../classroom/classroom.entity';
import { EReportType } from '../export-pdf/enum/report-enum';
import { ExportPdfService } from '../export-pdf/export-pdf.service';
import { DataRowModel, HeaderReport } from '../export-pdf/interface/interface';
import { ISumarizeRoomDepressionReport } from '../export-pdf/libs/depression-report/room-depression-report';
import { HomvisitRowData } from '../export-pdf/libs/std-homvisit-report/room-std-homvisit-report';
import { SdqTable, VwSdqTableList } from '../sdq-table/sdq-table.entity';
import { StudentConsultant } from '../student-consultant/student-consultant.entity';
import { StudentService } from '../student/student.service';
import { VwYearTermDropdown, YearTerm } from '../year-term/year-term.entity';
import { YearTermService } from '../year-term/year-term.service';
import { ReportCheckStudentSumarize } from './check-student.entity';
import { ReportEq } from './eq.entity';

import { ReportHomeVisitNeedHelp, ReportHomeVisitPersonal, ReportHomeVisitSumarize } from './home-visit.entity';
import { ReportDepressionSumarize, ReportDepressionByClass, ReportDepressionByClassAndRoom, ReportDepressionPesonal } from './report-depression.entity';
import { ReportStudentFilterSumarize, ReportStudentFilterByClass, ReportStudentFilterByClassAndRoom, ReportStudentFilterByRoom, ReportStudentFilterSumarizeByClassAndRoom, ReportStudentFilterPosonal } from './report-student-filter.entity';
import { ReportStudentHelpByClass, ReportStudentHelpByRoom, ReportStudentHelpByClassAndRoom } from './report-student-help.entity';
import { ReportStudentScolarByClass, ReportStudentScolarByRoom, ReportStudentScolarByClassAndRoom } from './report-student-scolar.entity';
import { ReportStudentSendToByClass, ReportStudentSendToByRoom, ReportStudentSendToByClassAndRoom, ReportStudentSendToSumarize } from './report-student-send-to.entity';
import { CreateYearTermDto, YearTermDto, SearchYearTermDto, UpdateYearTermDto, ExportPdfDto } from './report.dto';
import { ReportStudentByClass, ReportStudentByRoom, ReportStudentSumarize } from './report.entity';
import { ReportStress } from './stress-report.entity';
import { ReportStudentConsult } from './student-consult.entity';
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
            return this.sdqReport(dto,'ครูประเมินนักเรียน',2)
        case 'SDQ_STUDENT':
            return this.sdqReport(dto,'นักเรียนประเมินตนเอง',1)
        case 'SDQ_PARENT':
            return this.sdqReport(dto,'ผู้ปกครองประเมินนักเรียน',3)
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
        return this.getReportHomeVisitReportByRoom(dto)
    }

    async getReportHomeVisitReportByRoom(dto: ExportPdfDto) {
         const reportName = 'รายงานข้อมูลการเยี่ยมบ้าน'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const countStudent = await this.studentService.countByClassRoom(dto.classId,dto.roomId)
        const result = await this.reportHomeVisitPersonal.find({where:{yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
        
        const needHelp = await this.reportHomeVisitNeedHelp.count({where:{isHelpStudentNeed:true,yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
        const dontHelp2 = await this.reportHomeVisitNeedHelp.count({where:{isHelpStudentNeed:false,yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
        const dontHelp1 = await this.reportHomeVisitNeedHelp.count({where:{isHelpStudentNeed:null,yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
const dontHelp = dontHelp1+dontHelp2
        const sumarize = await this.reportHomvisitSumarize.find({where:{yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId}})
        const sumarizeList:DataRowModel[] = sumarize.map((m,index)=>{
            return {
              v1:(index+1),
              v2:m.studentName,
              v3:this.getSumarizeHomeVist(m.isHelpStudentNeed),
              v4:this.getNeedHelpLabel(m.healthNeed,m.moneyNeed,m.studyNeed,m.speacialNeed),
            }
        })
        const sum:DataRowModel = {
            v1:'นักเรียนที่ยังไม่ต้องการความช่วยเหลือ',
            v2:dontHelp,
            v3:this.getPercentage(result.length,dontHelp),
            v4:'นักเรียนที่ควรได้รับการช่วยเหลือ',
            v5:needHelp,
            v6:this.getPercentage(result.length,needHelp),
            v7:'รวม',
            v8:result.length,
            v9:'',
        }
        const dataList:HomvisitRowData[] = []
        for (const m of result) {
            const imageProfile = await this.getImageProfile(m.studentId);
            
            const imgs = await this.getImages(m.homeVisitId);
            dataList.push({
                studentName:m.studentName,
                sex:m.sex,
                personalCode:m.personalCode,
                birthDate:this.getDateLabel(m.birthDate),
                sisterCount:m.sisterCount?m.sisterCount?.toString():'',
                childOder:m.childOrder?m.childOrder?.toString():'',
                sisterInSchool:m.sisterInSchool?m.sisterInSchool?.toString():'',
                imageProfile:imageProfile,
                studentCode:m.studentCode,
                alivePlace:this.getAlivePlaceLabel(m.alivePlace,m.alivePlaceOther) ,

                travelBy:this.getTravelByLabel(m.travelBy),
                contractAddress:m.contractAddress,
                address:m.address,
                houseLanscape:m.houseLanscape??'',
                farToSchool:this.getFarToSchoolLabel( m.farToSchool),
                passToSchool:this.getPassToSchoolLabel(m.passToSchool,m.passToSchoolOther) ,
                studentAction:this.getStudentAction(m.studentAction,m.studentActionOther) ,
                hobit:this.getHobitLabel(m.hobit,m.hobitOther) ,
                readBook:this.getReadBook(m.readBook) ,
                prepairStuding: this.getPrepairLabel(m.prepairStuding) ,
                parentFix:this.parentFix(m.parentFix) ,
                commentParent:this.getCommentHomvisitLabel(m.comment1,m.comment2,m.comment3,m.comment4,m.comment5,m.comment6,m.comment7),
                sumarize:this.getSumarizeHomvisitLabel(m.isHelpStudentNeed),
                img1:this.getImage(imgs[0]) ,
                img2:this.getImage(imgs[1]),
                img3:this.getImage(imgs[2]),
                img4:this.getImage(imgs[3]),
                img5:this.getImage(imgs[4]),
                createAt:this.getDateLabel(m.createAt)
            })
        }
        return this.exportPdfService.getStudentHomeVisitReportByRoom(header,dataList,sumarizeList,sum)
    }
   getImage(arg0: string): string {
        if(arg0){
            return arg0
        }
        return DEMO_IMAGE
    }
   getFarToSchoolLabel(farToSchool: number): string {
        switch (farToSchool){
            case 1:
                return `1-5 กิโลเมตร`
                case 2:
                return `6-10 กิโลเมตร`
                case 3:
                return `11-15 กิโลเมตร`
                case 4:
                    return `16-20 กิโลเมตร`
                    case 5:
                        return `20 กิโลเมตรขึ้นไป`

                default:
                    return ``
        }
    }
  async getImages(homeVisitId: number) {
        return this.imagesService.getImgBase64FromIds(homeVisitId,ImageType.HOME_VISIT)
    }
    async getImageProfile(studentId: number) {
        return this.imagesService.getImgBase64FromId(studentId,ImageType.STUDENT)
    }
   getAlivePlaceLabel(alivePlace: number,text:string): string {
        switch (alivePlace){
            case 1:
                return `อาคารพานิชย์`
                case 2:
                return `บ้านไม้ชั้นเดียว`
                case 3:
                return `บ้านครึ่งตึกครึ่งไม้`
                case 4:
                    return `ตึกชั้นเดียว`
                    case 5:
                        return `บ้านไม้สองชั้น`
                        case 6:
                            return text
                default:
                    return ``
        }
    }
   getTravelByLabel(travelBy: number): string {
        switch (travelBy){
            case 1:
                return `เดินเท้า`
                case 2:
                return `พาหนะไม่เสียค่าโดยสาร-รถส่วนตัว`
                case 3:
                return `พาหนะเสียค่าโดยสาร-รถโดยสารประจำทาง`
                case 4:
                    return `พาหนะเสียค่าโดยสาร-รถโรงเรียน`
                    case 5:
                        return `จักรยานยืมเรียน`
                default:
                    return ``
        }
    }
   getPassToSchoolLabel(passToSchool: number, passToSchoolOther: string): string {
        switch (passToSchool){
            case 1:
                return `ร้านค้าทั่วไป`
                case 2:
                return `ร้านเกมส์`
                case 3:
                return `ป่ารกร้าง`
                case 4:
                    return `หนองน้ำ/แหล่งน้ำ`
                    case 5:
                        return passToSchoolOther
                default:
                    return ``
        }
    }
   getStudentAction(studentAction: number, studentActionOther: string): string {
        switch (studentAction){
            case 1:
                return `ไม่ช่วยทำอะไรเลย`
                case 2:
                return `หารายได้พิเศษ`
                case 3:
                return `ช่วยงานบ้าน` + studentActionOther
                default:
                    return ``
        }
    }
   getHobitLabel(hobit: number, hobitOther: string): string {
        switch (hobit){
            case 1:
                return `เล่นกีฬา`
                case 2:
                return `อ่านหนังสือ`
                case 3:
                return `เล่นเกมส์`
                case 4:
                    return `เล่นดนตรี`
                    case 5:
                        return hobitOther
                default:
                    return ``
        }
    }
   getReadBook(readBook: number): string {
        switch (readBook){
            case 1:
                return `อ่านสมำเสมอ`
                case 2:
                return `อ่านเมื่อจะสอบ`
                case 3:
                return `อ่านเมื่อบอกให้อ่าน`
                case 4:
                    return `ไม่อ่านเลย`
                default:
                    return ``
        }
    }
   getPrepairLabel(prepairStuding: number): string {
        switch (prepairStuding){
            case 1:
                return `จัดเก็บเป็นระเบียบดีมาก`
                case 2:
                return `จัดเก็บเป็นระเบียบพอใช้`
                case 3:
                return `ไม่เคยเก็บ`
                default:
                    return ``
        }
    }
    parentFix(parentFix: number): string {
        switch (parentFix){
            case 1:
                return `บ่อยครั้ง`
                case 2:
                return `นานๆครั้ง`
                case 3:
                return `น้อยมาก หรือไม่เคย`
                default:
                    return ``
        }
    }
   getCommentHomvisitLabel(comment1: string, comment2: string, comment3: string, comment4: string, comment5: string, comment6: string, comment7: string): string {
        const arr:string[] = [comment1,comment2,comment3,comment4,comment5,comment6,comment7]
        return arr.toString()

    }
   getSumarizeHomvisitLabel(isHelpStudentNeed: boolean): string {
        if(isHelpStudentNeed){
            return `ควรได้รับการช่วยเหลือ`
        }else{
            return `ยังไม่ต้องการความช่วยเหลือ`
        }
    }
   getNeedHelpLabel(healthNeed: boolean, moneyNeed: boolean, studyNeed: boolean, speacialNeed: boolean) {
        const labelList = []
        if(studyNeed){
            labelList.push('ด้านการเรียน')
        }
        if(healthNeed){
            labelList.push('ด้านสุขภาพร่างกาย')
        }
        if(moneyNeed){
            labelList.push('ด้านการเงิน')
        }
        if(speacialNeed){
            labelList.push('มีความต้องการช่วยเหลือพิเศษ')
        }
        return labelList.toString()
    }
   getSumarizeHomeVist(isHelpStudentNeed: boolean) {
        if(isHelpStudentNeed){
            return 'ควรได้รับการช่วยเหลือ'
        }else{
            return `ยังไม่ต้องการความช่วยเหลือ`
        }
    }
   getPercentage(countStudent: number, dontHelp: number) {
        if(dontHelp==0){
            return 0
        }
        return ((dontHelp/countStudent)*100)
    }
    async  checkStudentReport(dto: ExportPdfDto) {

    }

    sdqReport(dto: ExportPdfDto,reportName:string,type:number) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportSdqReport(dto,reportName,type)
            case 'CLASS':
                return this.getReportSdqReportByClass(dto,reportName,type)
            case 'ROOM':
                return this.getReportSdqReportByRoom(dto,reportName,type)
        }
    }
  async getReportSdqReport(dto: ExportPdfDto,reportName:string,type:number) {
    
        //  const reportName = 'ครูประเมินนักเรียน'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.sdqRepository.find({where:{yearTermId:dto.yearTermId,estimateType:type}})
        const classResult = await this.classroomType.find({order:{typeName:'ASC'}})
        const dataList:DataRowModel[] = classResult.map(m=>{
            return {
                v1:m.typeName,
                v2:this.getSumChoice2(result,m.id, 'emotionalBehaviorScore01_value','ปกติ'),
                v3:this.getSumChoice2(result,m.id,'emotionalBehaviorScore01_value','เสี่ยง'),
                v4:this.getSumChoice2(result,m.id,'emotionalBehaviorScore01_value','มีปัญหา'),

                v5:this.getSumChoice2(result,m.id,'nomalBehaviorScore02_value','ปกติ'),
                v6:this.getSumChoice2(result,m.id,'nomalBehaviorScore02_value','เสี่ยง'),
                v7:this.getSumChoice2(result,m.id,'nomalBehaviorScore02_value','มีปัญหา'),

                v8:this.getSumChoice2(result,m.id,'ADHDBehaviorScore03_value','ปกติ'),
                v9:this.getSumChoice2(result,m.id,'ADHDBehaviorScore03_value','เสี่ยง'),
                v10:this.getSumChoice2(result,m.id,'ADHDBehaviorScore03_value','มีปัญหา'),

                v11:this.getSumChoice2(result,m.id,'friendBehaviorScore04_value','ปกติ'),
                v12:this.getSumChoice2(result,m.id,'friendBehaviorScore04_value','เสี่ยง'),
                v13:this.getSumChoice2(result,m.id,'friendBehaviorScore04_value','มีปัญหา'),

                v14:this.getSumChoice2(result,m.id,'sumScore_value','ปกติ'),
                v15:this.getSumChoice2(result,m.id,'sumScore_value','เสี่ยง'),
                v16:this.getSumChoice2(result,m.id,'sumScore_value','มีปัญหา'),
            }
        })
        const sumModel:DataRowModel ={
            v1:'รวม',
                v2:this.getSumChoice2(result,-1, 'emotionalBehaviorScore01_value','ปกติ'),
                v3:this.getSumChoice2(result,-1,'emotionalBehaviorScore01_value','เสี่ยง'),
                v4:this.getSumChoice2(result,-1,'emotionalBehaviorScore01_value','มีปัญหา'),

                v5:this.getSumChoice2(result,-1,'nomalBehaviorScore02_value','ปกติ'),
                v6:this.getSumChoice2(result,-1,'nomalBehaviorScore02_value','เสี่ยง'),
                v7:this.getSumChoice2(result,-1,'nomalBehaviorScore02_value','มีปัญหา'),

                v8:this.getSumChoice2(result,-1,'ADHDBehaviorScore03_value','ปกติ'),
                v9:this.getSumChoice2(result,-1,'ADHDBehaviorScore03_value','เสี่ยง'),
                v10:this.getSumChoice2(result,-1,'ADHDBehaviorScore03_value','มีปัญหา'),

                v11:this.getSumChoice2(result,-1,'friendBehaviorScore04_value','ปกติ'),
                v12:this.getSumChoice2(result,-1,'friendBehaviorScore04_value','เสี่ยง'),
                v13:this.getSumChoice2(result,-1,'friendBehaviorScore04_value','มีปัญหา'),

                v14:this.getSumChoice2(result,-1,'sumScore_value','ปกติ'),
                v15:this.getSumChoice2(result,-1,'sumScore_value','เสี่ยง'),
                v16:this.getSumChoice2(result,-1,'sumScore_value','มีปัญหา'),
        }
        dataList.push(sumModel)
        const sumarize:DataRowModel[] = classResult.map(m=>{
            return {
                v1:m.typeName,
                v2:this.getSumChoice2(result,m.id, 'socialBehaviorScore05_value','เป็นจุดแข็ง'),
                v3:this.getSumChoice2(result,m.id,'socialBehaviorScore05_value','ไม่มีจุดแข็ง'),
            }
        })
        console.log(sumarize);
        
        return this.exportPdfService.getSdqReportSumarize(header,dataList,sumarize)
    }
  async getReportSdqReportByClass(dto: ExportPdfDto,reportName:string,type:number) {
    // const reportName = 'ครูประเมินนักเรียน'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.sdqRepository.find({where:{classroomTypeId:dto.classId,yearTermId:dto.yearTermId,estimateType:type}})
        const roomResult = await this.classroom.find({where:{active:true,deletedAt:null},order:{id:'ASC'}})
        const datalist:DataRowModel[] = roomResult.map(m=>{
        
            return {
                v1:this.getSdqLabelName(header.className,m.name),
                v2:this.getSumChoice(result,m.id, 'emotionalBehaviorScore01_value','ปกติ'),
                v3:this.getSumChoice(result,m.id,'emotionalBehaviorScore01_value','เสี่ยง'),
                v4:this.getSumChoice(result,m.id,'emotionalBehaviorScore01_value','มีปัญหา'),

                v5:this.getSumChoice(result,m.id,'nomalBehaviorScore02_value','ปกติ'),
                v6:this.getSumChoice(result,m.id,'nomalBehaviorScore02_value','เสี่ยง'),
                v7:this.getSumChoice(result,m.id,'nomalBehaviorScore02_value','มีปัญหา'),

                v8:this.getSumChoice(result,m.id,'ADHDBehaviorScore03_value','ปกติ'),
                v9:this.getSumChoice(result,m.id,'ADHDBehaviorScore03_value','เสี่ยง'),
                v10:this.getSumChoice(result,m.id,'ADHDBehaviorScore03_value','มีปัญหา'),

                v11:this.getSumChoice(result,m.id,'friendBehaviorScore04_value','ปกติ'),
                v12:this.getSumChoice(result,m.id,'friendBehaviorScore04_value','เสี่ยง'),
                v13:this.getSumChoice(result,m.id,'friendBehaviorScore04_value','มีปัญหา'),

                v14:this.getSumChoice(result,m.id,'sumScore_value','ปกติ'),
                v15:this.getSumChoice(result,m.id,'sumScore_value','เสี่ยง'),
                v16:this.getSumChoice(result,m.id,'sumScore_value','มีปัญหา'),

            }
        })
        const sumModel:DataRowModel ={
            v1:'รวม',
                v2:this.getSumChoice(result,-1, 'emotionalBehaviorScore01_value','ปกติ'),
                v3:this.getSumChoice(result,-1,'emotionalBehaviorScore01_value','เสี่ยง'),
                v4:this.getSumChoice(result,-1,'emotionalBehaviorScore01_value','มีปัญหา'),

                v5:this.getSumChoice(result,-1,'nomalBehaviorScore02_value','ปกติ'),
                v6:this.getSumChoice(result,-1,'nomalBehaviorScore02_value','เสี่ยง'),
                v7:this.getSumChoice(result,-1,'nomalBehaviorScore02_value','มีปัญหา'),

                v8:this.getSumChoice(result,-1,'ADHDBehaviorScore03_value','ปกติ'),
                v9:this.getSumChoice(result,-1,'ADHDBehaviorScore03_value','เสี่ยง'),
                v10:this.getSumChoice(result,-1,'ADHDBehaviorScore03_value','มีปัญหา'),

                v11:this.getSumChoice(result,-1,'friendBehaviorScore04_value','ปกติ'),
                v12:this.getSumChoice(result,-1,'friendBehaviorScore04_value','เสี่ยง'),
                v13:this.getSumChoice(result,-1,'friendBehaviorScore04_value','มีปัญหา'),

                v14:this.getSumChoice(result,-1,'sumScore_value','ปกติ'),
                v15:this.getSumChoice(result,-1,'sumScore_value','เสี่ยง'),
                v16:this.getSumChoice(result,-1,'sumScore_value','มีปัญหา'),
        }
        datalist.push(sumModel)
        const sumarize:DataRowModel[] = roomResult.map(m=>{
            return {
                v1:this.getSdqLabelName(header.className,m.name),
                v2:this.getSumChoice(result,m.id, 'socialBehaviorScore05_value','เป็นจุดแข็ง'),
                v3:this.getSumChoice(result,m.id,'socialBehaviorScore05_value','ไม่มีจุดแข็ง'),
            }
        })
        console.log(sumarize);
        
        return this.exportPdfService.getSdqReportByClass(header,datalist,sumarize)
    }
    getSdqLabelName(className: string, name: string): any {
        return `${className}/${name}`
    }
    getSumChoice(result: VwSdqTableList[], id: number, arg2: string, arg3: string): any {
        if(
            id==-1
        ){
            return  result.filter(fl=> fl[arg2] == arg3&& fl.classroomId !=null).length
        }
        return result.filter(fl=> fl[arg2] == arg3&& fl.classroomId == id).length
    }
    getSumChoice2(result: VwSdqTableList[], id: number, arg2: string, arg3: string): any {
        if(
            id==-1
        ){
            return  result.filter(fl=> fl[arg2] == arg3&& fl.classroomTypeId!=null).length
        }
        return result.filter(fl=> fl[arg2] == arg3&& fl.classroomTypeId == id).length
    }
  async getReportSdqReportByRoom(dto: ExportPdfDto,reportName:string,type:number) {
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.sdqRepository.find({where:{classroomId:dto.roomId,classroomTypeId:dto.classId,yearTermId:dto.yearTermId,estimateType:type}})
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.nameValue,
                v2:m.studentNumber,
                v3:this.getSdqLabel(m.emotionalBehaviorScore01_value),
                v4:this.getSdqLabel(m.nomalBehaviorScore02_value),
                v5:this.getSdqLabel(m.ADHDBehaviorScore03_value),
                v6:this.getSdqLabel(m.friendBehaviorScore04_value),
                v7:m.socialBehaviorScore05_value,
                v8:this.getSdqLabel(m.sumScore_value),
            }
        })
        const sumarizeList:DataRowModel[] = [
            {
                v1:'',
                v2:this.getChoice1(dataList,'ป'),
                v3:this.getChoice1(dataList,'ส'),
                v4:this.getChoice1(dataList,'ห')
            },
            {
                v1:'',
                v2:this.getChoice2(dataList,'ป'),
                v3:this.getChoice2(dataList,'ส'),
                v4:this.getChoice2(dataList,'ห')
            },
            {
                v1:'',
                v2:this.getChoice3(dataList,'ป'),
                v3:this.getChoice3(dataList,'ส'),
                v4:this.getChoice3(dataList,'ห')
            },
            {
                v1:'',
                v2:this.getChoice4(dataList,'ป'),
                v3:this.getChoice4(dataList,'ส'),
                v4:this.getChoice4(dataList,'ห')
            },
            {
                v1:'',
                v2:this.getChoiceSum(dataList,'ป'),
                v3:this.getChoiceSum(dataList,'ส'),
                v4:this.getChoiceSum(dataList,'ห')
            }
        ]
        const sumarize2 :DataRowModel = 
        {
            v1:this.getStrange(dataList,'เป็นจุดแข็ง'),
            v2:this.getStrange(dataList,'ไม่มีจุดแข็ง'),
            v3:dataList.length,
        }

        return this.exportPdfService.getSdqReportByRoom(header,dataList,sumarizeList,sumarize2)

    }
    getStrange(dataList: DataRowModel[],arg:string): any {
        return dataList.filter(fl=>fl.v7 == arg).length
    }
    getChoiceSum(dataList: DataRowModel[], arg1: string): any {
        let count = 0
        dataList.forEach(el=>{
            if(el.v3 == arg1){
                count += 1
            }
            if(el.v4 == arg1){
                count += 1
            }
            if(el.v5 == arg1){
                count += 1
            }
            if(el.v6 == arg1){
                count += 1
            }
        })
        return count
    }
    getChoice1(dataList: DataRowModel[], arg1: string): any {
        let count = 0
        dataList.forEach(el=>{
            if(el.v3 == arg1){
                count += 1
            }
            
        })
        return count
    }
    getChoice2(dataList: DataRowModel[], arg1: string): any {
        let count = 0
        dataList.forEach(el=>{
            if(el.v4 == arg1){
                count += 1
            }
            
        })
        return count
    }
    getChoice3(dataList: DataRowModel[], arg1: string): any {
        let count = 0
        dataList.forEach(el=>{
            if(el.v5 == arg1){
                count += 1
            }
            
        })
        return count
    }
    getChoice4(dataList: DataRowModel[], arg1: string): any {
        let count = 0
        dataList.forEach(el=>{
            if(el.v6 == arg1){
                count += 1
            }
            
        })
        return count
    }
    getSdqLabel(value: string): any {
        switch(value){
            case 'มีปัญหา':
                return 'ห'
            case 'เสี่ยง':
                return 'ส'
            case 'ปกติ':
                return 'ป'
        }
    }

    stressReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'ALL':
                return this.getReportStressReport(dto)
            case 'CLASS':
                return this.getReportStressReportByClass(dto)
            case 'ROOM':
                return this.getReportStressReportByRoom(dto)
        }
    }
  async getReportStressReport(dto: ExportPdfDto) {
         const reportName = 'รายงานผลประเมินความเครียดของนักเรียน'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.reportStress.find({where:{yearTermId:dto.yearTermId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.className??'',
                v2:m.roomName??'',
                v3:m.studentNumber??'',
                v4:m.studentName??'',
                v5:this.getStressLabel(m.sumva),
                v6:this.getDateLabel(m.updatedAt)
            }
        })
        const classResult = await this.classroomType.find({where:{active:true},order:{id:'ASC'}})
        const sumarizeList:DataRowModel[] = classResult.map(m=>{
            return {
                v1:m.typeName,
                v2:this.sumStressInRang2(m.id,result,0,23),
                v3:this.sumStressInRang2(m.id,result,24,41),
                v4:this.sumStressInRang2(m.id,result,42,61),
                v5:this.sumStressInRang2(m.id,result,62,500),
            }
        })
        const sumModel:DataRowModel={
            v1:'รวม',
            v2:this.sumStressInRang2(-1,result,0,23),
            v3:this.sumStressInRang2(-1,result,24,41),
            v4:this.sumStressInRang2(-1,result,42,61),
            v5:this.sumStressInRang2(-1,result,62,500),
        }
        sumarizeList.push(sumModel)
        return this.exportPdfService.getStressReportSumarize(header,dataList,sumarizeList)
    }
  async getReportStressReportByClass(dto: ExportPdfDto) {
         const reportName = 'รายงานผลประเมินความเครียดของนักเรียน '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.reportStress.find({where:{yearTermId:dto.yearTermId,classroomTypeId:dto.classId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.roomName??'',
                v2:m.studentNumber??'',
                v3:m.studentName??'',
                v4:this.getStressLabel(m.sumva),
                v5:this.getDateLabel(m.updatedAt)
            }
        })
        const roomResult = await this.classroom.find({where:{active:true},order:{id:'ASC'}})
        const sumarizeList:DataRowModel[] = roomResult.map(m=>{
            return {
                v1:this.getSdqLabelName(header.className,m.name),
                v2:this.sumStressInRang(m.id,result,0,23),
                v3:this.sumStressInRang(m.id,result,24,41),
                v4:this.sumStressInRang(m.id,result,42,61),
                v5:this.sumStressInRang(m.id,result,62,500),
            }
        })
        const sumModel:DataRowModel={
            v1:'รวม',
            v2:this.sumStressInRang(-1,result,0,23),
            v3:this.sumStressInRang(-1,result,24,41),
            v4:this.sumStressInRang(-1,result,42,61),
            v5:this.sumStressInRang(-1,result,62,500),
        }
        sumarizeList.push(sumModel)

        return this.exportPdfService.getStressReportByClass(header,dataList,sumarizeList)
    }
    sumStressInRang(id: number, result: ReportStress[], arg2: number, arg3: number): any {
       if(id == -1){
        return result.filter(fl=>fl.classroomId != null && fl.sumva>=arg2&&fl.sumva<=arg3).length
       }
       return result.filter(fl=>fl.classroomId == id && fl.sumva>=arg2&&fl.sumva<=arg3).length
    }
    sumStressInRang2(id: number, result: ReportStress[], arg2: number, arg3: number): any {
        if(id == -1){
         return result.filter(fl=>fl.classroomTypeId != null && fl.sumva>=arg2&&fl.sumva<=arg3).length
        }
        return result.filter(fl=>fl.classroomTypeId == id && fl.sumva>=arg2&&fl.sumva<=arg3).length
     }
  async getReportStressReportByRoom(dto: ExportPdfDto) {
         const reportName = 'รายงานผลประเมินความเครียดของนักเรียน '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.reportStress.find({where:{yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList = result.map(m=>{
            return {
                v1:m.studentNumber??'',
                v2:m.studentName??'',
                v3:this.getStressLabel(m.sumva),
                v4:this.getDateLabel(m.updatedAt),
            }
        })
        const sum:DataRowModel ={
            v1:this.sumByLabel(dataList,'เครียดเล็กน้อย'),
            v2:this.sumByLabel(dataList,'เครียดปานกลาง'),
            v3:this.sumByLabel(dataList,'เครียดสูง'),
            v4:this.sumByLabel(dataList,'เครียดรุนแรง')
        }
        return this.exportPdfService.getStressReportByRoom(header,dataList,sum)
    }
    sumByLabel(dataList: { v1: string; v2: string; v3: any; v4: string; }[], arg1: string): any {
        return dataList.filter(fl=>fl.v3 == arg1 ).length
    }
    getStressLabel(sumva: number): any {
        if(sumva<=23){
            return `เครียดเล็กน้อย`
        }
        if(sumva>=23 && sumva<=41){
            return `เครียดปานกลาง`
        }
        if(sumva>=42 && sumva<=61){
            return `เครียดสูง`
        }
        if(sumva>=62){
            return `เครียดรุนแรง`
        }
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
  async getReportEqReport(dto: ExportPdfDto) {
         const reportName = 'ผลประเมินความฉลาดทางอารมณ์ '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result  = await this.reportEq.find({where:{yearTermId:dto.yearTermId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const classResult = await this.classroomType.find({order:{typeName:'ASC'}})
        const dataList:DataRowModel[] = classResult.map(m=>{
            return{
                v1:m.typeName,
                v2:this.sumEq2(m.id,result,0,139),
                v3:this.sumEq2(m.id,result,140,170),
                v4:this.sumEq2(m.id,result,171,500)
            }
        })
        const sumModel:DataRowModel = {
            v1:this.sumEq2(-1,result,0,139),
            v2:this.sumEq2(-1,result,140,170),
            v3:this.sumEq2(-1,result,171,500),
            v4:result.filter(fl=>fl.classroomTypeId!=null).length
        }

        return this.exportPdfService.getEqReportSumarize(header,dataList,sumModel)
    }
  async getReportEqReportByClass(dto: ExportPdfDto) {
         const reportName = 'ผลประเมินความฉลาดทางอารมณ์ '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result  = await this.reportEq.find({where:{yearTermId:dto.yearTermId,classroomTypeId:dto.classId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const roomResult = await this.classroom.find({where:{active:true,deletedAt:null},order:{id:'ASC'}})
        const dataList:DataRowModel[] = roomResult.map(m=>{
            return{
                v1:this.getSdqLabelName(header.className,m.name),
                v2:this.sumEq(m.id,result,0,139),
                v3:this.sumEq(m.id,result,140,170),
                v4:this.sumEq(m.id,result,171,500)
            }
        })
        const sumModel:DataRowModel = {
            v1:this.sumEq(-1,result,0,139),
            v2:this.sumEq(-1,result,140,170),
            v3:this.sumEq(-1,result,171,500),
            v4:result.filter(fl=>fl.classroomId!=null).length
        }
        return this.exportPdfService.getEqReportByClass(header,dataList,sumModel)
    }
    sumEq(id: number, result: ReportEq[], arg2: number, arg3: number): any {
        if(id==-1){
            return result.filter(fl=>fl.classroomId !=null&& fl.sumva>=arg2&&fl.sumva<=arg3).length
        }else{
            return result.filter(fl=>fl.classroomId == id&& fl.sumva>=arg2&&fl.sumva<=arg3).length
        }
    }
    sumEq2(id: number, result: ReportEq[], arg2: number, arg3: number): any {
        if(id==-1){
            return result.filter(fl=>fl.classroomTypeId !=null&& fl.sumva>=arg2&&fl.sumva<=arg3).length
        }else{
            return result.filter(fl=>fl.classroomTypeId == id&& fl.sumva>=arg2&&fl.sumva<=arg3).length
        }
    }
  async getReportEqReportByRoom(dto: ExportPdfDto) {
         const reportName = 'ผลประเมินความฉลาดทางอารมณ์ '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result  = await this.reportEq.find({where:{yearTermId:dto.yearTermId,classroomId:dto.roomId,classroomTypeId:dto.classId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList:DataRowModel[] = result.map(m=>{
            return {
                v1:m.studentName,
                v2:m.studentNumber,
                v3:this.getLabelEq(m.sumva,0,139),
                v4:this.getLabelEq(m.sumva,140,170),
                v5:this.getLabelEq(m.sumva,171,500),
            }
        })
        const sumModel:DataRowModel={
            v1:this.getSumEq(dataList,'v3'),
            v2:this.getSumEq(dataList,'v3'),
            v3:this.getSumEq(dataList,'v3'),
            v4:dataList.length
        }
        return this.exportPdfService.getEqReportByRoom(header,dataList,sumModel)
    }
    getSumEq(dataList: DataRowModel[], arg1: string): any {
        return dataList.filter(fl=>fl[arg1] == '/').length
    }
    getLabelEq(sumva: number, arg1: number, arg2: number): any {
        if(sumva>=arg1&&sumva<=arg2){
            return `/`
        }
        return ``
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
  async getReportStudentSupportReport(dto: ExportPdfDto) {
         const reportName = 'รายงานการส่งเสริมและพัฒนาศักยภาพนักเรียน '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSupportReportSumarize(header,[],[])
    }
  async getReportStudentSupportReportByClass(dto: ExportPdfDto) {
         const reportName = 'รายงานการส่งเสริมและพัฒนาศักยภาพนักเรียน '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSupportReportByClass(header,[],[])
    }
  async getReportStudentSupportReportByRoom(dto: ExportPdfDto) {
         const reportName = 'รายงานการส่งเสริมและพัฒนาศักยภาพนักเรียน '
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSupportReportByRoom(header,[],{})
    }
    studentConsultReport(dto: ExportPdfDto) {
        switch(dto.reportType){
            case 'CLASS':
                return this.getReportStudentConsultReportByClass(dto)
            case 'ROOM':
                return this.getReportStudentConsultReportByRoom(dto)
        }
    }

  async getReportStudentConsultReportByClass(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.reportStudentConsult.find({where:{yearTermId:dto.yearTermId,classroomTypeId:dto.classId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList:DataRowModel[] = result.map(m=>{
            return{
                v1:m.nickName,
                v2:m.roomName,
                v3:this.getDateLabel(m.createdAt),
                v4:this.getTimeLabel(m.diffTime) ,
                v5:this.getStoryLabel(m.storyType),
                v6:this.getResultLabel(m.resultType),
                v7:this.getSendTypeLabel(m.sentType,m.sentText) 
            }
        })
        console.log(dataList);
        
        const sumModel:DataRowModel ={
            v1:result.filter(fl=>fl.classroomId!=null).length,
            v2:this.countSentTo(result)
        }
        return this.exportPdfService.getStudentConsultReportByClass(header,dataList,sumModel)
    }
    getTimeLabel(diffTime: {}): any {
        console.log(diffTime);
        if(diffTime['minutes']){
            if(diffTime['hours']){
                return `${diffTime['hours']}:${+diffTime['minutes']<10?'0'+diffTime['minutes']:diffTime['minutes']} นาที`
            }
            return `${+diffTime['minutes']<10?'0'+diffTime['minutes']:diffTime['minutes']} นาที`

        }
        return ``
    }
  async getReportStudentConsultReportByRoom(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        const result = await this.reportStudentConsult.find({where:{yearTermId:dto.yearTermId,classroomTypeId:dto.classId,classroomId:dto.roomId},order:{classroomTypeId:'ASC',classroomId:'ASC',studentNumber:'ASC'}})
        const dataList:DataRowModel[] = result.map(m=>{
            return{
                v1:m.nickName,
                v2:this.getDateLabel(m.createdAt),
                v3:m.diffTime,
                v4:this.getStoryLabel(m.storyType),
                v5:this.getResultLabel(m.resultType),
                v6:this.getSendTypeLabel(m.sentType,m.sentText) 
            }
        })
        const sumModel:DataRowModel ={
            v1:result.filter(fl=>fl.classroomId!=null).length,
            v2:this.countSentTo(result)
        }
        return this.exportPdfService.getStudentConsultReportByRoom(header,dataList,sumModel)
    }
    countSentTo(result: ReportStudentConsult[]): any {
        return result.filter(fl=>fl.classroomId!=null && (fl.sentType == 3||fl.sentType == 4||fl.sentType == 5||fl.sentType == 6)).length
    }

    getSendTypeLabel(sentType: number,text:string): any {
        switch(sentType){
            case 1:
                return ``
                case 2:
                    return ``
                    case 3:
                        return `ส่งต่อครูแนะแนว`
                        case 4:
                            return `ส่งต่องานพยาบาล`
                            case 5:
                                return `ส่งต่องานปกครอง`
                                case 6:
                                    return text
                    default:
                        return ``
        }
    }
    getResultLabel(resultType: number): any {
        switch(resultType){
            case 1:
                return `นักเรียนสามารถแก้ปัญหาได้`
                case 2:
                    return `นักเรียนไม่สามารถแก้ปัญหาได้`
                    default:
                        return ``
        }
    }
    getStoryLabel(storyType: number): any {
        switch(storyType){
            case 1:
                return `การเรียน`
                case 2:
                    return `ส่วนตัวและสังคม`
                    case 3:
                        return `การศึกษาต่อและอาชีพ`
                    default:
                        return ``
        }
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
  async getReportStudentScolarReport(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentScolarReportSumarize(header,[],[])
    }
  async getReportStudentScolarReportByClass(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentScolarReportByClass(header,[],[])
    }
  async getReportStudentScolarReportByRoom(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentScolarReportByRoom(header,[],{})
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
  async getReportStudentHelpReport(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentHelpReportSumarize(header,[],[])
    }
  async getReportStudentHelpReportByClass(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentHelpReportByClass(header,[],[])
    }
  async getReportStudentHelpReportByRoom(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentHelpReportByRoom(header,[],{})
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
  async getReportStudentSendtoReport(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSendToReportSumarize(header,[],[])
    }
  async getReportStudentSendtoReportByClass(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSendToReportByClass(header,[],[])
    }
  async getReportStudentSendtoReportByRoom(dto: ExportPdfDto) {
         const reportName = 'กำลังพัฒนา'
        const header = await this.getHeaderReport(reportName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentSendToReportByClass(header,[],[])
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
                return this.getReportDepressionByClass(dto)
            case 'ROOM':
                return this.getReportDepressionByRoom(dto)
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
//    checkStudentSumarize() {
//         return this.checkStudentSumarizeRepository.find()
//     }
//     teacherBySubject() {
//         return this.teacherBySubjectRepository.find()
//     }
//     teacherSumarize() {
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
        const depression = await this.getDepressionBySumarize(allClass,result)
        const sucuid = await this.getSucuidBySumarize(allClass,result)
        return this.exportPdfService.getDepressionReportSumarize(header,dataList,depression,sucuid)
    }
  async getSucuidBySumarize(allClass: ClassroomType[], result: ReportDepressionPesonal[]) {
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
  async getDepressionBySumarize(allClass: ClassroomType[], result: ReportDepressionPesonal[]) {
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
   getSumStrongSucuid(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=17&&fl.roomId == id).length
    }
   getSumMeduimSucuid(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=9 && fl.sucuidValue<=16&&fl.roomId == id).length
    }
   getSumLitleSucuid(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=1 && fl.sucuidValue<=8&&fl.roomId == id).length
    }
   getSumNoneSucuid(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>(fl.sucuidValue==0 || fl.sucuidValue==null)&&fl.roomId == id).length
    }


   getSumStrongSucuidByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=17&&fl.classId == id).length
    }
   getSumMeduimSucuidByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=9 && fl.sucuidValue<=16&&fl.classId == id).length
    }
   getSumLitleSucuidByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.sucuidValue >=1 && fl.sucuidValue<=8&&fl.classId == id).length
    }
   getSumNoneSucuidByClass(result: ReportDepressionPesonal[],id:number) {
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


   getSumStrongDepression(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=19&&fl.roomId==id).length
    }
   getSumMeduimDeprssion(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=13&&fl.depressionValue<=18&&fl.roomId==id).length
    }
   getSumLitleDepression(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=7&&fl.depressionValue<=12&&fl.roomId==id).length
    }
   getSumNoneDepression(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue<7&&fl.roomId==id).length
    }

   getSumStrongDepressionByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=19&&fl.classId==id).length
    }
   getSumMeduimDeprssionByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=13&&fl.depressionValue<=18&&fl.classId==id).length
    }
   getSumLitleDepressionByClass(result: ReportDepressionPesonal[],id:number) {
        return result.filter(fl=>fl.depressionValue>=7&&fl.depressionValue<=12&&fl.classId==id).length
    }
   getSumNoneDepressionByClass(result: ReportDepressionPesonal[],id:number) {
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
   getDateLabel(updatedAt: Date) {
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
    async getHeaderReport(headerName: string, yearTermId, classId, roomId): Promise<HeaderReport> {
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


    async getReportStudentFilter(dto: ExportPdfDto) {
        const headerName = 'ผลการคัดกรองนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentFilterReport(header,[])
    }
    async getReportStudentFilterByClass(dto: ExportPdfDto) {
        const headerName = 'ผลการคัดกรองนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
        return this.exportPdfService.getStudentFilterReport(header,[])
    }
    async getReportStudentFilterByRoom(dto: ExportPdfDto) {
        const headerName = 'ผลการคัดกรองนักเรียน'
        const header:HeaderReport = await this.getHeaderReport(headerName,dto.yearTermId,dto.classId,dto.roomId)
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

        return this.exportPdfService.getStudentFilterReportByRoom(header,personalMaped,sumarizeMaped)
    }
   getNormalPersonTextB(b: number) {
        if(!b){
            return ''
        }
        if(b>1){
            return '/'
        }
        return ''
    }
   getNormalPersonTextA(a: number) {
        if(a==1){
            return '/'
        }
        return ''
    }
   getNormalPersonText(lernStatus: number) {
        if(!lernStatus){
            return ''
        }
        if(lernStatus >1){
            return 'ส'
        }
        return 'ป'
    }
   getTextNormalPerson(sdq1: string, sdq2: string, sdq3: string) {
        if(sdq1 == 'มีปัญหา'|| sdq2 == 'มีปัญหา'|| sdq3 == 'มีปัญหา'||sdq1 == 'เสี่ยง'|| sdq2 == 'เสี่ยง'|| sdq3 == 'เสี่ยง'){
            return 'ส'
        }
        return 'ป'
    }
   getNormalPerson(summarize: number) {
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
        @InjectRepository(ReportHomeVisitSumarize)
        private readonly reportHomvisitSumarize: Repository<ReportHomeVisitSumarize>,
        @InjectRepository(ReportHomeVisitNeedHelp)
        private readonly reportHomeVisitNeedHelp: Repository<ReportHomeVisitNeedHelp>,
        @InjectRepository(ReportHomeVisitPersonal)
        private readonly reportHomeVisitPersonal: Repository<ReportHomeVisitPersonal>,

        @InjectRepository(VwSdqTableList)
        private readonly sdqRepository: Repository<VwSdqTableList>,
        @InjectRepository(ReportEq)
        private readonly reportEq: Repository<ReportEq>,
        @InjectRepository(ReportDepressionPesonal)
        private readonly reportDepressionPesonal: Repository<ReportDepressionPesonal>,
        
        @InjectRepository(ReportStudentConsult)
        private readonly reportStudentConsult: Repository<ReportStudentConsult>,
        @InjectRepository(ReportStudentFilterSumarize)
        private readonly reportStudentFilterSumarize: Repository<ReportStudentFilterSumarize>,
        @InjectRepository(ReportStudentFilterByClass)
        private readonly reportStudentFilterByClass: Repository<ReportStudentFilterByClass>,
        @InjectRepository(ReportStudentFilterByClassAndRoom)
        private readonly reportStudentFilterByClassAndRoom: Repository<ReportStudentFilterByClassAndRoom>,
        
        @InjectRepository(ReportStress)
        private readonly reportStress: Repository<ReportStress>,
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
        private readonly exportPdfService:ExportPdfService,
        private readonly studentService:StudentService,
        private readonly imagesService:ImagesService
        ){
        super()
    }


    
}
