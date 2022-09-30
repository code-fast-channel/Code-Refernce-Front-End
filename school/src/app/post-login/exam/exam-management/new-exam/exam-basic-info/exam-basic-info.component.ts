import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil, take } from 'rxjs/operators';
import { SchoolService } from '@app/post-login/school/services/school.service';
import { Subject } from 'rxjs';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'exam-basic-info',
  templateUrl: './exam-basic-info.component.html',
  styleUrls: ['./exam-basic-info.component.css']
})
export class ExamBasicInfoComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() classObject
  @Input() subjectId

  public allteachersList
  masterData = MasterData

  constructor(
    private sharedService: SharedService,
    private sharedApiService: SharedApiService
  ) {
    this.loadAllTeachers();
  }

  ngOnInit() {
    let maxMarks = 33
    let passingMarks = 100

    if (this.classObject) {
      let sub = this.classObject.subject.find(x => x["_id"]["$oid"] === this.subjectId["$oid"])
      maxMarks = sub.maxMarks
      passingMarks = sub.passingMarks
    }
    
    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Maximum marks",
        inputType: "number",
        name: "maxMarks",
        value: maxMarks,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Passing marks",
        inputType: "number",
        name: "passingMarks",
        value: passingMarks,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "Exam Date",
        name: "examDate",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Exam Teacher",
        name: "teacherId",
        icon: "account_circle",
        options: this.allteachersList,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Exam Room",
        inputType: "text",
        name: "room",
        icon: "meeting_room",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Comments",
        inputType: "textarea",
        name: "comments"
      }
    ]

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

  loadAllTeachers() {
    this.sharedApiService.teacherDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allteachersList = val
      },
        error => {
        }
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
