import { Inject, Injectable } from "@nestjs/common";
import { VwDemoDropdown } from "src/demo/demo.entity";
import { VwProductCategoryDropdown } from "src/product-category/product-category.entity";
import { VwProductDropdown } from "src/product/product.entity";
import { Repository } from "typeorm";
import { SearchParameter, SelectItems } from "../models/search-param-model";
import { BaseService } from "./base.service";

@Injectable()
export class DropdownService extends BaseService{
    constructor(
    ){
        super()
    }
    async demoDropdown(dto:SearchParameter):Promise<SelectItems[]>{
        const repository = new Repository<VwDemoDropdown>()
        const buider = this.createQueryBuider(dto,repository)
        const [data,count] =await buider.getManyAndCount();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDemoDropdown = el as unknown as VwDemoDropdown
            const dropdownModel:SelectItems ={
                label:model.demoEnum,
                value:model.id,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });
        return dropdownList;
    }
    async productCategoryDropdown(dto:SearchParameter):Promise<SelectItems[]>{
        const repository = new Repository<VwProductCategoryDropdown>()
        const buider = this.createQueryBuider(dto,repository)
        const [data,count] =await buider.getManyAndCount();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductCategoryDropdown = el as unknown as VwProductCategoryDropdown
            const dropdownModel:SelectItems ={
                label:`${model.productCategoryCode} [${model.productCategoryName}]`,
                value:model.productCategoryId,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });
        return dropdownList;
    }
    async productDropdown(dto:SearchParameter):Promise<SelectItems[]>{
        const repository = new Repository<VwProductDropdown>()
        const buider = this.createQueryBuider(dto,repository)
        const [data,count] =await buider.getManyAndCount();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductDropdown = el as unknown as VwProductDropdown
            const dropdownModel:SelectItems ={
                label:`${model.productCode} [${model.productName}]`,
                value:model.productId,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });
        return dropdownList;
    }
}