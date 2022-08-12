import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwCountryDropdown } from 'src/api/country/country.entity';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { ShopController } from './shop.controller';
import { Shop, VwShopDropdown, VwShopItem, VwShopList } from './shop.entity';
import { ShopService } from './shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop,VwShopList,VwShopItem,VwShopDropdown,
    VwCountryDropdown,
    VwProvinceDropdown,
    VwDistrictDropdown,
    VwSubDistrictDropdown,
    ])
  ],
  controllers: [ShopController],
  providers: [ShopService,DropdownService],
  exports: [ShopService,DropdownService]
})
export class ShopModule {}
