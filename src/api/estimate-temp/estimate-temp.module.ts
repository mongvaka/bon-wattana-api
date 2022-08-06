import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwEstimateGroupDropdown } from 'src/api/estimate-group/estimate-group.entity';
import { EstimateTempController } from './estimate-temp.controller';
import { EstimateTemp, VwEstimateTempDropdown, VwEstimateTempItem, VwEstimateTempList } from './estimate-temp.entity';
import { EstimateTempService } from './estimate-temp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstimateTemp,VwEstimateTempList,VwEstimateTempItem,VwEstimateTempDropdown,
    VwEstimateGroupDropdown,
    ])
  ],
  controllers: [EstimateTempController],
  providers: [EstimateTempService,DropdownService],
  exports: [EstimateTempService,DropdownService]
})
export class EstimateTempModule {}
