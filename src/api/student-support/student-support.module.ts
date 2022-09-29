import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { StudentSupportController } from './student-support.controller';
import { StudentSupport, VwStudentSupportDropdown, VwStudentSupportItem, VwStudentSupportList } from './student-support.entity';
import { StudentSupportService } from './student-support.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentSupport,VwStudentSupportList,VwStudentSupportItem,VwStudentSupportDropdown,
    VwTeacherDropdown,
    ])
  ],
  controllers: [StudentSupportController],
  providers: [StudentSupportService,DropdownService],
  exports: [StudentSupportService,DropdownService]
})
export class StudentSupportModule {}
