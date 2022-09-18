import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { DepressionController } from './depression.controller';
import { Depression, VwDepressionDropdown, VwDepressionItem, VwDepressionList } from './depression.entity';
import { DepressionService } from './depression.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Depression,VwDepressionList,VwDepressionItem,VwDepressionDropdown,
    VwStudentDropdown,
    VwYearTermDropdown,
    ])
  ],
  controllers: [DepressionController],
  providers: [DepressionService,DropdownService],
  exports: [DepressionService,DropdownService]
})
export class DepressionModule {}
