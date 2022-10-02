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
import { ActivityStudentModule } from './api/activity-student/activity-student.module';
import { CurriculumModule } from './api/curriculum/curriculum.module';
import { EducationBackgroundModule } from './api/education-background/education-background.module';
import { PractitionerLevelModule } from './api/practitioner-level/practitioner-level.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { TeacherWorkModule } from './api/teacher-work/teacher-work.module';
import { TeachersDevelopModule } from './api/teachers-develop/teachers-develop.module';
import { PracticleModule } from './api/practicle/practicle.module';
import { StudentHomeVisitModule } from './api/student-home-visit/student-home-visit.module';
import { SdqTableModule } from './api/sdq-table/sdq-table.module';
import { SdqTeacherModule } from './api/sdq-table/sdq-teacher.module';
import { SdqParentModule } from './api/sdq-table/sdq-parent.module';
import { YearTermModule } from './api/year-term/year-term.module';
import { CheckStudentModule } from './api/check-student/check-student.module';
import { DepressionModule } from './api/depression/depression.module';
import { EmotionalQuotientModule } from './api/emotional-quotient/emotional-quotient.module';
import { StressModule } from './api/stress/stress.module';
import { StudentConsultantModule } from './api/student-consultant/student-consultant.module';
import { StudentFilterModule } from './api/student-filter/student-filter.module';
import { StudentHelpModule } from './api/student-help/student-help.module';
import { StudentScolarModule } from './api/student-scolar/student-scolar.module';
import { StudentSupportModule } from './api/student-support/student-support.module';

import { TeachingScheduleModule } from './api/teaching-schedule/teaching-schedule.module';
import { ReportModule } from './api/report/report.module';
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
        //  host: configService.get('DATABASE_URL', 'localhost'),
         host: configService.get('DATABASE_URL', '203.159.93.121'),
          port: Number(configService.get<number>('DATABASE_PORT', 5432)),
          username: configService.get('DATABASE_USERNAME', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get<string>('DATABASE_SCHEMA', 'postgres'),
          useUTC:true,
          logging:false,
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
    EditRequestModule,
    ActivityStudentModule,
    CurriculumModule,
    EducationBackgroundModule,
    PractitionerLevelModule,
    TeacherModule,
    TeacherWorkModule,
    TeachersDevelopModule,
    PracticleModule,
    StudentHomeVisitModule,
    SdqTableModule,
    SdqTeacherModule,
    SdqParentModule,

    YearTermModule,
    CheckStudentModule,
    StressModule,
    DepressionModule,
    EmotionalQuotientModule,
    StudentConsultantModule,
    StudentFilterModule,
    StudentHelpModule,
    StudentScolarModule,
    StudentSupportModule,
    TeachingScheduleModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
