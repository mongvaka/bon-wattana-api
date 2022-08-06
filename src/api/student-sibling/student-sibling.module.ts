import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { StudentSiblingController } from './student-sibling.controller';
import { StudentSibling, VwStudentSiblingDropdown, VwStudentSiblingItem, VwStudentSiblingList } from './student-sibling.entity';
import { StudentSiblingService } from './student-sibling.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentSibling,VwStudentSiblingList,VwStudentSiblingItem,VwStudentSiblingDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [StudentSiblingController],
  providers: [StudentSiblingService,DropdownService],
  exports: [StudentSiblingService,DropdownService]
})
export class StudentSiblingModule {}
