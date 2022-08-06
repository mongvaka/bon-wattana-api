import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwCongenitialDiseaseDropdown } from 'src/api/congenitial-disease/congenitial-disease.entity';
import { HomeVisitController } from './home-visit.controller';
import { HomeVisit, VwHomeVisitDropdown, VwHomeVisitItem, VwHomeVisitList } from './home-visit.entity';
import { HomeVisitService } from './home-visit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeVisit,VwHomeVisitList,VwHomeVisitItem,VwHomeVisitDropdown,
    VwStudentDropdown,
    VwCongenitialDiseaseDropdown,
    ])
  ],
  controllers: [HomeVisitController],
  providers: [HomeVisitService,DropdownService],
  exports: [HomeVisitService,DropdownService]
})
export class HomeVisitModule {}
