import { Component, OnInit, Input } from '@angular/core';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'route-basic-info',
  templateUrl: './route-basic-info.component.html',
  styleUrls: ['./route-basic-info.component.css']
})
export class RouteBasicInfoComponent implements OnInit {

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
        label: "Route Name",
        inputType: "text",
        name: "routeName",
        icon: "map",
        validations: [validationType.required()]
      },
      {
        isViewMode: true,
        type: "input",
        label: "Route Length",
        inputType: "text",
        name: "routeLength",
        icon: "swap_calls",        
        hint: "Auto calculate by stoppages.",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Description",
        name: "description",
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
