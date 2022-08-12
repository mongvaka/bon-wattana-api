import {BadRequestException, Injectable} from '@nestjs/common';
import {Brackets, In, Repository} from "typeorm";
import {User} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IBasicService} from "../shared/interfaces/basic-service.interface";
import {CreatedUserDto, DeletedUserDto, SearchUserDto, UpdatedUserDto} from "./users.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

  async create(model:User){
    const en = this.usersRepository.create(model)
    console.log('en',en);
    

    const result = await this.usersRepository.save(
      en
    )

    console.log('result2:',result);
    return result
    
  }
  async deleted(dto: DeletedUserDto) {
    let users = await this.findById(dto.id);
    users.deleted = true
    users.deletedAt = new Date()
    users.deletedBy = dto.deletedBy



    return await this.usersRepository.softRemove(await this.usersRepository.save(users));
  }

  async tokenUpdated(user: User, token: string): Promise<User> {
    user.token = token;
    return await this.usersRepository.save(user);
  }

  async findByIdAndActive(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {id: id, active: true},
    });
  }

  async findByUsernameAndActive(
    username: string
  ): Promise<User> {
    console.log('username',username);
    
    return this.usersRepository.findOne({
      where: {username: username, active: true}
    });
  }
  async findByEmail(
    email: string,
  ): Promise<User> {
    return this.usersRepository.findOne({
      where: {username: email, active: true}
    });
  }
  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {id: id},
    });
  }

}
