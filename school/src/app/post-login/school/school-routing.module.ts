import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { ClassManagementComponent } from './class/class-management/class-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { HolidayManagementComponent } from './holiday-management/holiday-management.component';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';

const routes: Routes = [
  {
    path: 'schoolmgmt',
    component: SchoolManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'classmgmt',
    component: ClassManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'eventmgmt',
    component: EventManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'holidaymgmt',
    component: HolidayManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'subjectmgmt',
    component: SubjectManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'rolemgmt',
    component: RoleManagementComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
