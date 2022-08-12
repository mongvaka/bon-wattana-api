import { Inject, Injectable, MethodNotAllowedException } from "@nestjs/common";
import { VwCategoryDropdown } from "src/api/category/category.entity";
import { VwCountryDropdown } from "src/api/country/country.entity";
import { VwDeliveryTrackingDropdown } from "src/api/delivery-tracking/delivery-tracking.entity";
import { VwDeliveryDropdown } from "src/api/delivery/delivery.entity";
import { VwDistrictDropdown } from "src/api/district/district.entity";
import { VwOrderDetailDropdown } from "src/api/order-detail/order-detail.entity";
import { VwOrderHeaderDropdown } from "src/api/order-header/order-header.entity";
import { VwProductDetailDropdown } from "src/api/product-detail/product-detail.entity";
import { VwProductImageDropdown } from "src/api/product-image/product-image.entity";
import { VwProductOptionDropdown } from "src/api/product-option/product-option.entity";
import { VwProductPromotionDropdown } from "src/api/product-promotion/product-promotion.entity";
import { VwProductDropdown } from "src/api/product/product.entity";
import { VwProvinceDropdown } from "src/api/province/province.entity";
import { VwShopDropdown } from "src/api/shop/shop.entity";
import { VwSubDistrictDropdown } from "src/api/sub-district/sub-district.entity";
import { VwUserInfomationDropdown } from "src/api/user-infomation/user-infomation.entity";

import { VwDemoDropdown } from "src/core/demo/demo.entity";
import { VwUserDropdown } from "src/core/users/users.entity";
import { Repository } from "typeorm";
import { SearchParameter, SelectItems } from "../models/search-param-model";
import { BaseService } from "./base.service";

@Injectable()
export class DropdownService extends BaseService{
    constructor(
    ){
        super()
    }
    async demoDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDemoDropdown = el as unknown as VwDemoDropdown
            const dropdownModel:SelectItems ={
                label:model.demoEmail,
                value:model.id,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async categoryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCategoryDropdown = el as unknown as VwCategoryDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async deliveryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDeliveryDropdown = el as unknown as VwDeliveryDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async deliveryTrackingDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDeliveryTrackingDropdown = el as unknown as VwDeliveryTrackingDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async orderDetailDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwOrderDetailDropdown = el as unknown as VwOrderDetailDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async orderHeaderDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwOrderHeaderDropdown = el as unknown as VwOrderHeaderDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async productDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductDropdown = el as unknown as VwProductDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async productDetailDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductDetailDropdown = el as unknown as VwProductDetailDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async productImageDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductImageDropdown = el as unknown as VwProductImageDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async productOptionDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductOptionDropdown = el as unknown as VwProductOptionDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async productPromotionDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProductPromotionDropdown = el as unknown as VwProductPromotionDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async shopDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwShopDropdown = el as unknown as VwShopDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }

    async userInfomationDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwUserInfomationDropdown = el as unknown as VwUserInfomationDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async countryDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwCountryDropdown = el as unknown as VwCountryDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async districtDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwDistrictDropdown = el as unknown as VwDistrictDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async subDistrictDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwSubDistrictDropdown = el as unknown as VwSubDistrictDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async provinceDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwProvinceDropdown = el as unknown as VwProvinceDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    async userDropdown(dto:SearchParameter,repository: Repository<any>):Promise<SelectItems[]>{        
        const buider = this.createQueryBuider(dto,repository)
        const data =await buider.getMany();
        const dropdownList:SelectItems[]=[]
        data.forEach(el => {
            const model:VwUserDropdown = el as unknown as VwUserDropdown
            const dropdownModel:SelectItems ={
                label:model.label,
                value:model.value,
                rowData:model
            }
            dropdownList.push(dropdownModel)
        });        
        return dropdownList;
    }
    
}