import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'vehicle-maintenance-info',
  templateUrl: './vehicle-maintenance-info.component.html',
  styleUrls: ['./vehicle-maintenance-info.component.css']
})
export class VehicleMaintenanceInfoComponent implements OnInit {

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
        label: "Maintenance Name",
        inputType: "text",
        name: "maintenanceName",
        icon: "local_car_wash",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Cost",
        inputType: "number",
        name: "maintenanceCost",
        icon: "money",
        validations: [validationType.required()]
      },  
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "Date",
        name: "maintenanceDate",
        validations: [validationType.required()]
      },      
      {
        isViewMode: this.isViewMode,
        type: "togglebutton",
        label: "Is Expected",
        name: "isExpected",      
        value: true      
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Description",
        inputType: "text",
        name: "description"
      }
    ];
    
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
