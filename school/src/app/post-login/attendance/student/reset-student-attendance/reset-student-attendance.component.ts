import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentAttendanceService } from '../../services/student-attendance.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-reset-student-attendance',
  templateUrl: './reset-student-attendance.component.html',
  styleUrls: ['./reset-student-attendance.component.css']
})
export class ResetStudentAttendanceComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  public loading = false
  public resultMessage = ""
  public editPermissions

  constructor(
    private sharedService: SharedService,
    private attendanceService: StudentAttendanceService,
    private plService: PostLoginService
  ) { 
    this.editPermissions = this.plService.getPageEntitlements(2, 3) === 2
  }

  ngOnInit() {
  }

  buttonClicked(){
    this.resultMessage = ""

    let resetConfirmationMessage = "You want to delete today's Student Attendance."
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
  
  this.attendanceService.resetAttendance()
  .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.loading = false
          this.resultMessage = "Attendance reset successfully"
        },
        (error) => {
          this.loading = false
          console.log(error)
          this.resultMessage = "Sorry! Unable to reset the attendance"
        }
      );
}

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
