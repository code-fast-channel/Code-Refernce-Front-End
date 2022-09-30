import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  
  field: FieldConfig;
  group: FormGroup;
  public validators: ValidationErrors
  masterData = MasterData

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

}
