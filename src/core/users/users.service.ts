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

  async create(model:Users){
    const en = this.usersRepository.create(model)
    console.log('en',en);
    

    const result = await this.usersRepository.save(
      en
    )

    console.log('result2:',result);
    return result
    
  }
  async deleted(dto: DeletedUsersDto) {
    let users = await this.findById(dto.id);
    users.deleted = true
    users.deletedAt = new Date()
    users.deletedBy = dto.deletedBy



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
    username: string
  ): Promise<Users> {
    console.log('username',username);
    
    return this.usersRepository.findOne({
      where: {username: username, active: true}
    });
  }
  async findByEmail(
    email: string,
  ): Promise<Users> {
    return this.usersRepository.findOne({
      where: {username: email, active: true}
    });
  }
  async findById(id: number): Promise<Users> {
    return await this.usersRepository.findOne({
      where: {id: id},
    });
  }

}
