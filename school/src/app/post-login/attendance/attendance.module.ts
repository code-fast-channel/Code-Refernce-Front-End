import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MarkStudentAttendanceComponent } from './student/manual/mark-student-attendance/mark-student-attendance.component';
import { AttendanceSearchComponent } from './attendance-search/attendance-search.component';
import { EmployeeAttendanceService } from './services/employee-attendance.service';
import { StudentAttendanceService } from './services/student-attendance.service';
import { ResetStudentAttendanceComponent } from './student/reset-student-attendance/reset-student-attendance.component';

@NgModule({
  declarations: [MarkStudentAttendanceComponent, AttendanceSearchComponent, ResetStudentAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ],
  providers:[
    EmployeeAttendanceService,
    StudentAttendanceService
  ]
})
export class AttendanceModule { }
