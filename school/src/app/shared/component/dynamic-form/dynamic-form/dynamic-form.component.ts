import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() form: FormGroup;
  @Input() columnsPerRow = 2 // 0 :- means we need all the columns in rows
  @Input() onlyColumn = false
  @Input() onlyRows = false
  @Input() addEmptyDiv = true
  @Input() gap

  public rows = []
  public columns = []

  get value() {
    return this.form.value;
  }
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if(!this.gap){
      this.gap = "20%"
    }

    this.form = this.createControl();   
    let counter = 0    

    if(this.onlyColumn){
      this.columnsPerRow = 1
    }
    else if(this.onlyRows){
      this.columnsPerRow = 0
    }

    this.fields.forEach(field => {
        counter++      
        if(counter <= this.columnsPerRow || this.columnsPerRow === 0){
          this.columns.push(field)
        }

        if(counter == this.columnsPerRow){
          // create new row
          this.rows.push(this.columns)
          counter = 0
          this.columns = []
        }
    });

    if(this.columns.length > 0){
      this.rows.push(this.columns)
    }
  }

  createControl() {
    if (!this.fields) {
      return this.form
    }
    //  const group = this.form
    this.fields.forEach(field => {

      if (field.type === "button") return;

        let control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );

        this.form.addControl(field.name, control);
     
    });

    return this.form;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
}
