import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { HttpClient } from 'selenium-webdriver/http';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-subject-teacher-ddl',
  templateUrl: './subject-teacher-ddl.component.html',
  styleUrls: ['./subject-teacher-ddl.component.css']
})
export class SubjectTeacherDdlComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() fieldsConfig: FieldConfig[]
  @Input() initialFormValues = null
  @Input() isViewMode = false
  @Input() teacherNeeded = true
  @Input() Required = false

  isLoading = false
  masterData = MasterData

  public allSubjectList
  public allTeacherList

  subjectChanged$ = new EventEmitter<any>()

  constructor(
    private sharedService: SharedService,
    private sharedApiService: SharedApiService
  ) {
  }

  ngOnInit() {

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Subject",
        name: "subjectId",
        icon: "menu_book",
        onValueChange: this.subjectChanged$,
        value: this.initialFormValues ? this.initialFormValues.subjectId : null,
        validations: !this.Required ? [validationType.required()] : null
      }
    ];

    if (this.teacherNeeded) {
      this.fieldsConfig.push(
        {
          isViewMode: this.isViewMode,
          type: "select",
          label: "Teacher",
          name: "teacherId",
          icon: "account_circle",
          value: this.initialFormValues ? this.initialFormValues.teacherId : null,
          validations: !this.Required ? [validationType.required()] : null
        }
      )
    }

    this.registerDropdownChangeEvents()

    this.loadDdls()
  }

  registerDropdownChangeEvents() {
    this.subjectChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.subjectChanged()
      })
  }

  loadDdls() {
    this.loadSubjectDdl()
    if (this.teacherNeeded) {
      this.loadTeacherDdl()
    }
  }

  loadSubjectDdl() {
    this.allSubjectList = this.sharedApiService.getSubjectDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allSubjectList = val
        // When view mode will will show all the Subject, even which has status == 0 or deleted.
        // Else will show only those which are currently active
        this.allSubjectList = this.allSubjectList.filter(x => x.status == 1 || this.isViewMode)
        this.fieldsConfig[0].options = this.allSubjectList
      },
        error => {
        }
      )
  }

  loadTeacherDdl() {
      this.sharedApiService.teacherDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allTeacherList = val
        // When view mode will will show all the Teacher, even which has status == 0 or deleted.
        // Else will show only those which are currently active
        this.allTeacherList = this.allTeacherList.filter(x => x.status == 1 || this.isViewMode)
        this.fieldsConfig[1].options = this.allTeacherList
      },
        error => {
        }
      )
  }

  subjectChanged() {
    this.populateTeacherDdl(this.form.get("subjectId").value)
  }

  populateTeacherDdl(subjectId) {

    if (!this.teacherNeeded) {
      return
    }

    // First of all empty the current data
    this.form.get('teacherId').setValue(null)
    this.fieldsConfig[1].options = this.filterTeacherBySubject(subjectId)

  }

  filterTeacherBySubject(subjectId) {
    /**
     * Here we filter the teacher based on the selected subject,
     * But don't change teacherList itself here,
     * Because when again subject get changed we then again filter the list
     */

    return this.allTeacherList;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}