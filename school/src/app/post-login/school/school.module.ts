import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { NewSchoolComponent } from './school-management/new-school/new-school.component';
import { SchoolListComponent } from './school-management/school-list/school-list.component';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { SharedModule } from '@app/shared/shared.module';
import { SchoolService } from './services/school.service';
import { SchoolBranchInfoComponent } from './school-management/new-school/school-branch-info/school-branch-info.component';
import { NewClassComponent } from './class/new-class/new-class.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassManagementComponent } from './class/class-management/class-management.component';
import { ClassSubjectInfoComponent } from './class/class-subject-info/class-subject-info.component';
import { ClassBasicInfoComponent } from './class/class-basic-info/class-basic-info.component';
import { ClassService } from './services/class.service';
import { SubjectTimingsComponent } from './class/subject-timings/subject-timings.component';
import { SectionFeeComponent } from './class/section-fee/section-fee.component';
import { CopySubjectComponent } from './class/copy-subject/copy-subject.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { EventListComponent } from './event-management/event-list/event-list.component';
import { NewEventComponent } from './event-management/new-event/new-event.component';
import { HolidayManagementComponent } from './holiday-management/holiday-management.component';
import { HolidayListComponent } from './holiday-management/holiday-list/holiday-list.component';
import { NewHolidayComponent } from './holiday-management/new-holiday/new-holiday.component';
import { EventService } from './services/event.service';
import { HolidayService } from './services/holiday.service';
import { EventBasicInfoComponent } from './event-management/new-event/event-basic-info/event-basic-info.component';
import { HolidayBasicInfoComponent } from './holiday-management/new-holiday/holiday-basic-info/holiday-basic-info.component';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { NewSubjectComponent } from './subject-management/new-subject/new-subject.component';
import { SubjectListComponent } from './subject-management/subject-list/subject-list.component';
import { SubjectBasicInfoComponent } from './subject-management/new-subject/subject-basic-info/subject-basic-info.component';
import { SubjectService } from './services/subject.service';
import { RoleManagementComponent } from './role-management/role-management.component';
import { NewRoleComponent } from './role-management/new-role/new-role.component';
import { RoleListComponent } from './role-management/role-list/role-list.component';
import { RoleBasicInfoComponent } from './role-management/new-role/role-basic-info/role-basic-info.component';
import { RoleService } from './services/role.service';
import { RoleEntitlementsComponent } from './role-management/new-role/role-entitlements/role-entitlements.component';
import { SubPageEntitlementComponent } from './role-management/new-role/role-entitlements/sub-page-entitlement/sub-page-entitlement.component';
import { PageInfoComponent } from './role-management/new-role/role-entitlements/page-info/page-info.component';


@NgModule({
  declarations: [NewSchoolComponent, SchoolListComponent, SchoolManagementComponent, 
    SchoolBranchInfoComponent, NewClassComponent, ClassSubjectInfoComponent,
    ClassListComponent, ClassManagementComponent, ClassBasicInfoComponent, SubjectTimingsComponent, SectionFeeComponent, 
    CopySubjectComponent, EventManagementComponent, EventListComponent, NewEventComponent, HolidayManagementComponent, 
    HolidayListComponent, NewHolidayComponent, EventBasicInfoComponent, HolidayBasicInfoComponent, SubjectManagementComponent, NewSubjectComponent, SubjectListComponent, SubjectBasicInfoComponent, RoleManagementComponent, NewRoleComponent, RoleListComponent, RoleBasicInfoComponent, RoleEntitlementsComponent, SubPageEntitlementComponent, PageInfoComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule
  ],
  providers:[
    SchoolService, ClassService, EventService, HolidayService, SubjectService, RoleService
  ]
})
export class SchoolModule { }
