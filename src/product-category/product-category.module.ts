import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/shared/services/dropdown.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategory, VwProductCategoryDropdown, VwProductCategoryItem, VwProductCategoryList } from './product-category.entity';
import {  ProductCategoryService } from './product-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory,VwProductCategoryList,VwProductCategoryItem,VwProductCategoryDropdown])
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService,DropdownService],
  exports: [ProductCategoryService,DropdownService]
})
export class ProductCategoryModule {}
