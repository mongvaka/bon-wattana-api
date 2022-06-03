import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/shared/services/dropdown.service';
import { DemoController } from './demo.controller';
import { Demo, VwDemoItem, VwDemoList } from './demo.entity';
import { DemoService } from './demo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demo,VwDemoList,VwDemoItem])
  ],
  controllers: [DemoController],
  providers: [DemoService,DropdownService],
  exports: [DemoService,DropdownService]
})
export class DemoModule {}
