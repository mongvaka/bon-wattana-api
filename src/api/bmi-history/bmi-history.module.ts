import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { BmiHistoryController } from './bmi-history.controller';
import { BmiHistory, VwBmiHistoryDropdown, VwBmiHistoryItem, VwBmiHistoryList } from './bmi-history.entity';
import { BmiHistoryService } from './bmi-history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BmiHistory,VwBmiHistoryList,VwBmiHistoryItem,VwBmiHistoryDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [BmiHistoryController],
  providers: [BmiHistoryService,DropdownService],
  exports: [BmiHistoryService,DropdownService]
})
export class BmiHistoryModule {}
