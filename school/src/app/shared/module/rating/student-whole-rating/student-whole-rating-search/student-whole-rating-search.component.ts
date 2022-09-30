import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-whole-rating-search',
  templateUrl: './student-whole-rating-search.component.html',
  styleUrls: ['./student-whole-rating-search.component.css']
})
export class StudentWholeRatingSearchComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() fieldsConfig: FieldConfig[]

  private allSubjectList
  private allClassesList

  constructor(
    private sharedApiService: SharedApiService
  ) { }

  ngOnInit(): void {
    this.fetchAllClasses()
  }

  fetchAllClasses() {
    this.sharedApiService.getClassSubjectSectionDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allClassesList = val
        this.fetchAllSubjects()
      },
        error => {
        }
      )
  }

  fetchAllSubjects() {
    this.sharedApiService.getSubjectDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allSubjectList = val
        this.setFieldsConfig()
      },
        error => {
        }
      )
  }

  setFieldsConfig() {
    this.fieldsConfig = [
      {
        isViewMode: false,
        type: "select",
        label: "Class",
        name: "classId",
        icon: "ballot",
        options: this.allClassesList
      },
      {
        isViewMode: false,
        type: "select",
        label: "Subject",
        name: "subjectId",
        icon: "menu_book",
        options: this.allSubjectList
      },
      {
        isViewMode: false,
        type: "select",
        label: "Rating",
        name: "ratingId",
        icon: "star",
        options: [
          {id:1, name: '1 Star'},
          {id:2, name: '2 Star'},
          {id:3, name: '3 Star'},
          {id:4, name: '4 Star'},
          {id:5, name: '5 Star'}
        ]
      }
    ]
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
