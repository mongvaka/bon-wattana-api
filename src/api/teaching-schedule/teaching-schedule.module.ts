import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { VwYearTermDropdown } from 'src/api/year-term/year-term.entity';
import { TeachingScheduleController } from './teaching-schedule.controller';
import { TeachingSchedule, VwTeachingScheduleDropdown, VwTeachingScheduleItem, VwTeachingScheduleList } from './teaching-schedule.entity';
import { TeachingScheduleService } from './teaching-schedule.service';
import { YearTermModule } from '../year-term/year-term.module';
import { TeacherModule } from '../teacher/teacher.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([TeachingSchedule,VwTeachingScheduleList,VwTeachingScheduleItem,VwTeachingScheduleDropdown,
    VwTeacherDropdown,
    VwYearTermDropdown
    ]),
    YearTermModule,
    TeacherModule
  ],
  controllers: [TeachingScheduleController],
  providers: [TeachingScheduleService,DropdownService],
  exports: [TeachingScheduleService,DropdownService]
})
export class TeachingScheduleModule {}
