import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardianManagementComponent } from './guardian-management/guardian-management.component';
import { NewStudentguardianRegistrationComponent } from './new-student-guardian-registration/new-student-guardian-registration.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [  
  {
    path: 'newStuGuardianReg',
    component: NewStudentguardianRegistrationComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'guardianMgmt',
    component: GuardianManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'studentMgmt',
    component: StudentManagementComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGuardianRoutingModule { }
