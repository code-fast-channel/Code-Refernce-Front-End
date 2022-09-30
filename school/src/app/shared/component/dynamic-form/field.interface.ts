import { EventEmitter } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';


export interface Validator {
  name: string;
  value? : any
  validator: any;
  errorMessage?: string;
}
export interface FieldConfig {
  onValueChange?: EventEmitter<any>,
  label?: string;
  name: string;
  hint?:string;
  icon?: string;
  isViewMode: boolean;
  inputType?: string;
  options?: any;
  collections?: any;
  type: string;
  value?:any;
  validations?: Validator[];
}

export class validationType {

  static required(message=""): Validator {
    return {
      name: "required",
      value: null,
      validator: Validators.required,
      errorMessage: message
    }
  }

  static minLength(length: number, message: string = null): Validator {
    return {
      name: "minlength",
      value: length,
      validator: Validators.minLength(length),
      errorMessage: message
    }
  }

  static maxLength(length: number, message: string = null): Validator {
    return {
      name: "maxlenght",
      value: length,
      validator: Validators.minLength(length),
      errorMessage: message
    }
  }

  static pattern(validationPattern: string , message: string = null): Validator {
    return {
      name: "pattern",
      value: length,
      validator: Validators.pattern(validationPattern),
      errorMessage: message
    }
  }

  static email(message:string = null): Validator{
    return {
      name: "pattern",
      value: length,
      validator: Validators.pattern(
        "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
      ),
      errorMessage: message
    }
  }
}
