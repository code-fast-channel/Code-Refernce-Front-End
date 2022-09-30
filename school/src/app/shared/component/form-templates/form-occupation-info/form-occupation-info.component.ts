import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { FieldConfig } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-occupation-info',
  templateUrl: './form-occupation-info.component.html',
  styleUrls: ['./form-occupation-info.component.css']
})
export class FormOccupationInfoComponent implements OnInit {
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
      label: "Job Title",
      inputType: "text",
      name: "jobTitle",
      icon: "group_work"
    },
    {
      isViewMode: this.isViewMode,
      type: "input",
      label: "Job Location",
      inputType: "text",
      name: "jobLocation",
      icon: "room"
    },
    {
      isViewMode: this.isViewMode,
      type: "select",
      label: "Job Type",
      name: "jobTypeId",
      value: "",
      options: this.masterData.jobTypes
    },
    {
      isViewMode: this.isViewMode,
      type: "textarea",
      label: "Description",
      inputType: "textarea",
      name: "description"
    }
  ];

  this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
 }

}
