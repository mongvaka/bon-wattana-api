import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { RequestEditController } from './request-edit.controller';
import { RequestEdit, VwRequestEditDropdown, VwRequestEditItem, VwRequestEditList } from './request-edit.entity';
import { RequestEditService } from './request-edit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEdit,VwRequestEditList,VwRequestEditItem,VwRequestEditDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [RequestEditController],
  providers: [RequestEditService,DropdownService],
  exports: [RequestEditService,DropdownService]
})
export class RequestEditModule {}
