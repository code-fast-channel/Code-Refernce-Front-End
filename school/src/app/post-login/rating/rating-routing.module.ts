import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkStudentRatingComponent } from './student/mark-student-rating/mark-student-rating.component';
import { SpecificRatingStudentComponent } from './student/specific-rating-student/specific-rating-student.component';
import { ResetStudentRatingComponent } from './student/reset-student-rating/reset-student-rating.component';

const routes: Routes = [
  {
    path: 'markStuRating',
    component: MarkStudentRatingComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'specificRatingStu',
    component: SpecificRatingStudentComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'resetStuRating',
    component: ResetStudentRatingComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule { }
