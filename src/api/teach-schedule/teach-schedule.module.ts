import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
// import { VwCourseDropdown } from 'src/api/course/course.entity';
import { TeachScheduleController } from './teach-schedule.controller';
import { TeachSchedule, VwTeachScheduleDropdown, VwTeachScheduleItem, VwTeachScheduleList } from './teach-schedule.entity';
import { TeachScheduleService } from './teach-schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeachSchedule,VwTeachScheduleList,VwTeachScheduleItem,VwTeachScheduleDropdown,
    VwTeacherDropdown,
    // VwCourseDropdown,
    ])
  ],
  controllers: [TeachScheduleController],
  providers: [TeachScheduleService,DropdownService],
  exports: [TeachScheduleService,DropdownService]
})
export class TeachScheduleModule {}
