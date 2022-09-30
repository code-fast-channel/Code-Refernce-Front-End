import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterData } from '@env/environment';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-exam-report-card',
  templateUrl: './exam-report-card.component.html',
  styleUrls: ['./exam-report-card.component.css']
})
export class ExamReportCardComponent implements OnInit {
  @ViewChild('selectedSectionToggleButton') selectedSectionToggleButton : MatButtonToggleGroup
  private unsubscribe$ = new Subject();

  @Input() examId
  @Input() isTabularReportCard

  public isLoading
  public dbData
  public resultData
  public sections
  public masterData = MasterData
  public selectedSectionId

  constructor(
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.getExamResult()
  }

  getExamResult() {
    this.isLoading = true

    this.examService.getExamResultStudentWise(this.examId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.dbData = result
          this.resultData = result
          this.isLoading = false
          this.getSectonList()
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );
  }

  showOnlyFailed(value) {
    if (!value) {
      this.resultData = this.dbData
    }
    else {
      let tempData = []
      this.dbData.forEach(result => {
        let failedSubject = result.subjects.filter(x => x.marksGained < x.passingMarks)
        if (failedSubject.length > 0) {
          tempData.push(result)
        }
      });

      this.resultData = tempData
    }

    this.getSectonList()
  }

  getSectonList() {
    let allSections = [] 

    this.resultData.forEach(element => {
      allSections.push(element["_id"]["sectionId"])
    });

    this.sections = Array.from(new Set(allSections)).sort();

    if(this.sections.length > 0)
    {
      this.selectedSectionId = this.sections[0]

      if(this.selectedSectionToggleButton){
        this.selectedSectionToggleButton.value = this.selectedSectionId
      }
    }

  }

  onSectionChange(sectionId){
    this.selectedSectionId = sectionId
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
