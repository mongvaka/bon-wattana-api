import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
//import { VwnullDropdown } from 'src/api/null/null.entity';
import { VwClassroomDropdown } from 'src/api/classroom/classroom.entity';
import { VwClassroomTypeDropdown } from 'src/api/classroom-type/classroom-type.entity';
import { StudentHomeVisitController } from './student-home-visit.controller';
import { StudentHomeVisit, VwStudentHomeVisitDropdown, VwStudentHomeVisitItem, VwStudentHomeVisitList } from './student-home-visit.entity';
import { StudentHomeVisitService } from './student-home-visit.service';
import { VwStudentItem } from 'src/api/student/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentHomeVisit,VwStudentHomeVisitList,VwStudentHomeVisitItem,VwStudentHomeVisitDropdown,
      VwClassroomDropdown,VwClassroomTypeDropdown,VwStudentItem
    ])
  ],
  controllers: [StudentHomeVisitController],
  providers: [StudentHomeVisitService,DropdownService],
  exports: [StudentHomeVisitService,DropdownService]
})
export class StudentHomeVisitModule {}
