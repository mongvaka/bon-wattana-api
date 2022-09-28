import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { StudentScolarController } from './student-scolar.controller';
import { StudentScolar, VwStudentScolarDropdown, VwStudentScolarItem, VwStudentScolarList } from './student-scolar.entity';
import { StudentScolarService } from './student-scolar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentScolar,VwStudentScolarList,VwStudentScolarItem,VwStudentScolarDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [StudentScolarController],
  providers: [StudentScolarService,DropdownService],
  exports: [StudentScolarService,DropdownService]
})
export class StudentScolarModule {}
