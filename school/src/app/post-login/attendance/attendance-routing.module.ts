import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkStudentAttendanceComponent } from './student/manual/mark-student-attendance/mark-student-attendance.component';
import { ResetStudentAttendanceComponent } from './student/reset-student-attendance/reset-student-attendance.component';

const routes: Routes = [
  {
    path: 'markStuAttendance',
    component: MarkStudentAttendanceComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'resetStuAttendance',
    component: ResetStudentAttendanceComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
