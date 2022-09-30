import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterData } from '@env/environment';
import { FieldConfig } from '../dynamic-form/field.interface';

@Component({
  selector: 'dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicControlComponent),
      multi: true
    }
  ]
})
export class DynamicControlComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {

  private unsubscribe$ = new Subject();

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    val && this.controlForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    //console.log("on change");
    this.controlForm.valueChanges
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    //console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.controlForm.disable() : this.controlForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.controlForm.valid ? null : { invalidForm: { valid: false, message: "Dynamic control fields are invalid" } };
  }

  public controlForm: FormGroup = new FormGroup({})

  constructor() { }

  ngOnInit() {     
  }

  masterData = MasterData
  
  @Input() fields: FieldConfig[]
  
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}