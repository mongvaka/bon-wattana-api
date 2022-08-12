import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { ProductOptionController } from './product-option.controller';
import { ProductOption, VwProductOptionDropdown, VwProductOptionItem, VwProductOptionList } from './product-option.entity';
import { ProductOptionService } from './product-option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOption,VwProductOptionList,VwProductOptionItem,VwProductOptionDropdown,
    VwProductDropdown,
    ])
  ],
  controllers: [ProductOptionController],
  providers: [ProductOptionService,DropdownService],
  exports: [ProductOptionService,DropdownService]
})
export class ProductOptionModule {}
