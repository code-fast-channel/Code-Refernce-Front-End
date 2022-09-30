import { Directive, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../component/dynamic-form/input/input.component';
import { TextareaComponent } from '../component/dynamic-form/textarea/textarea.component';
import { SelectComponent } from '../component/dynamic-form/select/select.component';
import { DateComponent } from '../component/dynamic-form/date/date.component';
import { RadiobuttonComponent } from '../component/dynamic-form/radiobutton/radiobutton.component';
import { CheckboxComponent } from '../component/dynamic-form/checkbox/checkbox.component';
import { FieldConfig } from '../component/dynamic-form/field.interface';
import { ToggleButtonComponent } from '../component/dynamic-form/toggle-button/toggle-button.component';
import { TimeComponent } from '../component/dynamic-form/time/time.component';
import { RichTextBoxComponent } from '../component/dynamic-form/rich-text-box/rich-text-box.component';

const componentMapper = {
  input: InputComponent,
  textarea: TextareaComponent,
  select: SelectComponent,
  date: DateComponent,
  time: TimeComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  togglebutton: ToggleButtonComponent,
  richTextBox: RichTextBoxComponent
};

@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;

    if (this.field.onValueChange) {
      if (this.componentRef.instance.onValueChange) {
        this.componentRef.instance.onValueChange
          .subscribe(val => {
            if (this.field && val && this.field.onValueChange) {
              this.field.onValueChange.next(val)
            }
          })
      }
    }

  }
}
