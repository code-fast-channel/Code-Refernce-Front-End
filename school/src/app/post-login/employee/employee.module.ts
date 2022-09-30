import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeService } from './services/employee.service';
import { SharedModule } from '@app/shared/shared.module';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [NewEmployeeComponent, EmployeeListComponent, EmployeeManagementComponent, MyProfileComponent],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  providers:[
    EmployeeService
  ]
})
export class EmployeeModule { }
