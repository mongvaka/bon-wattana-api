import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { StressController } from './stress.controller';
import { Stress, VwStressDropdown, VwStressItem, VwStressList } from './stress.entity';
import { StressService } from './stress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stress,VwStressList,VwStressItem,VwStressDropdown,
    VwStudentDropdown,
    VwYearTermDropdown,
    ])
  ],
  controllers: [StressController],
  providers: [StressService,DropdownService],
  exports: [StressService,DropdownService]
})
export class StressModule {}
