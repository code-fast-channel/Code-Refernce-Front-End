import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MasterData } from '@env/environment';
import { FieldConfig } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-user-medical-info',
  templateUrl: './form-user-medical-info.component.html',
  styleUrls: ['./form-user-medical-info.component.css']
})
export class FormUserMedicalInfoComponent implements OnInit {

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

    this.fieldsConfig=[
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Blood Group",
        name: "bloodGroupId",
        value: "",
        options: this.masterData.bloodGroups
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Preferred Hospital/Clinic Name",
        inputType: "text",
        name: "hospitalName",
        icon: "local_hospital",
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Physician/Doctor Name",
        inputType: "text",
        name: "doctorName",
        icon: "local_pharmacy",
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Physician/Doctor Contact No",
        inputType: "text",
        name: "doctorContactNo",
        icon: "headset_mic",
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Allergies/Special health considerations",
        inputType: "textarea",
        name: "specialConsiderations"
      }
    ]

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

  
}