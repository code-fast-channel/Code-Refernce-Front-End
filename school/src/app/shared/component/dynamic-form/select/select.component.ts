import { Component, OnInit, Output, EventEmitter, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, AfterContentChecked {
  
  public field: FieldConfig;
  public group: FormGroup;
  public validators: ValidationErrors

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  masterData = MasterData
  public object_type_value = false

  constructor(
    private sharedService: SharedService
  ) {    
    this.checkValueTypeOfOptions()
   }

  checkValueTypeOfOptions() {

    if(! (this.field && this.field.options) ){
      return
    }

    for (let option of this.field.options) {
      
      if (option["_id"] !== undefined && option["_id"]["$oid"] !== undefined) {
        this.object_type_value = true
      }

      if (option["id"] !== undefined && option["id"]["$oid"] !== undefined) {
        this.object_type_value = true
      }

      break
    }
  }

  ngAfterContentChecked(): void {
  }

  ngOnInit() {
  
    let control = this.group.get(this.field.name)

    this.checkValueTypeOfOptions()

    if (this.field.isViewMode) {
      if (this.field.inputType === 'multi') {
        control.enable()
      }
      else {
        control.disable()
      }
    }

    if (control.validator) {
      this.validators = control.validator({} as AbstractControl);
    }
  }

  dropDownValueChange(event) {
    this.field.value = event.value
    this.onValueChange.emit(this.field.value)
  }

  objectComparisonFunction(option: any, value: any): boolean {

    if (value === null || option === undefined || value === undefined) {
      return false
    }

    return option === value || option.$oid === value.$oid;
  }

}
