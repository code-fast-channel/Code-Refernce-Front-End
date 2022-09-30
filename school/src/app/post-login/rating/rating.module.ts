import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { MarkStudentRatingComponent } from './student/mark-student-rating/mark-student-rating.component';
import { RatingSearchComponent } from './rating-search/rating-search.component';
import { StudentRatingService } from './services/student-rating.service';
import { SharedModule } from '@app/shared/shared.module';
import { SpecificRatingStudentComponent } from './student/specific-rating-student/specific-rating-student.component';
import { ResetStudentRatingComponent } from './student/reset-student-rating/reset-student-rating.component';

@NgModule({
  declarations: [MarkStudentRatingComponent, RatingSearchComponent, SpecificRatingStudentComponent, 
    ResetStudentRatingComponent],
  imports: [
    CommonModule,
    RatingRoutingModule,
    SharedModule
  ],
  providers:[
    StudentRatingService
  ]
})
export class RatingModule { }
