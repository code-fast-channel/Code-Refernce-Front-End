import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterData } from '@env/environment';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'agenda-calendar',
  templateUrl: './agenda-calendar.component.html',
  styleUrls: ['./agenda-calendar.component.css']
})
export class AgendaCalendarComponent implements OnInit, OnDestroy, AfterViewChecked {
  private unsubscribe$ = new Subject();
  
  public editEventId = null
  public showAddEventDetailsPopUp = false
  public masterData = MasterData
  public isLoading = false
  public dateValue = null
  public events = null

  constructor(
    private changeDetector: ChangeDetectorRef,
    private sharedApiService : SharedApiService
  ) {}

  ngOnInit() {
  }

  dateClicked(event){
    this.dateValue = event  
    this.loadAgendaFromDB()  
  }

  loadAgendaFromDB(){
    this.isLoading = true

      this.sharedApiService.getSchoolEventByDate(this.dateValue)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.events = result["schoolEvent"]
          },
          (error) => {
            this.isLoading = false
            console.log(error)
          }
        );
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
