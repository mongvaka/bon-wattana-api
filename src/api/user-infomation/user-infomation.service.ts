import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { SearchUserDto } from 'src/core/users/users.dto';
import { VwUserDropdown } from 'src/core/users/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInfomationDto, UserInfomationDto, SearchUserInfomationDto, UpdateUserInfomationDto } from './user-infomation.dto';
import { UserInfomation, VwUserInfomationDropdown, VwUserInfomationItem, VwUserInfomationList } from './user-infomation.entity';

@Injectable()
export class UserInfomationService extends BaseService {

    constructor(
        @InjectRepository(UserInfomation)
        private readonly userinfomationRepository: Repository<UserInfomation>,
        @InjectRepository(VwUserInfomationList)
        private readonly vwUserInfomationRepository: Repository<VwUserInfomationList>,
        @InjectRepository(VwUserInfomationItem)
        private readonly itemRepository:Repository<VwUserInfomationItem>,
        @InjectRepository(VwUserDropdown)
        private readonly vwDropdownUserRepository:Repository<VwUserDropdown>,
        private readonly dropdownService: DropdownService
        ){
        super()
    }
    async userDropdown(dto: SearchUserDto):Promise<SelectItems[]> {
        return await this.dropdownService.userDropdown(dto,this.vwDropdownUserRepository);
      }
    async list(dto:SearchUserInfomationDto):Promise<SearchResult<VwUserInfomationList>>{
        const builder = this.createQueryBuider<VwUserInfomationList>(dto,this.vwUserInfomationRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwUserInfomationList>(dto.paginator,count,data);
    }
    async create(dto:CreateUserInfomationDto,req:CustomRequest):Promise<UserInfomation>{        
        const en = this.toCreateModel(dto,req) as UserInfomation  
        return await this.userinfomationRepository.save(
            this.userinfomationRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateUserInfomationDto,req:CustomRequest):Promise<UserInfomationDto>{
        const m = await this.userinfomationRepository.findOne({where:{id:id}})
        return await this.userinfomationRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<UserInfomationDto>{
        let m = await this.userinfomationRepository.findOne({where:{id:id}})
        return await this.userinfomationRepository.softRemove(
            await this.userinfomationRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        return await this.itemRepository.findOne({where:{id:id}})
    }
}
