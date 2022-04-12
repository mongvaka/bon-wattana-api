import {BadRequestException, Injectable} from '@nestjs/common';
import {Brackets, In, Repository} from "typeorm";
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IBasicService} from "../shared/interfaces/basic-service.interface";
import {CreatedUsersDto, DeletedUsersDto, SearchUsersDto, UpdatedUsersDto} from "./users.dto";
import {
  calculatePaging,
  createOrderForBuilder
} from "../shared/helpers/typeorm-query.helper";
import {UsersPagenation} from "./users.response";
import {EModule} from "./users.enum";
import {TypeCode} from "./type-code.entity";
import {DepartmentCode} from "./department-code.entity";

@Injectable()
export class UsersService implements IBasicService<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(TypeCode)
    private readonly typeCodeRepository: Repository<TypeCode>,
    @InjectRepository(DepartmentCode)
    private readonly departmentCodeRepository: Repository<DepartmentCode>
  ) {
  }

  async insert(dto: CreatedUsersDto): Promise<Users> {

    const typeCode = await this.typeCodeRepository.findOne({where: {id: dto.typeCodeId}});
    if (!typeCode) throw new BadRequestException('typeCode not found')
    const departmentCode = await this.departmentCodeRepository.findOne({where: {id: dto.departmentCodeId}})
    if (!departmentCode) throw new BadRequestException('departmentCode not found')
    const en: Users = {
      ...dto,
      typeCode: typeCode,
      departmentCode: departmentCode
    };
    const users = this.usersRepository.create(en);
    return await this.usersRepository.save(users);
  }

  async updated(dto: UpdatedUsersDto): Promise<Users> {
    let users = await this.usersRepository.findOne({where: {id: dto.id}});
    const typeCode = await this.typeCodeRepository.findOne({where: {id: dto.typeCodeId}});
    if (!typeCode) throw new BadRequestException('typeCode not found')
    const departmentCode = await this.departmentCodeRepository.findOne({where: {id: dto.departmentCodeId}})
    if (!departmentCode) throw new BadRequestException('departmentCode not found')
    users = {
      ...users,
      ...dto,
      id: users.id,
      typeCode: typeCode,
      departmentCode: departmentCode
    };
    return await this.usersRepository.save(users);
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

  async paginate(dto: SearchUsersDto): Promise<UsersPagenation> {
    const _order = createOrderForBuilder('user', dto.sortBy, dto.orderBy);
    const {skip, limit} = calculatePaging(dto.page, dto.size);
    const builder = this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.typeCode', 'typeCode')
      .innerJoinAndSelect('user.departmentCode', 'departmentCode')
      .where('1=1');

    if (dto.username != undefined) {
      builder.andWhere(new Brackets(qb => {
        qb.where('user.username LIKE :username', {username: `%${dto.username}%`})
          .orWhere('user.firstName LIKE :firstName', {firstName: `%${dto.username}%`})
          .orWhere('user.lastName LIKE :lastName', {lastName: `%${dto.username}%`})
      }))
    }
    if (dto.typeCodeId != undefined) {
      builder.andWhere('user.typeCode = :typeCode', {typeCode: dto.typeCodeId})
    }
    if (dto.departmentCodeId != undefined) {
      builder.andWhere('user.departmentCode = :departmentCode', {departmentCode: dto.departmentCodeId})
    }
    if (dto.module != undefined) {
      if (dto.module == EModule.SUPPLIER_FUNDING) {
        builder.andWhere('user.supplierFunding = :supplierFunding', {supplierFunding: true})
      }
      if (dto.module == EModule.PROPERTY_CONTRACT) {
        builder.andWhere('user.propertyContract = :propertyContract', {propertyContract: true})
      }
    }
    if (dto.status != undefined) {
      const status = dto.status == 'Active';
      builder.andWhere('user.active = :active', {active: status})
    }
    const [data, count] = await builder
      .orderBy({..._order})
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const result = new UsersPagenation();
    result.currentPage = dto.page;
    result.total = count;
    result.perPage = limit;
    result.success = true;
    result.error = [];
    result.totalPage = Math.ceil(count / limit);
    result.data = data;
    return result;
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

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<Users> {
    return await this.usersRepository.findOne({
      where: {id: id},
    });
  }

  async findByIdAndRelations(id: number): Promise<Users> {
    return await this.usersRepository.findOne({
      relations: ['typeCode', 'departmentCode'],
      where: {id: id},
    });
  }

  async generate() {
    const departments: string[] = ['IT', 'Commercial', 'Newformat', 'Property', 'Legal', 'Compliance', 'Marketing', 'Finance'];
    for (const it of departments) {
      const en = this.departmentCodeRepository.create({
        id: departments.indexOf(it) + 1,
        name: it,
        active: true,
        deleted: false,
      })
      await this.departmentCodeRepository.save(en);
    }

    const typeCodes: string[] = ['Admin', 'User', 'Guest'];
    for (const it of typeCodes) {
      let en: TypeCode = {
        id: typeCodes.indexOf(it) + 1,
        name: it,
        active: true,
        deleted: false,
        departmentCodes: []
      }
      if(it == 'Admin'){
        const departs = await this.departmentCodeRepository.find({where: {id: In([1])}});
        en = {
          ...en,
          departmentCodes: departs
        }
      }else if(it == 'User'){
        const departs = await this.departmentCodeRepository.find({where: {id: In([2,3,4,5])}});
        en = {
          ...en,
          departmentCodes: departs
        }
      }else{
        const departs = await this.departmentCodeRepository.find({where: {id: In([1, 6, 7, 8])}});
        en = {
          ...en,
          departmentCodes: departs
        }
      }
      await this.typeCodeRepository.save(this.typeCodeRepository.create(en));
    }
  }

  async departmentCodeFindAll(): Promise<DepartmentCode[]> {
    return await this.departmentCodeRepository.find({where: {active: true, deleted: false}});
  }

  async typeCodeFindAll(): Promise<TypeCode[]> {
    return await this.typeCodeRepository.find({relations: ['departmentCodes'], where: {active: true, deleted: false}});
  }
}
