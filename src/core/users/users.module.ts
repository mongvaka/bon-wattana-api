import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users, VwUsersDropdown, VwUsersItem, VwUsersList} from "./users.entity";
import { DropdownService } from '../shared/services/dropdown.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users,VwUsersList,VwUsersItem,VwUsersDropdown,])
  ],
  controllers: [UsersController],
  providers: [UsersService,DropdownService],
  exports: [UsersService]
})
export class UsersModule {
}
