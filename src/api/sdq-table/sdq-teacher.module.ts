import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { SdqTeacherController } from './sdq-teacher.controller';
import { SdqTable, VwSdqTableDropdown, VwSdqTableItem, VwSdqTableList } from './sdq-table.entity';
import { SdqTableService } from './sdq-table.service';
import { VwClassroomDropdown } from 'src/api/classroom/classroom.entity';
import { VwClassroomTypeDropdown } from 'src/api/classroom-type/classroom-type.entity';
import { VwStudentItem } from 'src/api/student/student.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([SdqTable,VwSdqTableList,VwSdqTableItem,VwSdqTableDropdown,VwClassroomDropdown,VwClassroomTypeDropdown
    ,VwStudentItem])
  ],
  controllers: [SdqTeacherController],
  providers: [SdqTableService,DropdownService],
  exports: [SdqTableService,DropdownService]
})
export class SdqTeacherModule {}
