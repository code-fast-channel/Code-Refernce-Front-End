import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'exam-accordian',
  templateUrl: './exam-accordian.component.html',
  styleUrls: ['./exam-accordian.component.css']
})
export class ExamAccordianComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() schoolExam = null
  
  public masterData = MasterData
  public isLoading = false
  public customObject

  public allSubjects

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.schoolExam = this.sharedService.GroupBy(this.schoolExam, 'classId')
  }  

  groupByObject(obj, fieldname){
    return this.sharedService.GroupBy(obj, fieldname)
  }  

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
