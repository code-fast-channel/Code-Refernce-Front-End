import { Component, OnInit, Input } from '@angular/core';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-attendance-search',
  templateUrl: './attendance-search.component.html',
  styleUrls: ['./attendance-search.component.css']
})
export class AttendanceSearchComponent implements OnInit {
  
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
        label: "Date",
        name: "attendanceDate",
        options: {selectToday : true},
        validations: [validationType.required()]
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}