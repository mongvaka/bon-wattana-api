import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform, ValidationError} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {In, Not, Repository} from "typeorm";
import {CreatedUsersDto} from "./users.dto";

@Injectable()
export class CreatedUsersValidation implements PipeTransform {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {
  }

  async transform(dto: CreatedUsersDto, metadata: ArgumentMetadata) {
    const found = await this.usersRepository.findOne({where: {username: dto.username, deleted: false}});
    if (found) {
      throw new BadRequestException('User account already exists')
    }
    return dto;
  }
}

@Injectable()
export class UpdatedUsersValidation implements PipeTransform {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {
  }

  async transform(dto: CreatedUsersDto, metadata: ArgumentMetadata) {
    const found = await this.usersRepository.findOne({where: {id: Not(dto.id), username: dto.username, deleted: false}});
    if (found) {
      throw new BadRequestException('User account already exists')
    }
    return dto;
  }
}