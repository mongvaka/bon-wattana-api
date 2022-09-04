import { Module } from '@nestjs/common';
import { ActivityStudentModule } from 'src/api/activity-student/activity-student.module';
import { AliveWithModule } from 'src/api/alive-with/alive-with.module';
import { ClassroomTypeModule } from 'src/api/classroom-type/classroom-type.module';
import { ClassroomModule } from 'src/api/classroom/classroom.module';
import { CountryModule } from 'src/api/country/country.module';
import { CurriculumModule } from 'src/api/curriculum/curriculum.module';
import { DistrictModule } from 'src/api/district/district.module';
import { EducationBackgroundModule } from 'src/api/education-background/education-background.module';
import { EthnicityModule } from 'src/api/ethnicity/ethnicity.module';
import { GendarModule } from 'src/api/gendar/gendar.module';
import { NationalityModule } from 'src/api/nationality/nationality.module';
import { ParentStatusModule } from 'src/api/parent-status/parent-status.module';
import { PracticleModule } from 'src/api/practicle/practicle.module';
import { PractitionerLevelModule } from 'src/api/practitioner-level/practitioner-level.module';
import { ProvinceModule } from 'src/api/province/province.module';
import { ReligionModule } from 'src/api/religion/religion.module';
import { StudentModule } from 'src/api/student/student.module';
import { SubDistrictModule } from 'src/api/sub-district/sub-district.module';
import { TeacherWorkModule } from 'src/api/teacher-work/teacher-work.module';
import { TeacherModule } from 'src/api/teacher/teacher.module';
import { TeachersDevelopModule } from 'src/api/teachers-develop/teachers-develop.module';
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
    SubDistrictModule,
    ActivityStudentModule,
    CurriculumModule,
    EducationBackgroundModule,
    PractitionerLevelModule,
    PracticleModule,
    TeacherModule,
    TeacherWorkModule,
   TeachersDevelopModule

  ],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class ExcelModule {}
