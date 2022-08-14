import { Module } from '@nestjs/common';
import { AliveWithModule } from 'src/api/alive-with/alive-with.module';
import { ClassroomTypeModule } from 'src/api/classroom-type/classroom-type.module';
import { ClassroomModule } from 'src/api/classroom/classroom.module';
import { CountryModule } from 'src/api/country/country.module';
import { DistrictModule } from 'src/api/district/district.module';
import { EthnicityModule } from 'src/api/ethnicity/ethnicity.module';
import { GendarModule } from 'src/api/gendar/gendar.module';
import { NationalityModule } from 'src/api/nationality/nationality.module';
import { ParentStatusModule } from 'src/api/parent-status/parent-status.module';
import { ProvinceModule } from 'src/api/province/province.module';
import { ReligionModule } from 'src/api/religion/religion.module';
import { StudentModule } from 'src/api/student/student.module';
import { SubDistrictModule } from 'src/api/sub-district/sub-district.module';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [
    StudentModule,
    AliveWithModule,
    ClassroomModule,
    ClassroomTypeModule,
    CountryModule,
    DistrictModule,
    EthnicityModule,
    GendarModule,
    NationalityModule,
    ParentStatusModule,
    ProvinceModule,
    ReligionModule,
    SubDistrictModule

  ],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class ExcelModule {}
