import { Component, OnInit, Input } from '@angular/core';
import { validationType, FieldConfig } from '../../dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ddl-role',
  templateUrl: './ddl-role.component.html',
  styleUrls: ['./ddl-role.component.css']
})
export class DdlRoleComponent implements OnInit {

  @Input() form: FormGroup
  @Input() value = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() initialFormValues = null
  
  masterData = MasterData
  allUserRoles = null
  
  constructor(
    private sharedService: SharedService,
    private sharedApiService: SharedApiService
  ) {
    this.sharedApiService.getUserRoleDdl()
    .pipe(take(1))
      .subscribe(val => {
        this.allUserRoles = val
      },
        error => {
        }
      )
  }

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
        label: "Roles",
        name: "roles",
        inputType: "multi",
        value: this.value,
        options: this.allUserRoles,
        validations: [validationType.required()]
      }  
      ]

      this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
