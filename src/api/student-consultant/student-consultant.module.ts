import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { StudentConsultantController } from './student-consultant.controller';
import { StudentConsultant, VwStudentConsultantDropdown, VwStudentConsultantItem, VwStudentConsultantList } from './student-consultant.entity';
import { StudentConsultantService } from './student-consultant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentConsultant,VwStudentConsultantList,VwStudentConsultantItem,VwStudentConsultantDropdown,
    VwStudentDropdown,
    VwTeacherDropdown,
    ])
  ],
  controllers: [StudentConsultantController],
  providers: [StudentConsultantService,DropdownService],
  exports: [StudentConsultantService,DropdownService]
})
export class StudentConsultantModule {}
