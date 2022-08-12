import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetail, VwProductDetailDropdown, VwProductDetailItem, VwProductDetailList } from './product-detail.entity';
import { ProductDetailService } from './product-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDetail,VwProductDetailList,VwProductDetailItem,VwProductDetailDropdown,
    VwProductDropdown,
    ])
  ],
  controllers: [ProductDetailController],
  providers: [ProductDetailService,DropdownService],
  exports: [ProductDetailService,DropdownService]
})
export class ProductDetailModule {}
