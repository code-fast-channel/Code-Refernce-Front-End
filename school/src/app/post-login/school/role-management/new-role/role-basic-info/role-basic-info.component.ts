import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'role-basic-info',
  templateUrl: './role-basic-info.component.html',
  styleUrls: ['./role-basic-info.component.css']
})
export class RoleBasicInfoComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false

  masterData = MasterData

  constructor(    
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
