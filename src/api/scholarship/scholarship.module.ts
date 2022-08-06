import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { ScholarshipController } from './scholarship.controller';
import { Scholarship, VwScholarshipDropdown, VwScholarshipItem, VwScholarshipList } from './scholarship.entity';
import { ScholarshipService } from './scholarship.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Scholarship,VwScholarshipList,VwScholarshipItem,VwScholarshipDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [ScholarshipController],
  providers: [ScholarshipService,DropdownService],
  exports: [ScholarshipService,DropdownService]
})
export class ScholarshipModule {}
