import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const TRIM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => TrimDirective),
  multi: true
};

@Directive({
  selector: 'input[trim]',
  providers: [TRIM_VALUE_ACCESSOR]
})
export class TrimDirective implements ControlValueAccessor {
  _onChange(_: any) { }
  _onTouched() { }
  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  constructor (
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) { }

  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  @HostListener('blur', ['$event.target'])
  _onKeyUp(element: HTMLInputElement) {
    let val = element.value.trim();
    this.writeValue(val);
    this._onChange(val);
  }
}