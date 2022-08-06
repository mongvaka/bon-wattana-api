import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { UniversityController } from './university.controller';
import { University, VwUniversityDropdown, VwUniversityItem, VwUniversityList } from './university.entity';
import { UniversityService } from './university.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([University,VwUniversityList,VwUniversityItem,VwUniversityDropdown,
    VwCountryDropdown,
    VwProvinceDropdown,
    VwDistrictDropdown,
    VwSubDistrictDropdown,
    ])
  ],
  controllers: [UniversityController],
  providers: [UniversityService,DropdownService],
  exports: [UniversityService,DropdownService]
})
export class UniversityModule {}
