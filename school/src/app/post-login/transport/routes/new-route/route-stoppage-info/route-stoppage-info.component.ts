import { Component, OnInit, Input, EventEmitter, OnDestroy, Output } from '@angular/core';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'route-stoppage-info',
  templateUrl: './route-stoppage-info.component.html',
  styleUrls: ['./route-stoppage-info.component.css']
})
export class RouteStoppageInfoComponent implements OnInit , OnDestroy {
  private unsubscribe$ = new Subject();
  
  @Output() stoppageValueChanged = new EventEmitter()
  
  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false

  routeDistanceChanged$ = new EventEmitter<any>()
  masterData = MasterData

  constructor(    
    private sharedService: SharedService
  ) {}

  ngOnInit() {  

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Stoppage Name",
        inputType: "text",
        name: "stoppageName",
        icon: "traffic",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Distance",
        inputType: "number",
        name: "distance",
        icon: "swap_calls",
        onValueChange: this.routeDistanceChanged$,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Fairs",
        inputType: "number",
        name: "fairs",
        icon: "money",
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Description",
        name: "description",
      }
    ];

    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, this.initialFormValues)

    this.registerDropdownChangeEvents()
  }

  registerDropdownChangeEvents() {
    this.routeDistanceChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.stoppageValueChanged.emit(val)
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
