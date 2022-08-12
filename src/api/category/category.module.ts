import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { CategoryController } from './category.controller';
import { Category, VwCategoryDropdown, VwCategoryItem, VwCategoryList } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category,VwCategoryList,VwCategoryItem,VwCategoryDropdown,
    VwCategoryDropdown,
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService,DropdownService],
  exports: [CategoryService,DropdownService]
})
export class CategoryModule {}
