import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { VwUniversityDropdown } from 'src/api/university/university.entity';
import { DegreeController } from './degree.controller';
import { Degree, VwDegreeDropdown, VwDegreeItem, VwDegreeList } from './degree.entity';
import { DegreeService } from './degree.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Degree,VwDegreeList,VwDegreeItem,VwDegreeDropdown,
    VwTeacherDropdown,
    VwUniversityDropdown,
    ])
  ],
  controllers: [DegreeController],
  providers: [DegreeService,DropdownService],
  exports: [DegreeService,DropdownService]
})
export class DegreeModule {}
