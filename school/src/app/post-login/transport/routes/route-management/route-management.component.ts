import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { RouteService } from '../../services/route.service';
import { RouteListComponent } from '../route-list/route-list.component';
import { MasterData } from '@env/environment';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.css']
})
export class RouteManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(RouteListComponent) private _ListPage: RouteListComponent
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
      label: "Route Name",
      inputType: "text",
      name: "routeName",
      icon: "map"
    },
    {
      isViewMode: false,
      type: "input",
      label: "Route Length",
      inputType: "number",
      name: "routeLength",
      icon: "local_gas_station"
    }   
  ];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private routeService: RouteService,
    private plService: PostLoginService
  ) {
    this.searchForm = this.fb.group({})    
    this.editPermissions = this.plService.getPageEntitlements(7,1) === 2
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

  deleteRoutePermanently(){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Route'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.routeService.deleteRoute(this.Id)
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
