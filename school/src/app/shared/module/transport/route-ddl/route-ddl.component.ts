import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '@app/shared/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { environment, MasterData } from '@env/environment';
import { takeUntil } from 'rxjs/operators';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-route-ddl',
  templateUrl: './route-ddl.component.html',
  styleUrls: ['./route-ddl.component.css']
})
export class RouteDdlComponent implements OnInit, OnDestroy {
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

  constructor(
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
        onValueChange: this.routeChanged$,
        value: this.initialFormValues? this.initialFormValues.routeId : null,
        validations: this.isRequired ? [validationType.required()] : null
      },
      {
        isViewMode: this.isViewMode,
        type: "select",
        label: "Stoppage",
        name: "stoppageId",
        icon: "traffic",
        value: this.initialFormValues? this.initialFormValues.stoppageId : null,
        validations: this.isRequired ? [validationType.required()] : null
      }
    ];

    this.fetchRouteDdl() 
    this.registerDropdownChangeEvents()     
  }

  registerDropdownChangeEvents() {
    this.routeChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.routeChanged()
      })
  }

  fetchRouteDdl() {
    this.isLoading = true
    this.fieldsConfig[0].options = []; // make route list empty
    this.fieldsConfig[1].options = []; // make stoppage list empty

    this.http.get(environment.apiUrl + "api/Route/" + "GetRouteDdl")
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.fieldsConfig[0].options = val;
        this.isLoading = false

        if(this.initialFormValues){
          this.fetchStoppageDdl()
        }
      },
      error =>{
        this.isLoading = false
      }
      )
  }
  
  routeChanged() { 
    this.form.get('stoppageId').setValue(null)    
    this.fetchStoppageDdl()
  }

  fetchStoppageDdl() { 
    this.fieldsConfig[1].options = [];

    if(this.fieldsConfig[0].value == null){
      return
    }

    this.isLoading = true

    this.fieldsConfig[0].options.forEach(route => {
      
      if(route._id.$oid === this.fieldsConfig[0].value.$oid){
        this.fieldsConfig[1].options = route.stoppage;
        this.fieldsConfig[1].value = this.initialFormValues? this.initialFormValues.stoppageId : null;
        this.isLoading = false
        return
      }
    });

    this.isLoading = false
  }


  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
