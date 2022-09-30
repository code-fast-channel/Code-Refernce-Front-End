import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  
  field: FieldConfig;
  group: FormGroup;
  public validators: ValidationErrors
  public show = false // Hide and show the password field
  masterData = MasterData;


  constructor() {}
  
  ngOnInit() {
    let control = this.group.get(this.field.name)
    
    if(this.field.isViewMode){
      control.disable()
    }
    
    if (control.validator) {
      this.validators = control.validator({} as AbstractControl);
    }
  }

  onInputChange(event){

    // Prevent space in password and number field
    if(this.field.inputType === "password" || this.field.inputType === "number"){
      event.target.value = event.target.value.trim()
    }

    this.field.value = event.target.value.trim()
    this.onValueChange.emit(this.field.value)
  }
}

