import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'class-subject-info',
  templateUrl: './class-subject-info.component.html',
  styleUrls: ['./class-subject-info.component.css']
})
export class ClassSubjectInfoComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  teacherDataObservable: Observable<any>;

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() sectionId
  masterData = MasterData
  
  isLoading = false

  constructor(    
    private sharedService: SharedService
  ) {}

  ngOnInit() {    
    this.makeFieldConfig()      
  } 

  makeFieldConfig(){

    this.form.addControl("sectionId", new FormControl(this.sectionId) )

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Maximum marks",
        inputType: "number",
        name: "maxMarks",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Passing marks",
        inputType: "number",
        name: "passingMarks",
        validations: [validationType.required()]
      }
    ];
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
