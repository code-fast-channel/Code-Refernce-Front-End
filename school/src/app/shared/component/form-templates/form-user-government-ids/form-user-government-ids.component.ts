import { Component, OnInit, Input } from '@angular/core';
import { MasterData } from '@env/environment';
import { FieldConfig } from '../../dynamic-form/field.interface';
import { Validators, FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-user-government-ids',
  templateUrl: './form-user-government-ids.component.html',
  styleUrls: ['./form-user-government-ids.component.css']
})
export class FormUserGovernmentIdsComponent implements OnInit {
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
    
    this.fieldsConfig= [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Passport No",
        inputType: "text",
        name: "passportNo",
        icon: "flight_takeoff"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Aadhar Card No",
        inputType: "text",
        name: "aadharCardNo",
        icon: "assignment_ind"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "PAN No",
        inputType: "text",
        name: "panNo",
        icon: "money"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Driving Licence No",
        inputType: "text",
        name: "drivingLicenceNo",
        icon: "local_taxi"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Voter Card No",
        inputType: "text",
        name: "voterCardNo",
        icon: "how_to_vote"
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  } 
  
}
