import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'exam-calendar',
  templateUrl: './exam-calendar.component.html',
  styleUrls: ['./exam-calendar.component.css']
})
export class ExamCalendarComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() schoolExam = null
  
  public masterData = MasterData
  public isLoading = false

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
