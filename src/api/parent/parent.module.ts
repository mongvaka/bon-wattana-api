import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { ParentController } from './parent.controller';
import { Parent, VwParentDropdown, VwParentItem, VwParentList } from './parent.entity';
import { ParentService } from './parent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parent,VwParentList,VwParentItem,VwParentDropdown,
    ])
  ],
  controllers: [ParentController],
  providers: [ParentService,DropdownService],
  exports: [ParentService,DropdownService]
})
export class ParentModule {}
