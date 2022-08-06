import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './core/users/users.module';
import { DemoModule } from './core/demo/demo.module';
import { AddressModule } from './api/address/address.module';
import { BmiHistoryModule } from './api/bmi-history/bmi-history.module';
import { CongenitialDisease } from './api/congenitial-disease/congenitial-disease.entity';
import { CountryModule } from './api/country/country.module';
import { DegreeModule } from './api/degree/degree.module';
import { DistrictModule } from './api/district/district.module';
import { EstimateDetailModule } from './api/estimate-detail/estimate-detail.module';
import { EstimateGroupModule } from './api/estimate-group/estimate-group.module';
import { EstimateTemp } from './api/estimate-temp/estimate-temp.entity';
import { HomeVisitModule } from './api/home-visit/home-visit.module';
import { HopitalModule } from './api/hopital/hopital.module';
import { OldSchoolModule } from './api/old-school/old-school.module';
import { ParentModule } from './api/parent/parent.module';
import { ProvinceModule } from './api/province/province.module';
import { RequestEditModule } from './api/request-edit/request-edit.module';
import { ScholarshipModule } from './api/scholarship/scholarship.module';
import { StudentSiblingModule } from './api/student-sibling/student-sibling.module';
import { StudentModule } from './api/student/student.module';
import { SubDistrictModule } from './api/sub-district/sub-district.module';
import { TeachScheduleModule } from './api/teach-schedule/teach-schedule.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { UniversityModule } from './api/university/university.module';
import { AuthenticationsModule } from './core/authentications/authentications.module';
import { ProductModule } from './api/product/product.module';
import { ProductCategoryModule } from './api/product-category/product-category.module';
import { ImagesModule } from './core/images/images.module';

@Module({
  imports: [
    // ConfigModule.forRoot(
    //   {isGlobal:true}
    // ),
    // TypeOrmModule.forRoot({
    //   type:'postgres',
    //   url:'http://43.228.85.126',
    //   port:5432,
    //   username:'postgres',
    //   password:"password",
    //   autoLoadEntities:true,
    //   schema:'postgres',
    //   synchronize:true,
    //   entities: ["dist/**/*.entity{.ts,.js}"]
    // }),
ConfigModule.forRoot({
    isGlobal: true,
  }),
  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",

          host: configService.get('DATABASE_HOST', 'localhost'),
          port: Number(configService.get<number>('DATABASE_PORT', 5432)),
          username: configService.get('DATABASE_USERNAME', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get<string>('DATABASE_SCHEMA', 'postgres'),
          useUTC:true,
          synchronize: true,
          entities: ["dist/**/**/*.entity{.ts,.js}"],
          
        };
      },
    }),
    ProductModule,
    ProductCategoryModule,
    UsersModule,
    DemoModule,
    AuthenticationsModule,
    AddressModule,
    BmiHistoryModule,
    CongenitialDisease,
    CountryModule,
    DegreeModule,
    DistrictModule,
    EstimateDetailModule,
    EstimateGroupModule,
    EstimateTemp,
    HomeVisitModule,
    HopitalModule,
    OldSchoolModule,
    ParentModule,
    ProvinceModule,
    RequestEditModule,
    ScholarshipModule,
    StudentModule,
    StudentSiblingModule,
    SubDistrictModule,
    TeachScheduleModule,
    TeacherModule,
    UniversityModule,
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
