import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { StudentRatingService } from '../../services/student-rating.service';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-specific-rating-student',
  templateUrl: './specific-rating-student.component.html',
  styleUrls: ['./specific-rating-student.component.css']
})
export class SpecificRatingStudentComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() loading = false

  isPopulatingFormDb = false
  initialFormValues = null  
  rating = null

  public environment = environment
  public ratingStatusCount = {}
  public isViewAllRating
  public editPermissions = false
  public ratingValue = 5
  public selectedStudentId

  constructor(
    public sharedService: SharedService,
    public studentRatingService: StudentRatingService,
    private plService: PostLoginService
  ) {
      this.editPermissions = this.plService.getPageEntitlements(3,2) == 2
  }

  ngOnInit(): void {
    this.searchRating()
  }

  searchRating() {
    this.loading = true

    this.studentRatingService.getSpecificRatingStudents(this.ratingValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {

          this.loading = false
          this.rating = result
        },
        (error) => {
          this.loading = false
          console.log(error)
        }
      );
  }

  viewAllRatingClicked(stuId){
    this.selectedStudentId = stuId
    this.isViewAllRating = true
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}