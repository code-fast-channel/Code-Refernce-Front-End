import { Component, OnInit, Input } from '@angular/core';
import { MasterData } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-ddl-relation',
  templateUrl: './ddl-relation.component.html',
  styleUrls: ['./ddl-relation.component.css']
})
export class DdlRelationComponent implements OnInit {

  @Input() form: FormGroup
  @Input() value = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  
  masterData = MasterData
  
  constructor(
    private sharedService: SharedService
  ) {}

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
        label: "Relation",
        name: "relationId",
        value: this.value,
        options: this.masterData.relations,
        validations: [validationType.required()]
      }  
      ]
  }

}
