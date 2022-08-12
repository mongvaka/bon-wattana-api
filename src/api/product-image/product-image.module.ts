import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwProductDropdown } from 'src/api/product/product.entity';
import { ProductImageController } from './product-image.controller';
import { ProductImage, VwProductImageDropdown, VwProductImageItem, VwProductImageList } from './product-image.entity';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage,VwProductImageList,VwProductImageItem,VwProductImageDropdown,
    VwProductDropdown,
    ])
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService,DropdownService],
  exports: [ProductImageService,DropdownService]
})
export class ProductImageModule {}
