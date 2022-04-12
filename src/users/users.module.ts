import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {TypeCode} from "./type-code.entity";
import {DepartmentCode} from "./department-code.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, TypeCode, DepartmentCode])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
