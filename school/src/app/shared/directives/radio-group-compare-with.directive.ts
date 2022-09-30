import { Directive, AfterContentInit, OnChanges, Input, Output, EventEmitter, ContentChildren, QueryList, SimpleChanges, OnDestroy } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mat-radio-group[bmeCompareWith]'
})
export class RadioGroupCompareWithDirective<T> implements AfterContentInit, OnChanges, OnDestroy {
  private unsubscriber$ = new Subject();
  
  @Input() bmeCompareWith: (o1: T, o2: T) => boolean;
  @Input() ngModel: T;

  @Output() ngModelChange = new EventEmitter<T>();

  @ContentChildren(MatRadioButton, { descendants: true }) radioButtons: QueryList<MatRadioButton>; // List of descendant RadioButtons

  ngOnChangesModel = new BehaviorSubject<T>(null);

  ngAfterContentInit() { // Use ngAfterContentInit to make sure that radioButtons is initialized
    this.ngOnChangesModel.pipe(
      takeUntil(this.unsubscriber$)
    ).subscribe(() => {
      const foundRadioButton = this.radioButtons.toArray().find(radioButton => { // Find a radio button whose value compares to ngModel
        return this.bmeCompareWith(radioButton.value, this.ngModel);
      });
      if (foundRadioButton) { // If radio button is found
        if (this.ngModel !== foundRadioButton.value) { // But its value is not already the ngModel
          this.ngModelChange.emit(foundRadioButton.value); // Then emit the new value
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ngModel) {
      this.ngOnChangesModel.next(changes.ngModel.currentValue);
    }
  }

  ngOnDestroy() {
    this.unsubscriber$.next(true);
    this.unsubscriber$.complete();
  }

}
