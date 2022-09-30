import { Component, OnInit, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MasterData } from '@env/environment';
import { takeUntil } from 'rxjs/operators';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'app-class-section-ddl',
  templateUrl: './class-section-ddl.component.html',
  styleUrls: ['./class-section-ddl.component.css']
})
export class ClassSectionDdlComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() subjectsFieldsConfig: FieldConfig[]
  @Input() fieldsConfig: FieldConfig[]
  @Input() initialFormValues = null
  @Input() isViewMode = false
  @Input() sectionNeeded = true
  @Input() subjectNeeded = false
  @Input() NothingRequired = false
  @Input() Required = false

  isLoading = false
  masterData = MasterData

  branchClassChanged$ = new EventEmitter<any>()
  sectionChanged$ = new EventEmitter<any>()

  public allSubjectList = null

  constructor(
    private sharedApiService: SharedApiService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {

    this.setFieldConfigs()

    if (this.NothingRequired) {
      this.Required = false
    }

    this.registerDropdownChangeEvents()
    if (this.subjectNeeded) {
      this.fetchAllSubjects()
    }
    this.fetchClassDdl()
  }

  setFieldConfigs() {

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Class",
        name: "classId",
        icon: "ballot",
        onValueChange: this.sectionNeeded ? this.branchClassChanged$ : null,
        value: this.initialFormValues ? this.initialFormValues.classId : null,
        validations: !this.NothingRequired ? [validationType.required()] : null
      }
    ];

    if (this.sectionNeeded) {
      this.fieldsConfig.push(
        {
          isViewMode: this.isViewMode,
          type: "select",
          label: "Section",
          name: "sectionId",
          icon: "list_alt",
          onValueChange: this.subjectNeeded ? this.sectionChanged$ : null,
          value: this.initialFormValues ? this.initialFormValues.sectionId : null,
          validations: this.Required ? [validationType.required()] : null
        }
      )
    }

    if (this.subjectNeeded) {
      this.subjectsFieldsConfig = [
        {
          isViewMode: this.isViewMode,
          type: "select",
          label: "Subject",
          name: "subjectId",
          icon: "menu_book",
          value: this.initialFormValues ? this.initialFormValues.subjectId : null,
          validations: this.Required ? [validationType.required()] : null
        }
      ];
    }
  }

  registerDropdownChangeEvents() {
    this.branchClassChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.branchClassChanged()
      })

    this.sectionChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.sectionChanged()
      })
  }

  fetchAllSubjects() {
    this.sharedApiService.getSubjectDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allSubjectList = val
      },
        error => {
          this.isLoading = false
        }
      )
  }

  fetchClassDdl() {

    this.isLoading = true
    this.fieldsConfig[0].options = []; // make class list empty

    if (this.sectionNeeded) {
      this.fieldsConfig[1].options = []; // make section list empty
    }

    this.sharedApiService.getClassSubjectSectionDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        // When view mode will will show all the classes, even which has status == 0 or delted.
        // Else will show only those which are currently active
        this.fieldsConfig[0].options = (<Array<any>>val).filter(x => x.status == 1 || this.isViewMode)
        this.isLoading = false

        if (this.initialFormValues) {
          this.fetchSectoinDdl()

          if (this.subjectNeeded) {
            this.fetchSubjectDdl(this.initialFormValues.classId, this.initialFormValues.sectionId)
          }
        }
      },
        error => {
          this.isLoading = false
        }
      )
  }

  branchClassChanged() {
    this.form.get('sectionId').setValue(null)

    if (this.sectionNeeded) {
      this.fieldsConfig[1].options = null
      this.fetchSectoinDdl()
    }

    if (this.subjectNeeded) {
      this.form.get('subjectId').setValue(null)
      this.subjectsFieldsConfig[0].options = null
    }
  }

  fetchSectoinDdl() {

    let selectedClassId = this.form.get('classId') ? this.form.get('classId').value.$oid : this.initialFormValues.classId.$oid

    this.fieldsConfig[0].options.forEach(item => {
      if (selectedClassId === item["_id"].$oid) {
        this.fliterSection(item["classSection"])
        return;
      }
    });
  }

  fliterSection(validSectionIds: number[]) {

    let validSectionArray: { id: number, name: string }[] = []

    this.masterData.classSections.forEach(section => {
      // When view mode we will show all the section available in the master data.
      // Else will show only those which are currently part of class 
      if (validSectionIds.indexOf(section.id) > -1 || this.isViewMode) {
        validSectionArray.push(section)
      }
    });

    this.fieldsConfig[1].options = validSectionArray
  }

  sectionChanged() {
    if (this.subjectNeeded) {
      this.form.get('subjectId').setValue(null)
      this.subjectsFieldsConfig[0].options = null
      this.fetchSubjectDdl()
    }
  }

  fetchSubjectDdl(classId = null, sectionId = null) {

    if (!classId) {
      classId = this.form.get('classId').value
    }

    if (!sectionId) {
      sectionId = this.form.get('sectionId').value
    }

    this.fieldsConfig[0].options.forEach(item => {
      if (classId.$oid === item["_id"].$oid) {

        // When view mode will will show all the subjects, even which has status == 0 or delted.
        // Else will show only those which are currently active
        this.filterSubjects(item["subject"].filter(x => x.sectionId === sectionId && (x.status == 1 || this.isViewMode)))
        return;
      }
    });
  }


  filterSubjects(validSubjects) {
    let filteredSubjects = []

    validSubjects.forEach(sub => {
      filteredSubjects.push(
        this.allSubjectList.find(x => x['_id']['$oid'] === sub['_id']['$oid'])
      )
    });

    this.subjectsFieldsConfig[0].options = filteredSubjects
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}