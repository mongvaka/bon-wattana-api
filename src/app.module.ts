import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './core/users/users.module';
import { DemoModule } from './core/demo/demo.module';
import { CountryModule } from './api/country/country.module';
import { DistrictModule } from './api/district/district.module';
import { ProvinceModule } from './api/province/province.module';
import { SubDistrictModule } from './api/sub-district/sub-district.module';
import { AuthenticationsModule } from './core/authentications/authentications.module';
import { ImagesModule } from './core/images/images.module';
import { AliveWithModule } from './api/alive-with/alive-with.module';
import { ClassroomModule } from './api/classroom/classroom.module';
import { ClassroomTypeModule } from './api/classroom-type/classroom-type.module';
import { EthnicityModule } from './api/ethnicity/ethnicity.module';
import { GendarModule } from './api/gendar/gendar.module';
import { NationalityModule } from './api/nationality/nationality.module';
import { ParentStatusModule } from './api/parent-status/parent-status.module';
import { ReligionModule } from './api/religion/religion.module';
import { StudentModule } from './api/student/student.module';
import { ExcelModule } from './core/excel/excel.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActiveTimeModule } from './api/active-time/active-time.module';
import { EditField } from './api/edit-field/edit-field.entity';
import { EditFieldModule } from './api/edit-field/edit-field.module';
import { EditRequest } from './api/edit-request/edit-request.entity';
import { EditRequestModule } from './api/edit-request/edit-request.module';

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
          host: configService.get('DATABASE_URL', '203.159.93.121'),
          port: Number(configService.get<number>('DATABASE_PORT', 5432)),
          username: configService.get('DATABASE_USERNAME', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get<string>('DATABASE_SCHEMA', 'postgres'),
          useUTC:true,
        
          synchronize: configService.get<string>('SYNC_DATABASE', 'true')!='false',
          entities: ["dist/**/**/*.entity{.ts,.js}"],
          
        };
      },
    }),
    UsersModule,
    DemoModule,
    AuthenticationsModule,
    CountryModule,
    DistrictModule,
    ProvinceModule,
    SubDistrictModule,
    ImagesModule,
    AliveWithModule,
    ClassroomModule,
    ClassroomTypeModule,
    EthnicityModule,
    GendarModule,
    NationalityModule,
    ParentStatusModule,
    ReligionModule,
    StudentModule,
    ExcelModule,
    ActiveTimeModule,
    EditFieldModule,
    EditRequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
