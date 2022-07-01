import {BadRequestException, Injectable} from '@nestjs/common';
import {Brackets, In, Repository} from "typeorm";
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IBasicService} from "../shared/interfaces/basic-service.interface";
import {CreatedUsersDto, DeletedUsersDto, SearchUsersDto, UpdatedUsersDto} from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
  }


  async deleted(dto: DeletedUsersDto) {
    let users = await this.findById(dto.id);
    users = {
      ...users,
      ...dto,
      id: users.id,
      deletedAt: new Date()
    }
    return await this.usersRepository.softRemove(await this.usersRepository.save(users));
  }

  async tokenUpdated(user: Users, token: string): Promise<Users> {
    user.token = token;
    return await this.usersRepository.save(user);
  }

  async findByIdAndActive(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where: {id: id, active: true},
    });
  }

  async findByUsernameAndActive(
    username: string,
  ): Promise<Users> {
    return this.usersRepository.findOne({
      where: {username: username, active: true}
    });
  }
  async findById(id: number): Promise<Users> {
    return await this.usersRepository.findOne({
      where: {id: id},
    });
  }

}
