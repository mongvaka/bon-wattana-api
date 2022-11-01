import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from 'src/core/shared/models/request-model';
import { SearchResult, SelectItems } from 'src/core/shared/models/search-param-model';
import { BaseService } from 'src/core/shared/services/base.service';
import { DropdownService } from 'src/core/shared/services/dropdown.service';
import { Repository } from 'typeorm';
import { CreateSarDto, SarDto, SearchSarDto, UpdateSarDto } from './sar.dto';
import { Sar, VwSarDropdown, VwSarItem, VwSarList } from './sar.entity';
import { VwTeacherDropdown } from 'src/api/teacher/teacher.entity';
import { SearchTeacherDto } from 'src/api/teacher/teacher.dto';
import { TeacherService } from 'src/api/teacher/teacher.service';
import { EducationBackgroundService } from 'src/api/education-background/education-background.service';
import { SarPresonalDataService} from 'src/api/sar-presonal-data/sar-presonal-data.service';
import { SarPresonalLeaveDataService} from 'src/api/sar-presonal-leave-data/sar-presonal-leave-data.service';
import { SarCoursesYearTermService} from 'src/api/sar-courses-year-term/sar-courses-year-term.service'
import { VwTeachingScheduleItem} from 'src/api/teaching-schedule/teaching-schedule.entity'
import { SarAnotherSpeacialDutyService} from 'src/api/sar-another-speacial-duty/sar-another-speacial-duty.service'
import { SarLearningManagementPlanService} from 'src/api/sar-learning-management-plan/sar-learning-management-plan.service'
import {  SarMediaProductionService} from 'src/api/sar-media-production/sar-media-production.service'
import { SarIntegratedLearningService } from 'src/api/sar-integrated-learning/sar-integrated-learning.service'
import { SarResearchInClassService } from 'src/api/sar-research-in-class/sar-research-in-class.service'
import { SarStudentAssignService } from 'src/api/sar-student-assign/sar-student-assign.service'
import { SarLecturerInviteService } from 'src/api/sar-lecturer-invite/sar-lecturer-invite.service'
import { SarTeachingFormatService } from 'src/api/sar-teaching-format/sar-teaching-format.service'
import { SarTeachingConditionService } from 'src/api/sar-teaching-condition/sar-teaching-condition.service'
import { SarSelfDevelopmentService } from 'src/api/sar-self-development/sar-self-development.service'
import { SarAwardService } from 'src/api/sar-award/sar-award.service'
import { SarInvitedSpeakerService } from 'src/api/sar-invited-speaker/sar-invited-speaker.service'
import { VwSarTeachingResultItem,VwSarTeachingResultList} from 'src/api/sar-teaching-result/sar-teaching-result.entity'
import { SarPerformingSpecialDutiesService} from 'src/api/sar-performing-special-duties/sar-performing-special-duties.service'
import { SarStudentEstimateTeachingService} from 'src/api/sar-student-estimate-teaching/sar-student-estimate-teaching.service'
import { SarSelfAssessmentService} from 'src/api/sar-self-assessment/sar-self-assessment.service'
import { SarQualityOfLearnersService} from 'src/api/sar-quality-of-learners/sar-quality-of-learners.service'
import { SarQualityEvidenceService} from 'src/api/sar-quality-evidence/sar-quality-evidence.service'
import { SarStandard2Service} from 'src/api/sar-standard2/sar-standard2.service'
import { SarStandard3Service} from 'src/api/sar-standard3/sar-standard3.service'
import { SarStandard4Service} from 'src/api/sar-standard4/sar-standard4.service'
import { SarCompetencyAssessmentService} from 'src/api/sar-competency-assessment/sar-competency-assessment.service'
import { SarCrudAssessmentService} from 'src/api/sar-crud-assessment/sar-crud-assessment.service'
import { SarActivitiesService} from 'src/api/sar-activities/sar-activities.service'
import { SarAdviseClassService} from 'src/api/sar-advise-class/sar-advise-class.service'
import { VwSarCrudAssessmentList} from 'src/api/sar-crud-assessment/sar-crud-assessment.entity'
import { VwSarCompetencyAssessmentList} from 'src/api/sar-competency-assessment/sar-competency-assessment.entity'
import { SarUploadImgService} from 'src/api/sar-upload-img/sar-upload-img.service'
import { SarOrderedPositionService} from 'src/api/sar-ordered-position/sar-ordered-position.service'
export class SarService extends BaseService {

    constructor(
        @InjectRepository(Sar)
        private readonly sarRepository: Repository<Sar>,
        @InjectRepository(VwSarList)
        private readonly vwSarRepository: Repository<VwSarList>,
        @InjectRepository(VwSarItem)
        private readonly itemRepository:Repository<VwSarItem>,
        @InjectRepository(VwTeachingScheduleItem)
        private readonly teachingscheduleRepository:Repository<VwTeachingScheduleItem>,
        @InjectRepository(VwSarTeachingResultItem)
        private readonly teachingresultRepository:Repository<VwSarTeachingResultItem>,
        @InjectRepository(VwSarTeachingResultList)
        private readonly teachingresultlistRepository:Repository<VwSarTeachingResultList>, 
         @InjectRepository(VwSarCrudAssessmentList)
        private readonly sarcrudassessmentlistRepository:Repository<VwSarCrudAssessmentList>,
        @InjectRepository(VwSarCompetencyAssessmentList)
        private readonly sacompetencyassessmentlistRepository:Repository<VwSarCompetencyAssessmentList>,
        @InjectRepository(VwTeacherDropdown)
        private readonly vwDropdownTeacherRepository:Repository<VwTeacherDropdown>,
        private readonly dropdownService: DropdownService,
        private readonly teacherService: TeacherService,
        private readonly educationbackground: EducationBackgroundService,
        private readonly sarpresonaldata: SarPresonalDataService,
        private readonly sarpresonalleavedata: SarPresonalLeaveDataService,
        private readonly sarcourseyearterm: SarCoursesYearTermService, 
        private readonly saranotherspeacialduty: SarAnotherSpeacialDutyService , 
        private readonly sarlearningmanagementplan: SarLearningManagementPlanService, 
        private readonly sarmediaproduction: SarMediaProductionService, 
        private readonly sarlecturerinvite: SarLecturerInviteService, 
        private readonly sarstudentassign: SarStudentAssignService, 
        private readonly sarresearchInclass: SarResearchInClassService, 
        private readonly sarintegratedlearning: SarIntegratedLearningService, 
        private readonly sarteachingformat: SarTeachingFormatService, 
        private readonly sarteachingcondition: SarTeachingConditionService, 
        private readonly sarselfdevelopment: SarSelfDevelopmentService, 
        private readonly saraward: SarAwardService, 
        private readonly sarinvitedspeaker: SarInvitedSpeakerService, 
        private readonly sarperformingspecialduties: SarPerformingSpecialDutiesService, 
        private readonly sarstudentestimateteaching: SarStudentEstimateTeachingService, 
        private readonly sarselfassessment: SarSelfAssessmentService, 
        private readonly sarqualityoflearners: SarQualityOfLearnersService, 
        private readonly sarqualityevidence: SarQualityEvidenceService, 
        private readonly sarstandard2 : SarStandard2Service, 
        private readonly sarstandard3 : SarStandard3Service, 
        private readonly sarstandard4 : SarStandard4Service,
        private readonly sacompetencyassessment : SarCompetencyAssessmentService,
        private readonly sarcrudassessment : SarCrudAssessmentService,
        private readonly saractivities : SarActivitiesService,
        private readonly saradviseclass : SarAdviseClassService,
        private readonly saruploadimg :SarUploadImgService,
        private readonly sarorderedposition :SarOrderedPositionService
        ){
        super()
    }
    async teacherDropdown(dto: SearchTeacherDto):Promise<SelectItems[]> {
        return await this.dropdownService.teacherDropdown(dto,this.vwDropdownTeacherRepository);
      }
    async list(dto:SearchSarDto):Promise<SearchResult<VwSarList>>{
        const builder = this.createQueryBuider<VwSarList>(dto,this.vwSarRepository)
        const [data, count] = await builder
        .getManyAndCount();
        return this.toSearchResult<VwSarList>(dto.paginator,count,data);
    }
    async create(dto:CreateSarDto,req:CustomRequest):Promise<Sar>{        
        const en = this.toCreateModel(dto,req) as Sar  
        return await this.sarRepository.save(
            this.sarRepository.create(en)
        );
    }
    async update(id:number,dto:UpdateSarDto,req:CustomRequest):Promise<SarDto>{
        const m = await this.sarRepository.findOne({where:{id:id}})
        return await this.sarRepository.save(
            this.toUpdateModel(m,dto,req)
        );
    }
    async delete(id:number,req:CustomRequest):Promise<SarDto>{
        let m = await this.sarRepository.findOne({where:{id:id}})
        return await this.sarRepository.softRemove(
            await this.sarRepository.save(
                this.toDeleteModel(m,req)
            )
        )
    }
    async item(id:number):Promise<any>{
        var item = await this.itemRepository.findOne({where:{id:id}})
           var refIdValue=item.refId
           var schoolYear = refIdValue.split('-')[0];
           var teacherId =refIdValue.split('-')[1];
        
   
           const teacher = await this.teacherService.item(parseInt(teacherId));
              teacher.teacherId=teacher.id;
             teacher.schoolyear = schoolYear;
             teacher.teacherValue=teacher.firstname+" "+teacher.lastname
             var age = null;
             teacher.birthDateValue = null;
             if(teacher.birthDate !=null){
         //cal age
             var dob = new Date(teacher.birthDate.toLocaleDateString("en-US"));
             //calculate month difference from current date in time
             var month_diff = Date.now() - dob.getTime();
             //convert the calculated difference in date format
             var age_dt = new Date(month_diff); 
             //extract year from date    
             var year = age_dt.getUTCFullYear();
             //now calculate the age of the user
              age = Math.abs(year - 1970);
              teacher.birthDateValue = teacher.birthDate.toLocaleDateString("th-TH", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
             }
             teacher.age= age;
   
   
             var setInTotalYear=null;
             teacher.setInDateValue =null;
             if( teacher.setInDate!==null){
                //cal  setInTotalYear
             var dob2 = new Date(teacher.setInDate.toLocaleDateString("en-US"));
             var month_diff2 = Date.now() - dob2.getTime();
             var month_diff2_dt = new Date(month_diff2); 
             var year2 = month_diff2_dt.getUTCFullYear();
              setInTotalYear = Math.abs(year2 - 1970);
             teacher.setInDateValue = teacher.setInDate.toLocaleDateString("th-TH", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
           
             }
             teacher.setInTotalYear=setInTotalYear;
    
   
           const education = await this.educationbackground.getListByTeacherId(parseInt(teacherId))
           const sarPersonalData = await this.sarpresonaldata.getItemByRefId(refIdValue)
   
   
   
           const sarPersonalLeaveData = await this.sarpresonalleavedata.getListByRefId(refIdValue)
        const sarCoursesYearTerm = await this.sarcourseyearterm.getListByRefIdAndTerm(refIdValue,'1')//เทอม1
           const sarCoursesYearTerm2 = await this.sarcourseyearterm.getListByRefIdAndTerm(refIdValue,'2')//เทอม2
          const teachingscheduleTerm1 = await this.teachingscheduleRepository.findOne({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
           const teachingscheduleTerm2 = await this.teachingscheduleRepository.findOne({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
             const sarAnotherSpeacialDuty = await this.saranotherspeacialduty.getListByRefId(refIdValue)
           const sarLearningManagementPlan = await this.sarlearningmanagementplan.getListByRefId(refIdValue)
           const sarMediaProduction = await this.sarmediaproduction.getListByRefId(refIdValue)
           const sarIntegratedLearning = await this.sarintegratedlearning.getListByRefId(refIdValue)
           const sarResearchInClass = await this.sarresearchInclass.getListByRefId(refIdValue)
           const sarStudentAssign = await this.sarstudentassign.getListByRefId(refIdValue)
           const sarLecturerInvite = await this.sarlecturerinvite.getListByRefId(refIdValue)
           const sarTeachingFormat = await this.sarteachingformat.getItemByRefId(refIdValue)
           const sarTeachingCondition = await this.sarteachingcondition.getItemByRefId(refIdValue)
           const sarselfdevelopment = await this.sarselfdevelopment.getListByRefId(refIdValue)
           const saraward = await this.saraward.getListByRefId(refIdValue)
           const sarinvitedspeaker = await this.sarinvitedspeaker.getListByRefId(refIdValue)
           const teachingresultTerm1 = await this.teachingresultlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
           const teachingresultTerm2 = await this.teachingresultlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
           const sarperformingspecialduties = await this.sarperformingspecialduties.getItemByRefId(refIdValue)
           const sarstudentestimateteaching = await this.sarstudentestimateteaching.getItemByRefId(refIdValue)
           const sarselfassessment = await this.sarselfassessment.getItemByRefId(refIdValue)
           const sarqualityoflearners = await this.sarqualityoflearners.getItemByRefId(refIdValue)
           const sarqualityevidenceStandard1Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,1,1)
           const sarqualityevidenceStandard1Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,1,2)
           const sarqualityevidenceStandard2Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,2,1)
           const sarqualityevidenceStandard2Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,2,2)
           const sarqualityevidenceStandard3Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,3,1)
           const sarqualityevidenceStandard3Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,3,2)
           const sarqualityevidenceStandard4Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,4,1)
           const sarqualityevidenceStandard4Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,4,2)
           const sarstandard2 = await this.sarstandard2.getItemByRefId(refIdValue)
           const sarstandard3 = await this.sarstandard3.getItemByRefId(refIdValue)
           const sarstandard4 = await this.sarstandard4.getItemByRefId(refIdValue)
           const sacompetencyassessment = await this.sacompetencyassessment.getListByRefId(refIdValue)
           const sarcrudassessment = await this.sarcrudassessment.getListByRefId(refIdValue)
           const sarcrudassessmentTerm1 = await this.sarcrudassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
           const sarcrudassessmentTerm2 = await this.sarcrudassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
       
           const saractivities = await this.saractivities.getListByRefId(refIdValue)
           const saradviseclass = await this.saradviseclass.getListByRefId(refIdValue)

           const sacompetencyassessmentTerm1 = await this.sacompetencyassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
           const sacompetencyassessmentTerm2 = await this.sacompetencyassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
           const saruploadimg= await this.saruploadimg.getListByRefId(refIdValue)
           const sarorderedposition= await this.sarorderedposition.getListByRefId(refIdValue)
       // console.log("sarqualityevidenceStandard1Good",sarqualityevidenceStandard1Good)
       
           return {
            item:item,
               teacherObj:teacher,
              educationObj: education,
                sarPersonalData:sarPersonalData,
               sarPersonalLeaveData:sarPersonalLeaveData,
             sarCoursesYearTerm:sarCoursesYearTerm,
               sarCoursesYearTerm2:sarCoursesYearTerm2,
              teachingscheduleTerm1:teachingscheduleTerm1,
               teachingscheduleTerm2:teachingscheduleTerm2,
               sarAnotherSpeacialDuty:sarAnotherSpeacialDuty,
               sarLearningManagementPlan:sarLearningManagementPlan,
               sarMediaProduction:sarMediaProduction,
               sarLecturerInvite:sarLecturerInvite,
               sarStudentAssign:sarStudentAssign,
               sarResearchInClass:sarResearchInClass,
               sarIntegratedLearning:sarIntegratedLearning,
               sarTeachingFormat:sarTeachingFormat,
               sarTeachingCondition:sarTeachingCondition,
               sarselfdevelopment:sarselfdevelopment,
               saraward:saraward,
               sarinvitedspeaker:sarinvitedspeaker,
               teachingresultTerm1:teachingresultTerm1,
               teachingresultTerm2:teachingresultTerm2,
               sarperformingspecialduties:sarperformingspecialduties,
               sarstudentestimateteaching:sarstudentestimateteaching,
               sarselfassessment:sarselfassessment,
               sarqualityoflearners:sarqualityoflearners,
               sarqualityevidenceStandard1Good:sarqualityevidenceStandard1Good,
               sarqualityevidenceStandard1Bad:sarqualityevidenceStandard1Bad,
               sarqualityevidenceStandard2Good:sarqualityevidenceStandard2Good,
               sarqualityevidenceStandard2Bad:sarqualityevidenceStandard2Bad,
               sarqualityevidenceStandard3Good:sarqualityevidenceStandard3Good,
               sarqualityevidenceStandard3Bad:sarqualityevidenceStandard3Bad,
               sarqualityevidenceStandard4Good:sarqualityevidenceStandard4Good,
               sarqualityevidenceStandard4Bad:sarqualityevidenceStandard4Bad,
               sarstandard2:sarstandard2,
               sarstandard3:sarstandard3,
               sarstandard4:sarstandard4,
               sacompetencyassessment:sacompetencyassessment,
               sarcrudassessment:sarcrudassessment,
               saractivities:saractivities,
               saradviseclass:saradviseclass,
               sarcrudassessmentTerm1 : sarcrudassessmentTerm1 ,
               sarcrudassessmentTerm2 :  sarcrudassessmentTerm2,
               sacompetencyassessmentTerm1:sacompetencyassessmentTerm1,
               sacompetencyassessmentTerm2:sacompetencyassessmentTerm2,
               saruploadimg:saruploadimg,
               sarorderedposition:sarorderedposition
           }
    }

    async initialSarDetail(refIdValueInput:string):Promise<any>{
     //  console.log("refIdValue",refIdValueInput.split('-'))
        var schoolYear = refIdValueInput.split('-')[0];
        var teacherId =refIdValueInput.split('-')[1];
        var refIdValue=schoolYear+'-'+teacherId

        const teacher = await this.teacherService.item(parseInt(teacherId));
           teacher.teacherId=teacher.id;
          teacher.schoolyear = schoolYear;
        
          var age = null;
          teacher.birthDateValue = null;
          if(teacher.birthDate !=null){
      //cal age
          var dob = new Date(teacher.birthDate.toLocaleDateString("en-US"));
          //calculate month difference from current date in time
          var month_diff = Date.now() - dob.getTime();
          //convert the calculated difference in date format
          var age_dt = new Date(month_diff); 
          //extract year from date    
          var year = age_dt.getUTCFullYear();
          //now calculate the age of the user
           age = Math.abs(year - 1970);
           teacher.birthDateValue = teacher.birthDate.toLocaleDateString("th-TH", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          }
          teacher.age= age;


          var setInTotalYear=null;
          teacher.setInDateValue =null;
          if( teacher.setInDate!==null){
             //cal  setInTotalYear
          var dob2 = new Date(teacher.setInDate.toLocaleDateString("en-US"));
          var month_diff2 = Date.now() - dob2.getTime();
          var month_diff2_dt = new Date(month_diff2); 
          var year2 = month_diff2_dt.getUTCFullYear();
           setInTotalYear = Math.abs(year2 - 1970);
          teacher.setInDateValue = teacher.setInDate.toLocaleDateString("th-TH", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        
          }
          teacher.setInTotalYear=setInTotalYear;
 

        const education = await this.educationbackground.getListByTeacherId(parseInt(teacherId))
        const sarPersonalData = await this.sarpresonaldata.getItemByRefId(refIdValue)

      //console.log(" teacher.setInDateValue", teacher.setInDateValue)


        const sarPersonalLeaveData = await this.sarpresonalleavedata.getListByRefId(refIdValue)
     const sarCoursesYearTerm = await this.sarcourseyearterm.getListByRefIdAndTerm(refIdValue,'1')//เทอม1
        const sarCoursesYearTerm2 = await this.sarcourseyearterm.getListByRefIdAndTerm(refIdValue,'2')//เทอม2
       const teachingscheduleTerm1 = await this.teachingscheduleRepository.findOne({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
        const teachingscheduleTerm2 = await this.teachingscheduleRepository.findOne({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
          const sarAnotherSpeacialDuty = await this.saranotherspeacialduty.getListByRefId(refIdValue)
        const sarLearningManagementPlan = await this.sarlearningmanagementplan.getListByRefId(refIdValue)
        const sarMediaProduction = await this.sarmediaproduction.getListByRefId(refIdValue)
        const sarIntegratedLearning = await this.sarintegratedlearning.getListByRefId(refIdValue)
        const sarResearchInClass = await this.sarresearchInclass.getListByRefId(refIdValue)
        const sarStudentAssign = await this.sarstudentassign.getListByRefId(refIdValue)
        const sarLecturerInvite = await this.sarlecturerinvite.getListByRefId(refIdValue)
        const sarTeachingFormat = await this.sarteachingformat.getItemByRefId(refIdValue)
        const sarTeachingCondition = await this.sarteachingcondition.getItemByRefId(refIdValue)
        const sarselfdevelopment = await this.sarselfdevelopment.getListByRefId(refIdValue)
        const saraward = await this.saraward.getListByRefId(refIdValue)
        const sarinvitedspeaker = await this.sarinvitedspeaker.getListByRefId(refIdValue)
        const teachingresultTerm1 = await this.teachingresultlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
        const teachingresultTerm2 = await this.teachingresultlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
        const sarperformingspecialduties = await this.sarperformingspecialduties.getItemByRefId(refIdValue)
        const sarstudentestimateteaching = await this.sarstudentestimateteaching.getItemByRefId(refIdValue)
        const sarselfassessment = await this.sarselfassessment.getItemByRefId(refIdValue)
        const sarqualityoflearners = await this.sarqualityoflearners.getItemByRefId(refIdValue)
        const sarqualityevidenceStandard1Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,1,1)
        const sarqualityevidenceStandard1Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,1,2)
        const sarqualityevidenceStandard2Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,2,1)
        const sarqualityevidenceStandard2Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,2,2)
        const sarqualityevidenceStandard3Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,3,1)
        const sarqualityevidenceStandard3Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,3,2)
        const sarqualityevidenceStandard4Good = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,4,1)
        const sarqualityevidenceStandard4Bad = await this.sarqualityevidence.getListByRefIdAndFilter(refIdValue,4,2)
        const sarstandard2 = await this.sarstandard2.getItemByRefId(refIdValue)
        const sarstandard3 = await this.sarstandard3.getItemByRefId(refIdValue)
        const sarstandard4 = await this.sarstandard4.getItemByRefId(refIdValue)
        const sacompetencyassessment = await this.sacompetencyassessment.getListByRefId(refIdValue)

        const sarcrudassessmentTerm1 = await this.sarcrudassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
        const sarcrudassessmentTerm2 = await this.sarcrudassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
        const sarcrudassessment = await this.sarcrudassessment.getListByRefId(refIdValue)
    
        const saractivities = await this.saractivities.getListByRefId(refIdValue)
        const saradviseclass = await this.saradviseclass.getListByRefId(refIdValue)

        const sacompetencyassessmentTerm1 = await this.sacompetencyassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'1'}})
        const sacompetencyassessmentTerm2 = await this.sacompetencyassessmentlistRepository.find({where:{teacherId:parseInt(teacherId),year:schoolYear,term:'2'}})
        const saruploadimg= await this.saruploadimg.getListByRefId(refIdValue)
        const sarorderedposition= await this.sarorderedposition.getListByRefId(refIdValue)
    // console.log("sarqualityevidenceStandard1Good",sarqualityevidenceStandard1Good)
    // console.log("sarTeachingFormat",sarTeachingFormat)

        return {
            teacherObj:teacher,
           educationObj: education,
             sarPersonalData:sarPersonalData,
            sarPersonalLeaveData:sarPersonalLeaveData,
          sarCoursesYearTerm:sarCoursesYearTerm,
            sarCoursesYearTerm2:sarCoursesYearTerm2,
           teachingscheduleTerm1:teachingscheduleTerm1,
            teachingscheduleTerm2:teachingscheduleTerm2,
            sarAnotherSpeacialDuty:sarAnotherSpeacialDuty,
            sarLearningManagementPlan:sarLearningManagementPlan,
            sarMediaProduction:sarMediaProduction,
            sarLecturerInvite:sarLecturerInvite,
            sarStudentAssign:sarStudentAssign,
            sarResearchInClass:sarResearchInClass,
            sarIntegratedLearning:sarIntegratedLearning,
            sarTeachingFormat:sarTeachingFormat,
            sarTeachingCondition:sarTeachingCondition,
            sarselfdevelopment:sarselfdevelopment,
            saraward:saraward,
            sarinvitedspeaker:sarinvitedspeaker,
            teachingresultTerm1:teachingresultTerm1,
            teachingresultTerm2:teachingresultTerm2,
            sarperformingspecialduties:sarperformingspecialduties,
            sarstudentestimateteaching:sarstudentestimateteaching,
            sarselfassessment:sarselfassessment,
            sarqualityoflearners:sarqualityoflearners,
            sarqualityevidenceStandard1Good:sarqualityevidenceStandard1Good,
            sarqualityevidenceStandard1Bad:sarqualityevidenceStandard1Bad,
            sarqualityevidenceStandard2Good:sarqualityevidenceStandard2Good,
            sarqualityevidenceStandard2Bad:sarqualityevidenceStandard2Bad,
            sarqualityevidenceStandard3Good:sarqualityevidenceStandard3Good,
            sarqualityevidenceStandard3Bad:sarqualityevidenceStandard3Bad,
            sarqualityevidenceStandard4Good:sarqualityevidenceStandard4Good,
            sarqualityevidenceStandard4Bad:sarqualityevidenceStandard4Bad,
            sarstandard2:sarstandard2,
            sarstandard3:sarstandard3,
            sarstandard4:sarstandard4,
            sacompetencyassessment:sacompetencyassessment,
            sarcrudassessment:sarcrudassessment,
            sarcrudassessmentTerm1 : sarcrudassessmentTerm1 ,
             sarcrudassessmentTerm2 :  sarcrudassessmentTerm2,
            saractivities:saractivities,
            saradviseclass:saradviseclass,
            sacompetencyassessmentTerm1:sacompetencyassessmentTerm1,
            sacompetencyassessmentTerm2:sacompetencyassessmentTerm2,
            saruploadimg:saruploadimg,
            sarorderedposition:sarorderedposition
        }
    }
}
