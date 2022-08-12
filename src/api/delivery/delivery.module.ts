import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwOrderHeaderDropdown } from 'src/api/order-header/order-header.entity';
import { DeliveryController } from './delivery.controller';
import { Delivery, VwDeliveryDropdown, VwDeliveryItem, VwDeliveryList } from './delivery.entity';
import { DeliveryService } from './delivery.service';
import { VwUserDropdown } from 'src/core/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery,VwDeliveryList,VwDeliveryItem,VwDeliveryDropdown,
    VwUserDropdown,
    VwOrderHeaderDropdown,
    ])
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService,DropdownService],
  exports: [DeliveryService,DropdownService]
})
export class DeliveryModule {}
