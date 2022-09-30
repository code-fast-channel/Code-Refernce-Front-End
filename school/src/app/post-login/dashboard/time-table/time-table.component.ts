import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  public isLoading
  public classes
  public masterData = MasterData
  public today = (new Date()).getDay()
  
  constructor(
    private sharedApiService: SharedApiService
  ) {
    this.getClasses()
   }

  ngOnInit(): void {
  }

  getClasses() {
    this.isLoading = true
    this.sharedApiService.getClassSubjectSectionDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          this.classes = result
          this.isLoading = false
        },
        (error) => {
          this.isLoading = false
        }
      )
  }  

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
