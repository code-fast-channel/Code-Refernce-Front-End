import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-code-name',
  templateUrl: './form-code-name.component.html',
  styleUrls: ['./form-code-name.component.css']
})
export class FormCodeNameComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() Required = false
  @Input() codeField = true
  @Input() descriptionField = true
  @Input() labelPrefix = null
  @Input() fieldPrefix = null
  @Input() codeIcon = 'location_city'
  @Input() nameIcon = 'location_city'

  masterData = MasterData

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    let codeFieldName = "code"
    let codeLabelName = "Code"

    let nameFieldName = "name"
    let nameLabelName = "Name"

    if(this.labelPrefix){
      codeLabelName = this.labelPrefix+' '+codeLabelName
      nameLabelName = this.labelPrefix+' '+nameLabelName
    }

    if(this.fieldPrefix){
      codeFieldName = this.fieldPrefix+"Code"
      nameFieldName = this.fieldPrefix+"Name"
    }

    if (!this.fieldsConfig) {
      this.fieldsConfig = []
    }

    if (this.codeField) {
      this.fieldsConfig.push(
        {
          isViewMode: this.isViewMode,
          type: "input",
          label: codeLabelName,
          inputType: "text",
          name: codeFieldName,
          icon: this.codeIcon,
          validations: this.Required ? [validationType.required()] : null
        }
      )
    }

    this.fieldsConfig.push(
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: nameLabelName,
        inputType: "text",
        name: nameFieldName,
        icon: this.nameIcon,
        validations: this.Required ? [validationType.required()] : null
      }
    )

    if (this.descriptionField) {
      this.fieldsConfig.push(
        {
          isViewMode: this.isViewMode,
          type: "textarea",
          label: "Description",
          inputType: "textarea",
          name: "description"
        }
      )
    }

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}
