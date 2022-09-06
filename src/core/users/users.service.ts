import {BadRequestException, Injectable} from '@nestjs/common';
import {Brackets, In, Repository} from "typeorm";
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IBasicService} from "../shared/interfaces/basic-service.interface";
import {CreatedUsersDto, DeletedUsersDto, SearchUsersDto, UpdatedUsersDto} from "./users.dto";
import { ChangePasswordDto } from '../authentications/authentications.dto';
import { CustomRequest } from '../shared/models/request-model';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  async remove(duplicateEmail: Users) {
    return this.usersRepository.remove(duplicateEmail)
  }
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
  }

  async create(model:Users){
    const en = this.usersRepository.create(model)    
    const result = await this.usersRepository.save(
      en
    )
    return result
    
  }
  async deleted(dto: DeletedUsersDto) {
    let users = await this.findById(dto.id);
    users.deleted = true
    users.deletedAt = new Date()
    users.deletedBy = dto.deletedBy



    return this.usersRepository.softRemove(await this.usersRepository.save(users));
  }

  async tokenUpdated(user: Users, token: string): Promise<Users> {
    user.token = token;
    return this.usersRepository.save(user);
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
      where: {username: email, active: true,deleted:false}
    });
  }
  async findById(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where: {id: id},
    });
  }
  async changePassword(dto: ChangePasswordDto, req: CustomRequest): Promise<any> {
    const user = req.user
    const hasepassword = await bcrypt.hash(dto.newPassword,12);
    const model = await this.usersRepository.findOne({where:{id:user.id}})
    model.password = hasepassword
    await this.usersRepository.save(model)
    return true    
  }
}
