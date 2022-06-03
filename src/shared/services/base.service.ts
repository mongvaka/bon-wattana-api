import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { Operators } from "../constans/constanst";
import { CustomRequest } from "../models/request-model";
import { Paginator, SearchCondition, SearchParameter, SearchResult } from "../models/search-param-model";
@Injectable()
export class BaseService{
    constructor(
    ){
    }
    toSearchResult<T>(page:Paginator,count:number,data:any):SearchResult<T>{
        const result = new SearchResult<T>();
        const paginator:Paginator = page?page:new Paginator()
        paginator.rows = count;
        paginator.totalRecord = count;
        paginator.pageCount = Math.ceil(count / paginator?.rows);
        result.paginator = paginator
        result.results = data        
        return result;
    }
    createQueryBuider<T>(dto:SearchParameter,repository: Repository<T>):SelectQueryBuilder<T>{
        const buider = repository.createQueryBuilder(dto.tableKey);
        console.log('searchCondition',dto.searchCondition);
        const take = dto.paginator?.rows || 10
        const skip = (dto.paginator?.page || 0)*take
        dto.searchCondition.forEach(el => {
            if(el.value){
                let value = el.value
                let oporator = el.operator
                if(el.operator === Operators.LIKE){
                    value = `%${el.value}%`
                }
                buider.andWhere(`${dto.tableKey}.${el.feildName} ${oporator} :v`,{v:value})
            }
        });
        dto.sortColumns.forEach((el,index)=>{
            const sortString = `${dto.sortTable[index]}.${el}`
            let sortType:'DESC'|'ASC' = 'DESC'
            if(dto.isAscs[index]){
                sortType = 'ASC'
            }
            buider.addOrderBy(sortString,sortType)
        })
        buider.skip(skip).take(take)
        console.log(buider.getSql());
        
        return buider
    }
    toCreateModel(dto:any,req:CustomRequest):any{
        const model ={
            ...dto,
            createAt:new Date(),
            createBy:req?.users?.username
        }
        return model;
    }
    toUpdateModel(oldModel:any,newModel:any,req:CustomRequest):any{
        const updateModel ={
            ...oldModel,
            ...newModel,
            id:oldModel.id,
            updateAt:new Date(),
            updateBy:req?.users?.username
        }
        return updateModel;
    }
    toDeleteModel(model:any,req:CustomRequest):any{
        const deleteModel ={
            ...model,
            active:false,
            deleted:true,
            deleteAt: new Date(),
            deleteBy: req?.users?.username
        }
        return deleteModel;
    }
    // getSearchCondition(condition:SearchCondition[]){
    //     console.log('condition',condition);
        
    // }
}