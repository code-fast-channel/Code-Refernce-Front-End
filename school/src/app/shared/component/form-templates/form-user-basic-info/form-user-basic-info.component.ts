import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { MasterData } from '@env/environment';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-user-basic-info',
  templateUrl: './form-user-basic-info.component.html',
  styleUrls: ['./form-user-basic-info.component.css']
})
export class FormUserBasicInfoComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() minAge = 18
  @Input() maxAge = 150

  masterData = MasterData

  constructor(    
    private sharedService: SharedService
  ) {}

  ngOnInit() {  

    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()

    let maxDate = new Date(currentYear-this.minAge, currentMonth, currentDate)
    let minDate = this.maxAge ? new Date(currentYear - this.maxAge, currentMonth, currentDate) : null

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "First Name",
        inputType: "text",
        name: "firstName",
        icon: "accessibility_new",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Last Name",
        inputType: "text",
        name: "lastName",
        icon: "accessibility",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "DOB",
        name: "dob",
        options : {
          "maxDate" : maxDate,
          "minDate" : minDate,
          "startView" : "multi-year"
        }
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Gender",
        name: "genderId",    
        icon: "child_care",  
        options: this.masterData.genders,
        validations:[validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Religion",
        name: "religionId",
        icon: "bubble_chart",
        options: this.masterData.religions,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Cast",
        name: "castId",
        icon: "scatter_plot",
        options: this.masterData.casts,
        validations: [validationType.required()]
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

  
}