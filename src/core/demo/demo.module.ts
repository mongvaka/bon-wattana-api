import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Images } from '../images/images.entity';
import { ImagesModule } from '../images/images.module';
import { ImagesService } from '../images/images.service';
import { DemoController } from './demo.controller';
import { Demo, VwDemoDropdown, VwDemoItem, VwDemoList } from './demo.entity';
import { DemoService } from './demo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demo,VwDemoList,VwDemoItem,VwDemoDropdown]),
    ImagesModule
  ],
  controllers: [DemoController],
  providers: [DemoService,DropdownService],
  exports: [DemoService,DropdownService]
})
export class DemoModule {}
