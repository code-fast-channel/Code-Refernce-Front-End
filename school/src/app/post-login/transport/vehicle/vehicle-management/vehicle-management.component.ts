import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { VehicleService } from '../../services/vehicle.service';
import { takeUntil } from 'rxjs/operators';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(VehicleListComponent) private _ListPage: VehicleListComponent
  @ViewChild('searchCard') searchCard : CardBottomComponent

  showViewPage = false
  showAddChangePage = false
  showListPage = true
  showDeleteButton = false
  public editPermissions = false

  isLoading = false
  Id = null
  masterData = MasterData

  searchForm: FormGroup
  searchConfig: FieldConfig[] = [
    {
      isViewMode: false,
      type: "input",
      label: "Registration No",
      inputType: "text",
      name: "registrationNo",
      icon: "directions_bus"
    },
    {
      isViewMode: false,
      type: "select",
      label: "Vehicle Type",
      name: "vehicleTypeId",
      icon: "commute",
      options: this.masterData.vehicleTypes
    },
    {
      isViewMode: false,
      type: "select",
      label: "Fuel Type",
      name: "fuelTypeId",
      icon: "local_gas_station",
      options: this.masterData.fuelTypes
    },
    {
      isViewMode: false,
      type: "select",
      label: "Is Rental",
      name: "isRental",
      icon: "local_taxi",
      options: this.masterData.booleanFlag
    },
    {
      isViewMode: false,
      type: "select",
      label: "Is Only For Office",
      name: "isOnlyForOffice",
      icon: "emoji_transportation",
      options: this.masterData.booleanFlag
    }
  ];


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private vehicleService: VehicleService,
    private plService: PostLoginService
  ) {
    this.searchForm = this.fb.group({})    
    this.editPermissions = this.plService.getPageEntitlements(7,2) === 2
  }

  ngOnInit() {
  }

  onSearchClick() {
    this._ListPage.searchParams = this.searchForm.value
    this._ListPage.paging.pageIndex = 0
    this._ListPage.getList()
    this.searchCard.hide()
  }

  addNewClick() {
    this.Id = null
    this.showAddChangePage = true;
    this.showViewPage = this.showListPage = false
  }
  backToListClick() {
    this.showListPage = true;
    this.showViewPage = this.showAddChangePage = false
  }

  onSaveSuccess(event) {
    this.backToListClick()
    if (this._ListPage) {
      this._ListPage.getList()
    }
  }

  viewButtonEvent(event) {
    this.Id = event;
    this.showViewPage = true;
    this.showDeleteButton = this.showListPage = this.showAddChangePage = false
  }

  editButtonEvent(event) {
    this.showAddChangePage = true;
    this.Id = event
    this.showDeleteButton = this.showViewPage = this.showListPage = false
  }

  deleteButtonEvent(event) {
    this.viewButtonEvent(event)
    this.showDeleteButton = true
  }

  deleteVehiclePermanently(){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Vehicle'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.vehicleService.deleteVehicle(this.Id)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                (result) => {
                  this.backToListClick()
                  this._ListPage.getList()                  
                  this.isLoading = false
                },
                (error) => {
                  this.isLoading = false
                }
              )
          }
        },
        (error) => {
          this.isLoading = false
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}