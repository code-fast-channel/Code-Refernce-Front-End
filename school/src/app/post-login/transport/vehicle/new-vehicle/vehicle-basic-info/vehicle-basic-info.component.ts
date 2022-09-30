import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'vehicle-basic-info',
  templateUrl: './vehicle-basic-info.component.html',
  styleUrls: ['./vehicle-basic-info.component.css']
})
export class VehicleBasicInfoComponent implements OnInit {

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
        label: "Company Name",
        inputType: "text",
        name: "companyName",
        icon: "emoji_transportation",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Model Name",
        inputType: "text",
        name: "modelName",
        icon: "airport_shuttle",
        validations: [validationType.required()]
      },      
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Registration No",
        inputType: "text",
        name: "registrationNo",
        icon: "directions_bus",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "date",
        label: "Registration Date",
        name: "registrationDate"
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Seat Capacity",
        inputType: "number",
        name: "seatCapacity",
        icon: "airline_seat_recline_normal",
        validations: [validationType.required()]        
      },      
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Custom Name",
        inputType: "text",
        name: "customName",
        icon: "directions_bus",
        validations: [validationType.required()]        
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Vehicle Type",
        name: "vehicleTypeId",    
        icon: "commute",  
        options: this.masterData.vehicleTypes,
        validations:[validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Fuel Type",
        name: "fuelTypeId",      
        icon: "local_gas_station",
        options: this.masterData.fuelTypes,
        validations:[validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "togglebutton",
        label: "Is on rent",
        name: "isRental",      
        value: false      
      },
      {
        isViewMode: this.isViewMode,
        type: "togglebutton",
        label: "Is only for office",
        name: "isOnlyForOffice",      
        value: false      
      }
    ];
    
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
