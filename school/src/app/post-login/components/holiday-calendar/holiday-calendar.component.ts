import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.css']
})
export class HolidayCalendarComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  public masterData = MasterData
  public isLoading = false
  public schoolHolidays

  public sectionTitle
  public startDate
  public endDate

  constructor(
    private sharedApiService : SharedApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loadHolidayDataFromDB()
  }


  loadHolidayDataFromDB(){

    let holidayYear = new Date().getFullYear()
    this.sectionTitle = "Holiday list for year "+holidayYear
    
    this.startDate = new Date(2020,0,1)
    this.endDate = new Date(2020,11,31)

    this.startDate = this.startDate.setHours(0, 0, 0, 0)
    this.endDate = this.endDate.setHours(0, 0, 0, 0)

    this.isLoading = true

      this.sharedApiService.getSchoolHolidayByDateRange(this.startDate, this.endDate)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.schoolHolidays = result["schoolHoliday"]
          },
          (error) => {
            this.isLoading = false
            console.log(error)
          }
        );
        
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
