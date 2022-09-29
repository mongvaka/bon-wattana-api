import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { StudentHelpController } from './student-help.controller';
import { StudentHelp, VwStudentHelpDropdown, VwStudentHelpItem, VwStudentHelpList } from './student-help.entity';
import { StudentHelpService } from './student-help.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentHelp,VwStudentHelpList,VwStudentHelpItem,VwStudentHelpDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [StudentHelpController],
  providers: [StudentHelpService,DropdownService],
  exports: [StudentHelpService,DropdownService]
})
export class StudentHelpModule {}
