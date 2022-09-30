import { Component, OnInit, Input, EventEmitter, OnDestroy, OnChanges, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { MasterData } from '@env/environment';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-address-info',
  templateUrl: './form-address-info.component.html',
  styleUrls: ['./form-address-info.component.css']
})
export class FormAddressInfoComponent implements OnInit, OnDestroy, AfterViewInit {

  private unsubscribe$ = new Subject();

  @Input() form: FormGroup

  @Input() fieldsConfig: FieldConfig[]
  @Input() initialFormValues = null
  @Input() isViewMode = false

  masterData = MasterData

  countryChanged$ = new EventEmitter<any>()
  stateChanged$ = new EventEmitter<any>()

  stateList = []
  cityList = []

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Country",
        name: "countryId",
        onValueChange: this.countryChanged$,
        options: this.masterData.countries,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "State",
        name: "stateId",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        inputType: "text",
        label: "City",
        name: "cityName",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Pin Code",
        inputType: "text",
        name: "pinCode",
        icon: "room",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Address Line",
        inputType: "textarea",
        name: "addressLine",
        icon: "room",
        validations: [validationType.required()]
      }
    ];
    
    this.dropdownChangeEvents()

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)

  }

  ngAfterViewInit(){
    if(this.initialFormValues){
      this.countryChanged(this.initialFormValues["countryId"])
    }
  }

  dropdownChangeEvents() {
    this.countryChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.countryChanged(val)
        this.form.get('stateId').setValue(null)
      })
  }

  countryChanged(countryId) {
    this.stateList = [{
      id: 1, name: "Haryana",
    },
    {
      id: 2, name: "Punjab"
    }
    ]

    this.fieldsConfig[1].options = this.stateList
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}