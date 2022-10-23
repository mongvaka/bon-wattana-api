import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/core/images/images.module';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { ClassroomType, VwClassroomTypeDropdown } from '../classroom-type/classroom-type.entity';
import { Classroom, VwClassroomDropdown } from '../classroom/classroom.entity';
import { ExportPdfModule } from '../export-pdf/export-pdf.module';
import { StudentModule } from '../student/student.module';
import { VwYearTermDropdown, YearTerm } from '../year-term/year-term.entity';
import { YearTermModule } from '../year-term/year-term.module';
import { ReportCheckStudentSumarize } from './check-student.entity';
import { ReportEqSumarize, ReportEqByRoom, ReportEqByClass, ReportEqByClassAndRoom } from './eq.entity';
import { ReportHomeVisitNeedHelp, ReportHomeVisitSumarize, ReportHomeVisitPersonal } from './home-visit.entity';
import { ReportDepressionSumarize, ReportDepressionByClass, ReportDepressionByClassAndRoom, ReportDepressionPesonal } from './report-depression.entity';
import { ReportStudentFilterSumarize, ReportStudentFilterByClass, ReportStudentFilterByClassAndRoom, ReportStudentFilterByRoom, ReportStudentFilterPosonal, ReportStudentFilterSumarizeByClassAndRoom } from './report-student-filter.entity';
import { ReportStudentHelpByClass, ReportStudentHelpByRoom, ReportStudentHelpByClassAndRoom } from './report-student-help.entity';
import { ReportStudentScolarByClass, ReportStudentScolarByRoom, ReportStudentScolarByClassAndRoom } from './report-student-scolar.entity';
import { ReportStudentSendToByClass, ReportStudentSendToByRoom, ReportStudentSendToByClassAndRoom, ReportStudentSendToSumarize } from './report-student-send-to.entity';
import { ReportController } from './report.controller';
import { ReportStudentByClass, ReportStudentByRoom, ReportStudentSumarize } from './report.entity';
import { ReportService } from './report.service';
import { ReportStressSumarize, ReportStressByClass, ReportStressByClassAndRoom, ReportStressByRoom } from './stress-report.entity';
import { ReportTeacherBySubject, ReportTeacherSumarize } from './teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportStudentByClass,
      ReportStudentByRoom,
      ReportStudentSumarize,
      ReportTeacherBySubject,
      ReportTeacherSumarize,
      ReportCheckStudentSumarize,
      ReportEqSumarize,
      ReportEqByRoom,
      ReportEqByClass,
      ReportEqByClassAndRoom,
      ReportDepressionSumarize,
      ReportDepressionByClass,
      ReportDepressionByClassAndRoom,
      ReportDepressionPesonal,
      ReportStudentFilterSumarize,
      ReportStudentFilterByClass,
      ReportStudentFilterByClassAndRoom,
      ReportStudentFilterByRoom,
      ReportStudentHelpByClass,
      ReportStudentHelpByRoom,
      ReportStudentHelpByClassAndRoom,
      ReportStudentScolarByClass,
      ReportStudentScolarByRoom,
      ReportStudentScolarByClassAndRoom,
      ReportStudentSendToByClass,
      ReportStudentSendToByRoom,
      ReportStudentSendToByClassAndRoom,
      ReportStressSumarize,
      ReportStressByClass,
      ReportStressByClassAndRoom,
      ReportStressByRoom,
      ReportStudentSendToSumarize,
      ReportStudentFilterPosonal,
      ReportStudentFilterSumarizeByClassAndRoom,YearTerm,
      Classroom,
      ClassroomType,
      VwClassroomTypeDropdown,
      VwClassroomDropdown,
      VwYearTermDropdown,
      ReportHomeVisitNeedHelp,
      ReportHomeVisitSumarize,
      ReportHomeVisitPersonal
    ]),
    ExportPdfModule,YearTermModule,StudentModule,ImagesModule
  ],
  controllers: [ReportController],
  providers: [ReportService,DropdownService],
  exports: [ReportService,DropdownService]
})
export class ReportModule {}
