import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { VwStudentDropdown } from 'src/api/student/student.entity';
import { CongenitialDiseaseController } from './congenitial-disease.controller';
import { CongenitialDisease, VwCongenitialDiseaseDropdown, VwCongenitialDiseaseItem, VwCongenitialDiseaseList } from './congenitial-disease.entity';
import { CongenitialDiseaseService } from './congenitial-disease.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CongenitialDisease,VwCongenitialDiseaseList,VwCongenitialDiseaseItem,VwCongenitialDiseaseDropdown,
    VwStudentDropdown,
    ])
  ],
  controllers: [CongenitialDiseaseController],
  providers: [CongenitialDiseaseService,DropdownService],
  exports: [CongenitialDiseaseService,DropdownService]
})
export class CongenitialDiseaseModule {}
