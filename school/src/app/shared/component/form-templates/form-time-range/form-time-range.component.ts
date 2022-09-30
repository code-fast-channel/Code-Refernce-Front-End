import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '../../dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'form-time-range',
  templateUrl: './form-time-range.component.html',
  styleUrls: ['./form-time-range.component.css']
})
export class FormTimeRangeComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() Required = false
  @Input() fromLabel = 'From Time'
  @Input() toLabel = 'To Time'
  @Input() nameIcon = 'location_city'

  masterData = MasterData

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    if(!this.fieldsConfig)
    {
      this.fieldsConfig = []
    }

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "time",
        label: this.fromLabel,
        name: "fromTime",
        validations: this.Required ? [validationType.required()] : null
      },
      {
        isViewMode: this.isViewMode,
        type: "time",
        label: this.toLabel,
        name: "toTime",
        validations: this.Required ? [validationType.required()] : null
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}
