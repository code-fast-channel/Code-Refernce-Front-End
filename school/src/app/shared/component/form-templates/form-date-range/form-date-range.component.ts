import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { validationType, FieldConfig } from '../../dynamic-form/field.interface';
import { FormGroup, Validators } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-date-range',
  templateUrl: './form-date-range.component.html',
  styleUrls: ['./form-date-range.component.css']
})
export class FormDateRangeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() addFields: FieldConfig[]
  @Input() isViewMode = false
  @Input() Required = false
  @Input() includeTime = false
  @Input() fromField = 'fromDate'
  @Input() toField = 'toDate'
  @Input() columnsPerRow = '2'
  @Input() gap

  masterData = MasterData

  public errorMessage = ""

  constructor(
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "From Date",
        name: this.fromField,
        validations: this.Required ? [validationType.required()] : null
      },
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "To Date",
        name: this.toField,
        validations: this.Required ? [validationType.required()] : null
      }
    ];

    if (this.addFields) {
      this.fieldsConfig.push(...this.addFields)
    }

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
    this.checkWhenFromAndToDateChanged()
  }

  checkWhenFromAndToDateChanged() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.compareFieldBothFieldValues()
      })
  }

  compareFieldBothFieldValues() {
    let fromControl = this.form.get(this.fromField)
    let toControl = this.form.get(this.toField)

    this.errorMessage = ""

    if (!(fromControl && toControl)) {
      return
    }

    let fromDate = fromControl.value ? new Date(fromControl.value) : null
    let toDate = toControl.value ? new Date(toControl.value) : null

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        this.errorMessage = "'From date' should be equal to or less than 'To date'"
        this.form.controls[this.fromField].setErrors({ 'incorrect': true })
      }
      else {        
        this.form.controls[this.fromField].setErrors(null)
      }
    }

  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}