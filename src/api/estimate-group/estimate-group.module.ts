import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { EstimateGroupController } from './estimate-group.controller';
import { EstimateGroup, VwEstimateGroupDropdown, VwEstimateGroupItem, VwEstimateGroupList } from './estimate-group.entity';
import { EstimateGroupService } from './estimate-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstimateGroup,VwEstimateGroupList,VwEstimateGroupItem,VwEstimateGroupDropdown,
    ])
  ],
  controllers: [EstimateGroupController],
  providers: [EstimateGroupService,DropdownService],
  exports: [EstimateGroupService,DropdownService]
})
export class EstimateGroupModule {}
