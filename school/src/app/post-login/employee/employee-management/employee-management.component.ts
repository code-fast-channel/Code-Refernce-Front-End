import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { MasterData } from '@env/environment';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';
import { EmployeeService } from '../services/employee.service';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(EmployeeListComponent) private _ListPage: EmployeeListComponent
  @ViewChild('searchCard') searchCard : CardBottomComponent
  
  public editPermissions = false
  public showViewPage = false
  public showAddChangePage = false
  public showListPage = true
  public showDeleteButton = false

  isLoading = false
  Id = null
  masterData = MasterData

  searchForm: FormGroup
  searchConfig: FieldConfig[] = [
    {
      isViewMode: false,
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "firstName",
      icon: "accessibility_new"
    },
    {
      isViewMode: false,
      type: "input",
      label: "Last Name",
      inputType: "text",
      name: "lastName",
      icon: "accessibility"
    },
    {
      isViewMode: false,
      type: "date",
      label: "DOB",
      name: "dob"
    },
    {
      isViewMode: false,
      type: "select",
      label: "Gender",
      name: "genderId",      
      options: this.masterData.genders
    },
    {
      isViewMode: false,
      type: "select",
      label: "Religion",
      name: "religionId",
      options: this.masterData.religions
    },
    {
      isViewMode: false,
      type: "select",
      label: "Cast",
      name: "castId",
      options: this.masterData.casts
    }
  ];


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private employeeService: EmployeeService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(5,1) == 2
    this.searchForm = this.fb.group({})
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
    this.showListPage = this.showAddChangePage = false
  }

  editButtonEvent(event) {
    this.showAddChangePage = true;
    this.Id = event
    this.showViewPage = this.showListPage = false
  }

  deleteButtonEvent(event) {
    this.viewButtonEvent(event)
    this.showDeleteButton = true
  }

  deleteEmployeePermanently() {
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Employee'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {
            this.isLoading = true
            this.employeeService.deleteEmployee(this.Id)
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

