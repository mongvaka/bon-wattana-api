import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwAddressDropdown } from 'src/api/address/address.entity';
import { OldSchoolController } from './old-school.controller';
import { OldSchool, VwOldSchoolDropdown, VwOldSchoolItem, VwOldSchoolList } from './old-school.entity';
import { OldSchoolService } from './old-school.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OldSchool,VwOldSchoolList,VwOldSchoolItem,VwOldSchoolDropdown,
    VwAddressDropdown,
    ])
  ],
  controllers: [OldSchoolController],
  providers: [OldSchoolService,DropdownService],
  exports: [OldSchoolService,DropdownService]
})
export class OldSchoolModule {}
