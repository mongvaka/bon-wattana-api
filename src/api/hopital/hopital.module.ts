import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwAddressDropdown } from 'src/api/address/address.entity';
import { HopitalController } from './hopital.controller';
import { Hopital, VwHopitalDropdown, VwHopitalItem, VwHopitalList } from './hopital.entity';
import { HopitalService } from './hopital.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hopital,VwHopitalList,VwHopitalItem,VwHopitalDropdown,
    VwAddressDropdown,
    ])
  ],
  controllers: [HopitalController],
  providers: [HopitalService,DropdownService],
  exports: [HopitalService,DropdownService]
})
export class HopitalModule {}
