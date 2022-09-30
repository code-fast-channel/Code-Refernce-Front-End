import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { GuardianListComponent } from './guardian-list/guardian-list.component';
import { GuardianService } from './services/guardian.service';
import { GuardianManagementComponent } from './guardian-management/guardian-management.component';
import { NewStudentguardianRegistrationComponent } from './new-student-guardian-registration/new-student-guardian-registration.component';
import { StudentGuardianRoutingModule } from './student-guardian-routing.module';
import { StudentGuardianService } from './services/student-guardian.service';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { StudentService } from './services/student.service';
import { StudentAcademicInfoComponent } from './student-academic-info/student-academic-info.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { StudentInfoComponent } from './new-student-guardian-registration/student-info/student-info.component';
import { GuardianInfoComponent } from './new-student-guardian-registration/guardian-info/guardian-info.component';

@NgModule({
  declarations: [ NewStudentguardianRegistrationComponent, GuardianListComponent, GuardianManagementComponent, StudentListComponent, StudentManagementComponent, StudentAcademicInfoComponent, MyProfileComponent, StudentInfoComponent, GuardianInfoComponent],
  imports: [
    CommonModule,
    StudentGuardianRoutingModule,
    SharedModule   
  ],
  providers:[
    StudentGuardianService,
    GuardianService,
    StudentService
  ]
})
export class StudentGuardianModule { }
