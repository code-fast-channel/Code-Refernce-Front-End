import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-subject-timings',
  templateUrl: './subject-timings.component.html',
  styleUrls: ['./subject-timings.component.css']
})
export class SubjectTimingsComponent implements OnInit {

  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false

  masterData = MasterData
  isLoading = false

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.makeFieldConfig()
  }

  makeFieldConfig() {
    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "select",
        inputType: "multi",
        label: "Teaching Days",
        name: "teachingDays",
        validations: [validationType.required()],
        options: this.masterData.days,
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}
