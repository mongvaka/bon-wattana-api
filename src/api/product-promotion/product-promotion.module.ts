import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { ProductPromotionController } from './product-promotion.controller';
import { ProductPromotion, VwProductPromotionDropdown, VwProductPromotionItem, VwProductPromotionList } from './product-promotion.entity';
import { ProductPromotionService } from './product-promotion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPromotion,VwProductPromotionList,VwProductPromotionItem,VwProductPromotionDropdown,
    VwProductDropdown,
    ])
  ],
  controllers: [ProductPromotionController],
  providers: [ProductPromotionService,DropdownService],
  exports: [ProductPromotionService,DropdownService]
})
export class ProductPromotionModule {}
