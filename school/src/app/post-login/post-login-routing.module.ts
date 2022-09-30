import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostLoginComponent } from './post-login/post-login.component';
import { PostLoginFooterComponent } from './post-login-footer/post-login-footer.component';
import { AuthorizationService } from '@app/shared/services/authorization.service';

const routes: Routes = [ 
  {
    path: 'secure',
    component: PostLoginComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), //'./dashboard/dashboard.module#DashboardModule',
        canActivate:[AuthorizationService]
      },
      {
        path: 'studentguardian',
        loadChildren: () => import('./student-guardian/student-guardian.module').then(m => m.StudentGuardianModule), //'./student-guardian/student-guardian.module#StudentGuardianModule',
        canActivate:[AuthorizationService]
      },
      {
        path: 'school',
        loadChildren: () => import('./school/school.module').then(m => m.SchoolModule), //'./school/school.module#SchoolModule',
        canActivate:[AuthorizationService]
      },
      {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule), //'./exam/exam.module#ExamModule',
        canActivate:[AuthorizationService]
      },
      {
        path: 'transport',
        loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule), // './transport/transport.module#TransportModule'
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), // './employee/employee.module#EmployeeModule'
      },
      {
        path: 'attendance',
        loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule), // './attendance/attendance.module#AttendanceModule'
      },
      {
        path: 'rating',
        loadChildren: () => import('./rating/rating.module').then(m => m.RatingModule), // './rating/rating.module#RatingModule'
      },
      {
        path: 'finance',
        loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule),
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }