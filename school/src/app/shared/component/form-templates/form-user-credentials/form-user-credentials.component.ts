import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { MasterData } from '@env/environment';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-user-credentials',
  templateUrl: './form-user-credentials.component.html',
  styleUrls: ['./form-user-credentials.component.css']
})
export class FormUserCredentialsComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null  
  @Input() fieldsConfig: FieldConfig[] 
  @Input() isViewMode = false
  
  masterData = MasterData

  constructor(
    private sharedService: SharedService
  ) {
   }

  ngOnInit() { 
    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Login Id",
        inputType: "text",
        name: "loginId",
        icon: "security",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Password",
        inputType: "password",
        name: "password",
        validations: [validationType.required(), validationType.minLength(5)]
      } 
    ]  

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }


}