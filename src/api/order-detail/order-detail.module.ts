import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwOrderHeaderDropdown } from 'src/api/order-header/order-header.entity';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { VwProductOptionDropdown } from 'src/api/product-option/product-option.entity';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetail, VwOrderDetailDropdown, VwOrderDetailItem, VwOrderDetailList } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail,VwOrderDetailList,VwOrderDetailItem,VwOrderDetailDropdown,
    VwOrderHeaderDropdown,
    VwProductDropdown,
    VwProductOptionDropdown,
    ])
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService,DropdownService],
  exports: [OrderDetailService,DropdownService]
})
export class OrderDetailModule {}
