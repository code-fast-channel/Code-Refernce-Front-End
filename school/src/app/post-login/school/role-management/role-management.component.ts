import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { RoleService } from '../services/role.service';
import { RoleListComponent } from './role-list/role-list.component';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(RoleListComponent) private _ListPage: RoleListComponent
  @ViewChild('searchCard') searchCard : CardBottomComponent

  showViewPage = false
  showAddChangePage = false
  showListPage = true
  showDeleteButton = false
  public editPermissions

  isLoading = false
  Id = null
  masterData = MasterData

  searchForm: FormGroup
  searchConfig: FieldConfig[] = [
    {
      isViewMode: false,
      type: "input",
      label: "Role Name",
      inputType: "text",
      name: "name",
      icon: "android"
    } 
  ];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private roleService: RoleService,
    private plService: PostLoginService
  ) {
    this.searchForm = this.fb.group({})
    this.editPermissions = this.plService.getPageEntitlements(8,5) === 2
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

  deleteRolePermanently(){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Role'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.roleService.deleteSchoolRole(this.Id)
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