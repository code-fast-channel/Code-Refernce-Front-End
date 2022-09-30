import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'empmgmt',
    component: EmployeeManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
