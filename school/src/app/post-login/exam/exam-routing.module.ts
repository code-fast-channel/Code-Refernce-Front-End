import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamManagementComponent } from './exam-management/exam-management.component';
import { ExamTypeManagementComponent } from './exam-type-management/exam-type-management.component';


const routes: Routes = [  
  {
    path: 'exammgmt',
    component: ExamManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'examtypemgmt',
    component: ExamTypeManagementComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
