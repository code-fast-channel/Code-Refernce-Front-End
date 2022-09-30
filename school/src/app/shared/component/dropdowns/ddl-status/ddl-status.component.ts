import { Component, OnInit, Input } from '@angular/core';
import { validationType, FieldConfig } from '../../dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-ddl-status',
  templateUrl: './ddl-status.component.html',
  styleUrls: ['./ddl-status.component.css']
})
export class DdlStatusComponent implements OnInit {
  @Input() form: FormGroup
  @Input() value = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  
  masterData = MasterData
  
  constructor() {}

  ngOnInit() {  

    // don't change following if condition to
    // if(!this.value)
    if(this.value === false){
      this.value = null
    }

    this.fieldsConfig =[
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Status",
        name: "status",
        value: this.value,
        options: this.masterData.statusTypes,
        validations: [validationType.required()]
      }  
      ]
  }
}
