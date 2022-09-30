import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterData, environment } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { StudentAttendanceService } from '@app/post-login/attendance/services/student-attendance.service';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-mark-student-attendance',
  templateUrl: './mark-student-attendance.component.html',
  styleUrls: ['./mark-student-attendance.component.css']
})
export class MarkStudentAttendanceComponent implements OnInit, AfterViewChecked, OnDestroy {
  private unsubscribe$ = new Subject();
  @ViewChild('searchCard') searchCard : CardBottomComponent

  @Input() loading = false
  @Input() public open = true
  @Input() public stayOnPage = true

  mainForm: FormGroup = new FormGroup({})
  searchForm: FormGroup = new FormGroup({})

  environment = environment
  masterData = MasterData

  isPopulatingFormDb = false
  initialFormValues = null

  public attendanceStatusCount = {}  
  public editPermissions

  attendance = null

  title = "Add Employee Details."
  subTitle = "Please provide following details of employee."

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public studentAttendanceService: StudentAttendanceService,
    private plService: PostLoginService
  ) { 
    this.editPermissions = this.plService.getPageEntitlements(2,1) === 2
    this.initializeAttendanceCounts()
  }

  initializeAttendanceCounts(){
    this.attendanceStatusCount["pending"] = 0
    this.attendanceStatusCount["present"] = 0
    this.attendanceStatusCount["halfDay"] = 0
    this.attendanceStatusCount["sick"] = 0
    this.attendanceStatusCount["leave"] = 0
    this.attendanceStatusCount["absent"] = 0
  }

  ngOnInit(): void {    
  }

  searchAttendance() {
    this.loading = true

    let searchParams = this.searchForm.value

    searchParams["classId"] = this.sharedService.serializeMongoObjectId(searchParams["classId"])

    this.studentAttendanceService.getClassSectionAttendance(searchParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {

          this.isPopulatingFormDb = false
          this.loading = false

          this.attendance = result
          this.attendanceCount()
        },
        (error) => {
          this.isPopulatingFormDb = false
          this.loading = false
          console.log(error)
        }
      );
  }

  onSearchClick() {
    this.searchForm.markAllAsTouched()

    if (this.searchForm.valid) {
      this.searchCard.hide()
      this.searchAttendance()
    }
  }

  changeAttendanceStatus(idx, attendanceStatusId) {
    switch (attendanceStatusId) {
      case 1: {
        attendanceStatusId = 2;
        break;
      }
      case 2: {
        attendanceStatusId = 5;
        break;
      }
      case 5: {
        attendanceStatusId = 10;
        break;
      }
      case 10: {
        attendanceStatusId = 15;
        break;
      }
      case 15: {
        attendanceStatusId = 20;
        break;
      }
      case 20: {
        attendanceStatusId = 2;
        break;
      }
    }

    this.attendance[idx]["attendanceStatusId"] = attendanceStatusId
    this.attendanceCount();
  }

  attendanceCount() {
    this.initializeAttendanceCounts()

    this.attendance.forEach(stu => {
      switch (stu["attendanceStatusId"]) {
        case 1: {
          this.attendanceStatusCount["pending"] = this.attendanceStatusCount["pending"] + 1;
          break;
        }
        case 2: {
          this.attendanceStatusCount["present"] = this.attendanceStatusCount["present"] + 1;
          break;
        }
        case 5: {
          this.attendanceStatusCount["halfDay"] = this.attendanceStatusCount["halfDay"] + 1;
          break;
        }
        case 10: {
          this.attendanceStatusCount["sick"] = this.attendanceStatusCount["sick"] + 1;
          break;
        }
        case 15: {
          this.attendanceStatusCount["leave"] = this.attendanceStatusCount["leave"] + 1;
          break;
        }
        case 20: {
          this.attendanceStatusCount["absent"] = this.attendanceStatusCount["absent"] + 1;
          break;
        }
      }
    });
  }

  saveAttendance(){
    
    this.loading = true

    this.studentAttendanceService.saveAttendance(this.makeAttendance())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.loading = false
          this.sharedService.openSnackBar("Attendance get saved Successfully.", "x", "success")
          this.mainForm.reset()     
        },
        (error) => {
          this.loading = false
          this.sharedService.openSnackBar("Attendance not get saved.", "x", "fail")
          console.log(error)
        }
      );
  }

  makeAttendance() {
    let manualAttendance: Map<Number, Array<object>> = new Map<number, Array<object>>()

    this.attendance.forEach(stu => {

      if (!manualAttendance.get(stu["sectionId"])) {
        manualAttendance.set(stu["sectionId"], new Array<object>())
      }

      manualAttendance.get(stu["sectionId"])
        .push(
          {            
            "studentId": stu["studentId"],
            "attendanceStatusId": stu["attendanceStatusId"]
          }
        )
    });

    let AttendanceModel = {
                          "_id" : this.attendance[0]["_id"],
                          "attendanceDate" : this.searchForm.get("attendanceDate").value,
                          "status" : 1,
                          "classes" : []
                        }
    
    //-------- populate section wise attendance
    for (let idx = 0; idx < 10; idx++) {

      if (manualAttendance.get(idx)) {
        AttendanceModel.classes.push(
          {
            "classId" : this.searchForm.get("classId").value,
            "sectionId" : idx,
            "students" : manualAttendance.get(idx)
          }
        )
      }
    }
    return AttendanceModel
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
