import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'overall-attendance-count-chart',
  templateUrl: './overall-attendance-count-chart.component.html',
  styleUrls: ['./overall-attendance-count-chart.component.css']
})
export class OverallAttendanceCountChartComponent implements OnInit, AfterContentChecked {

  @Input() eyeButton = true
  @Input() title
  @Input() attendanceRawData
  @Input() attendanceStatusCount
  @Input() open = true

  public editPermissions = false
  public totalStudents
  public presentPercentage

  constructor(
    private router: Router
  ) { 
  }

  ngOnInit() {
    if (this.attendanceRawData) {
      this.segregateAttendanceCountResults()
    }

    this.calculatePresentPercentage()
  }

  ngAfterContentChecked(): void {
    this.calculatePresentPercentage()
  }

  segregateAttendanceCountResults() {

    this.attendanceStatusCount = {}
    this.attendanceStatusCount["pending"] = 0
    this.attendanceStatusCount["present"] = 0
    this.attendanceStatusCount["halfDay"] = 0
    this.attendanceStatusCount["sick"] = 0
    this.attendanceStatusCount["leave"] = 0
    this.attendanceStatusCount["absent"] = 0

    this.attendanceRawData.forEach(attendance => {      
        switch (attendance["_id"]["attendanceStatusId"]) {
          case 1: {
            this.attendanceStatusCount["pending"] = this.attendanceStatusCount["pending"] + attendance["count"]
            break
          }
          case 2: {
            this.attendanceStatusCount["present"] = this.attendanceStatusCount["present"] + attendance["count"]
            break
          }
          case 5: {
            this.attendanceStatusCount["halfDay"] = this.attendanceStatusCount["halfDay"] + attendance["count"]
            break
          }
          case 10: {
            this.attendanceStatusCount["sick"] = this.attendanceStatusCount["sick"] + attendance["count"]
            break
          }
          case 15: {
            this.attendanceStatusCount["leave"] = this.attendanceStatusCount["leave"] + attendance["count"]
            break
          }
          case 20: {
            this.attendanceStatusCount["absent"] = this.attendanceStatusCount["absent"] + attendance["count"]
            break
          }
        }    
    });
  }

  calculatePresentPercentage() {

    this.totalStudents = this.attendanceStatusCount["pending"] + this.attendanceStatusCount["present"] + this.attendanceStatusCount["halfDay"]
      + this.attendanceStatusCount["sick"] + this.attendanceStatusCount["leave"] + this.attendanceStatusCount["absent"]

    let present = this.attendanceStatusCount["present"] + (this.attendanceStatusCount["halfDay"] / 2)
    if (present > 0) {
      this.presentPercentage = (present * 100) / this.totalStudents
      this.presentPercentage = this.presentPercentage.toFixed(2);
    }
    else {
      this.presentPercentage = "0.00";
    }
  }

  countCardViewClicked(type) {
    this.router.navigateByUrl("pl/secure/attendance/(postLoginOutlet:markStuAttendance)")
  }
}