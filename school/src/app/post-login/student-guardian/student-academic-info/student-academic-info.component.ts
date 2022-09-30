import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-student-academic-info',
  templateUrl: './student-academic-info.component.html',
  styleUrls: ['./student-academic-info.component.css']
})
export class StudentAcademicInfoComponent implements OnInit {
  
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
        label: "Registration No",
        inputType: "text",
        name: "registrationNo",
        icon: "receipt",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Roll No",
        inputType: "text",
        name: "rollNo",
        icon: "emoji_people",
        validations: [validationType.required()]
      }
    ]
    this.fieldsConfig = this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

  
}