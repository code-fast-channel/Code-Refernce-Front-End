import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MasterData } from '@env/environment';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { SharedService } from '@app/shared/services/shared.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.css']
})
export class DefaultDashboardComponent implements OnInit , OnDestroy {

  private unsubscribe$ = new Subject();
  
  isLoading = false
  guardianCount = null
  studentCount = null
  employeeCount = null
  schoolEvent = null
  schoolExam = null

  public editPermissions = false
  public masterData = MasterData
  public attendanceData
  public studentRatingData

  constructor(
    private dashboardService: DashboardService,
    private plService: PostLoginService,
    public sharedService: SharedService,
    private router: Router
  ) {
    this.editPermissions = this.plService.getPageEntitlements(1,1) === 2
   }

  ngOnInit() {

    this.getStuGuardianEmpCount();
    this.configureAutoRefresh();    
  }

  configureAutoRefresh(){
    interval(3000 * 1000) // calling function after every 3000 seconds
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((val) => { 
      if(!this.isLoading)
      {
       // this.getStuGuardianEmpCount();
      }
    });
  }

  getStuGuardianEmpCount() {
    this.isLoading = true
    this.dashboardService.getCounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          this.attendanceData = result["attendanceCount"]
          this.segregateStrengthCountResults(result["strengthCount"])
          this.studentRatingData = result["studentRatingCount"]
          this.schoolEvent = result["schoolEvent"]
          this.schoolExam = result["schoolExam"]
          this.isLoading = false
        },
        (error) => {
          this.isLoading = false
        }
      )
  }  

  segregateStrengthCountResults(result) {
    result.forEach(item => {
      switch (item["data"]) {
        case "guardian":
          {
            this.guardianCount = this.calculateGenderWiseCount(item["count"])
            break;
          }
        case "student":
          {
            this.studentCount = this.calculateGenderWiseCount(item["count"])
            break;
          }
        case "employee":
          {
            this.employeeCount = this.calculateGenderWiseCount(item["count"])
            break;
          }
      }
    });
  }

  calculateGenderWiseCount(source): any{
    let obj = {}
    obj["femaleCount"] = 0
    obj["maleCount"] = 0
    obj["othersCount"] = 0

    let totalCount = 0
    source.forEach(element => {
      switch(element["_id"]["genderId"]){
        case 0:
          {
            obj["femaleCount"] = element["count"]
            totalCount = totalCount + element["count"]
            break
        }
        case 1:
          {
            obj["maleCount"] = element["count"]
            totalCount = totalCount + element["count"]
            break
        }
        case 2:
          {
            obj["othersCount"] = element["count"]
            totalCount = totalCount + element["count"]
            break
        }
      }      
    });

    obj["total"] = totalCount

    return obj

  }

  countCardViewClicked(type){
    switch(type)
    {
      case "guardian":{
        this.router.navigateByUrl("pl/secure/studentguardian/(postLoginOutlet:guardianMgmt)")
        break
      }
      case "student":{
        this.router.navigateByUrl("pl/secure/studentguardian/(postLoginOutlet:studentMgmt)")
        break
      }
      case "employee":{
        this.router.navigateByUrl("pl/secure/employee/(postLoginOutlet:empmgmt)")
        break
      }
      case "studentAttendance" :{
        this.router.navigateByUrl("pl/secure/attendance/(postLoginOutlet:markStuAttendance)")
        break
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
