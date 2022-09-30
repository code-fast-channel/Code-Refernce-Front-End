import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '@app/shared/services/shared.service';
import { StudentRatingService } from '../../services/student-rating.service';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-reset-student-rating',
  templateUrl: './reset-student-rating.component.html',
  styleUrls: ['./reset-student-rating.component.css']
})
export class ResetStudentRatingComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  public loading = false
  public resultMessage = ""
  public editPermissions

  constructor(
    private sharedService: SharedService,
    private ratingService: StudentRatingService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(3,3) === 2
   }

  ngOnInit() {
  }

  buttonClicked(){
    this.resultMessage = ""

    let resetConfirmationMessage = "You want to delete all Student's rating for current cycle."
    let dialogRef = this.sharedService.openConfirmDialog(resetConfirmationMessage)

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
                this.reset()
        }        
      });
  }

reset(){
  this.loading = true
  
  this.ratingService.resetRating()
  .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.loading = false
          this.resultMessage = "Student Rating reset successfully."
        },
        (error) => {
          this.loading = false
          console.log(error)
          this.resultMessage = "Sorry! Unable to reset the Student Rating."
        }
      );
}

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
