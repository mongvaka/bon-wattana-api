import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwDeliveryDropdown } from 'src/api/delivery/delivery.entity';
import { DeliveryTrackingController } from './delivery-tracking.controller';
import { DeliveryTracking, VwDeliveryTrackingDropdown, VwDeliveryTrackingItem, VwDeliveryTrackingList } from './delivery-tracking.entity';
import { DeliveryTrackingService } from './delivery-tracking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryTracking,VwDeliveryTrackingList,VwDeliveryTrackingItem,VwDeliveryTrackingDropdown,
    VwDeliveryDropdown,
    ])
  ],
  controllers: [DeliveryTrackingController],
  providers: [DeliveryTrackingService,DropdownService],
  exports: [DeliveryTrackingService,DropdownService]
})
export class DeliveryTrackingModule {}
