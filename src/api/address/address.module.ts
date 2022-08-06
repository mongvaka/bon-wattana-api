import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwProvinceDropdown } from 'src/api/province/province.entity';
import { VwDistrictDropdown } from 'src/api/district/district.entity';
import { VwSubDistrictDropdown } from 'src/api/sub-district/sub-district.entity';
import { AddressController } from './address.controller';
import { Address, VwAddressDropdown, VwAddressItem, VwAddressList } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address,VwAddressList,VwAddressItem,VwAddressDropdown,
    VwProvinceDropdown,
    VwDistrictDropdown,
    VwSubDistrictDropdown,
    ])
  ],
  controllers: [AddressController],
  providers: [AddressService,DropdownService],
  exports: [AddressService,DropdownService]
})
export class AddressModule {}
