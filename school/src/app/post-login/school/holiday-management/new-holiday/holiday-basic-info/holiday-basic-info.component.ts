import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'holiday-basic-info',
  templateUrl: './holiday-basic-info.component.html',
  styleUrls: ['./holiday-basic-info.component.css']
})
export class HolidayBasicInfoComponent implements OnInit {

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
        type: "date",
        label: "Holiday Date",
        name: "holidayDate",
        validations: [validationType.required()]
      }
    ]

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }

}
