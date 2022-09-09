import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
//import { VwnullDropdown } from 'src/api/null/null.entity';
import { StudentHomeVisitController } from './student-home-visit.controller';
import { StudentHomeVisit, VwStudentHomeVisitDropdown, VwStudentHomeVisitItem, VwStudentHomeVisitList } from './student-home-visit.entity';
import { StudentHomeVisitService } from './student-home-visit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentHomeVisit,VwStudentHomeVisitList,VwStudentHomeVisitItem,VwStudentHomeVisitDropdown,
    
    ])
  ],
  controllers: [StudentHomeVisitController],
  providers: [StudentHomeVisitService,DropdownService],
  exports: [StudentHomeVisitService,DropdownService]
})
export class StudentHomeVisitModule {}
