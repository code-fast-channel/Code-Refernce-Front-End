import { Component, OnInit, Input } from '@angular/core';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-rating-search',
  templateUrl: './rating-search.component.html',
  styleUrls: ['./rating-search.component.css']
})
export class RatingSearchComponent implements OnInit {
  
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
        name: "ratingDate",
        validations: [validationType.required()]
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)
  }
}