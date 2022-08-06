import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { ProductController } from './product.controller';
import { Product, VwProductDropdown, VwProductItem, VwProductList } from './product.entity';
import {  ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,VwProductList,VwProductItem,VwProductDropdown])
  ],
  controllers: [ProductController],
  providers: [ProductService,DropdownService],
  exports: [ProductService,DropdownService]
})
export class ProductModule {}
