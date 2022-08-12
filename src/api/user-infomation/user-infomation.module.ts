import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwUserDropdown } from 'src/core/users/users.entity';
import { UserInfomationController } from './user-infomation.controller';
import { UserInfomation, VwUserInfomationDropdown, VwUserInfomationItem, VwUserInfomationList } from './user-infomation.entity';
import { UserInfomationService } from './user-infomation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfomation,VwUserInfomationList,VwUserInfomationItem,VwUserInfomationDropdown,
    VwUserDropdown,
    ])
  ],
  controllers: [UserInfomationController],
  providers: [UserInfomationService,DropdownService],
  exports: [UserInfomationService,DropdownService]
})
export class UserInfomationModule {}
