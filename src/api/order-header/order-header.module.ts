import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwUserDropdown } from 'src/core/users/users.entity';
import { OrderHeaderController } from './order-header.controller';
import { OrderHeader, VwOrderHeaderDropdown, VwOrderHeaderItem, VwOrderHeaderList } from './order-header.entity';
import { OrderHeaderService } from './order-header.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderHeader,VwOrderHeaderList,VwOrderHeaderItem,VwOrderHeaderDropdown,
    VwUserDropdown,
    ])
  ],
  controllers: [OrderHeaderController],
  providers: [OrderHeaderService,DropdownService],
  exports: [OrderHeaderService,DropdownService]
})
export class OrderHeaderModule {}
