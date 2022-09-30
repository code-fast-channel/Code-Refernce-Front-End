import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'class-basic-info',
  templateUrl: './class-basic-info.component.html',
  styleUrls: ['./class-basic-info.component.css']
})
export class ClassBasicInfoComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
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
        label: "Class Name",
        inputType: "text",
        name: "className",
        icon: "ballot",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Class Basic Fee",
        inputType: "number",
        name: "classFee",
        icon: "money",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "togglebutton",
        label: "Is Semester System",
        name: "isSemesterSystem",
        value: false
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Section",
        name: "classSection",
        inputType: "multi",
        icon: "list_alt",
        options: this.masterData.classSections,
        validations: [validationType.required()]
      }
    ];
    
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
