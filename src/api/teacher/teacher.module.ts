import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { TeacherController } from './teacher.controller';
import { Teacher, VwTeacherDropdown, VwTeacherItem, VwTeacherList } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher,VwTeacherList,VwTeacherItem,VwTeacherDropdown,
    VwCountryDropdown,
    VwProvinceDropdown,
    VwDistrictDropdown,
    VwSubDistrictDropdown,
    ])
  ],
  controllers: [TeacherController],
  providers: [TeacherService,DropdownService],
  exports: [TeacherService,DropdownService]
})
export class TeacherModule {}
