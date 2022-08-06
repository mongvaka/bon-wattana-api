import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwHopitalDropdown } from 'src/api/hopital/hopital.entity';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { VwOldSchoolDropdown } from 'src/api/old-school/old-school.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { StudentController } from './student.controller';
import { Student, VwStudentDropdown, VwStudentItem, VwStudentList } from './student.entity';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student,VwStudentList,VwStudentItem,VwStudentDropdown,
    VwHopitalDropdown,
    VwCountryDropdown,
    VwSubDistrictDropdown,
    VwDistrictDropdown,
    VwProvinceDropdown,
    VwOldSchoolDropdown,
    VwTeacherDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService,DropdownService],
  exports: [StudentService,DropdownService]
})
export class StudentModule {}
