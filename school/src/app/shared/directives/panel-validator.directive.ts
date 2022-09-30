import { Directive, Input, Renderer2, ElementRef, OnChanges, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[panelValidator]'
})
export class PanelValidatorDirective implements OnChanges  {
  @Input() form: FormGroup;
  
  constructor(
    private render: Renderer2,
    private element: ElementRef
  ) {
   }

   @HostListener("blur") 
onBlur() { 
  alert("focus out")
}
  public ngOnChanges(): void {
    if(this.form.touched && !this.form.valid){
      this.render.addClass(this.element.nativeElement, 'panelError')
    }
    else{
      this.render.removeClass(this.element.nativeElement, 'panelError')
    }
  }
}
