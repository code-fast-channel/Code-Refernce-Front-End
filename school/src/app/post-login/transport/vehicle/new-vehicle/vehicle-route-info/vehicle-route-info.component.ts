import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';
import { FormGroup } from '@angular/forms';
import { MasterData, environment } from '@env/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-route-info',
  templateUrl: './vehicle-route-info.component.html',
  styleUrls: ['./vehicle-route-info.component.css']
})
export class VehicleRouteInfoComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup

  @Input() fieldsConfig: FieldConfig[]
  @Input() initialFormValues = null
  @Input() isViewMode = false
  @Input() isRequired = false

  console = console
  isLoading = false
  masterData = MasterData

  routeChanged$ = new EventEmitter<any>()
  ShowRouteDetails = false
  stoppageList = null

  constructor(
    private sharedService: SharedService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Route",
        name: "routeId",
        icon: "map",
        value: this.initialFormValues? this.initialFormValues.routeId : null,
        onValueChange: this.routeChanged$,
        validations: this.isRequired ? [validationType.required()] : null
      }
    ];

    this.registerDropdownChangeEvents() 
    
    this.fetchRouteDdl()    
  }

  registerDropdownChangeEvents() {
    this.routeChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
       // this.routeChanged()
      })
  }

  fetchRouteDdl() {
    this.isLoading = true
    this.fieldsConfig[0].options = []; // make route list empty

    this.http.get(environment.apiUrl + "api/Route/" + "GetRouteDdl")
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.fieldsConfig[0].options = val; 
        this.isLoading = false
      },
      error =>{
        this.isLoading = false
      }
      )
  }

  ngOnDestroy() {    
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
