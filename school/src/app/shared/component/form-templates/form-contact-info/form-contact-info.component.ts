import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { MasterData } from '@env/environment';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-contact-info',
  templateUrl: './form-contact-info.component.html',
  styleUrls: ['./form-contact-info.component.css']
})
export class FormContactInfoComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() Required = false
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  
  masterData = MasterData
  
  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit() {  
    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Contact No",
        inputType: "text",
        name: "contactNo",
        icon: "phone_iphone",
        validations: this.Required ? [validationType.required()] : null
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Alternate Contact No",
        inputType: "text",
        name: "altContactNo",
        icon: "phone_iphone"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Fax No",
        inputType: "text",
        name: "faxNo",
        icon: "local_printshop"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Email Address",
        inputType: "email",
        name: "email",
        validations: [validationType.email()]
      } 
    ]

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}