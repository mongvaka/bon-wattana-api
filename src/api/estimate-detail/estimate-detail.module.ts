import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { VwEstimateTempDropdown } from 'src/api/estimate-temp/estimate-temp.entity';
import { EstimateDetailController } from './estimate-detail.controller';
import { EstimateDetail, VwEstimateDetailDropdown, VwEstimateDetailItem, VwEstimateDetailList } from './estimate-detail.entity';
import { EstimateDetailService } from './estimate-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstimateDetail,VwEstimateDetailList,VwEstimateDetailItem,VwEstimateDetailDropdown,
    VwStudentDropdown,
    VwEstimateTempDropdown,
    ])
  ],
  controllers: [EstimateDetailController],
  providers: [EstimateDetailService,DropdownService],
  exports: [EstimateDetailService,DropdownService]
})
export class EstimateDetailModule {}
