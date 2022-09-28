import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { StudentFilterController } from './student-filter.controller';
import { StudentFilter, VwStudentFilterDropdown, VwStudentFilterItem, VwStudentFilterList } from './student-filter.entity';
import { StudentFilterService } from './student-filter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentFilter,VwStudentFilterList,VwStudentFilterItem,VwStudentFilterDropdown,
    VwStudentDropdown,
    VwYearTermDropdown,
    ])
  ],
  controllers: [StudentFilterController],
  providers: [StudentFilterService,DropdownService],
  exports: [StudentFilterService,DropdownService]
})
export class StudentFilterModule {}
