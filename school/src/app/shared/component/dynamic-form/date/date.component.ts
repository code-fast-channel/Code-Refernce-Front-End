import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup, ValidationErrors, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MasterData } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  field: FieldConfig;
  group: FormGroup;
  public tempForm: FormGroup
  public validators: ValidationErrors

  masterData = MasterData
  public minDate = null 
  public maxDate = null  
  public startView = "month" // month, year, or multi-year

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if(this.field.options){

      if(this.field.options.minDate){
        this.minDate = this.field.options.minDate
      }

      if(this.field.options.maxDate){
        this.maxDate = this.field.options.maxDate
      }

      if(this.field.options.startView){
        this.startView = this.field.options.startView
      }

      if(this.field.options.selectToday){
        let todayYear = new Date().getFullYear()
        let todayMonth = new Date().getMonth()
        let todayDate = new Date().getDate()

        let selectedDate = new Date(todayYear, todayMonth, todayDate)
        selectedDate.setHours(0, 0, 0, 0)
        this.field.value = selectedDate.getTime()
      }
    }

    // Create a temporary form and it's date control
    let defaultValue = this.field.value ? new Date(this.field.value) : null
    this.tempForm = this.fb.group({})            
    this.tempForm.addControl(this.field.name, this.fb.control(defaultValue, this.bindValidations()));
   
    /**
     * Add actual control to actual form manually 
     * And if you provide the value while creating control, then by default today date
     * will not be picked up by the form control.
     * Even it will not work here, for pages it's working because we populate the
     * form controls from initialvalues using sharedService method
     */
    this.group.addControl(this.field.name, this.fb.control(null, this.bindValidations()))
    this.group.get(this.field.name).setValue(this.field.value)

    let control = this.group.get(this.field.name)

    if (this.field.isViewMode) {
      control.disable()
      this.tempForm.disable()
    }

    if (control.validator) {
      this.validators = control.validator({} as AbstractControl);
    }

    // Whenever the value of tempForm get changed then
    // set that value to actual form control
    this.tempForm.controls[this.field.name].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        if (!value) {                
          this.group.get(this.field.name).setValue(null)
        }
        else {
          let newValue = value._i
          if(newValue){
          let selectedDate = new Date(newValue.year, newValue.month, newValue.date)
          selectedDate.setHours(0, 0, 0, 0)
          this.group.get(this.field.name).setValue(selectedDate.getTime())
          }
        }
      })

      // On Reset button, actual form control value set to null
      // but we need to reset the tempForm value if it is not null
      this.group.get(this.field.name).valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        if ((!value) && this.tempForm.get(this.field.name).value) {          
          this.tempForm.get(this.field.name).setValue(null)
          this.tempForm.markAsUntouched();
        }
      })
  }

  bindValidations() {
    let validations = this.field.validations
    if (validations && validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  touchTempForm(){
    this.group.touched
    this.tempForm.markAllAsTouched()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
