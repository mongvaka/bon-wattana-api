import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SarCompetencyAssessmentController } from './sar-competency-assessment.controller';
import { SarCompetencyAssessment, VwSarCompetencyAssessmentDropdown, VwSarCompetencyAssessmentItem, VwSarCompetencyAssessmentList } from './sar-competency-assessment.entity';
import { SarCompetencyAssessmentService } from './sar-competency-assessment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SarCompetencyAssessment,VwSarCompetencyAssessmentList,VwSarCompetencyAssessmentItem,VwSarCompetencyAssessmentDropdown,
    VwTeacherDropdown,
    ])
  ],
  controllers: [SarCompetencyAssessmentController],
  providers: [SarCompetencyAssessmentService,DropdownService],
  exports: [SarCompetencyAssessmentService,DropdownService]
})
export class SarCompetencyAssessmentModule {}
