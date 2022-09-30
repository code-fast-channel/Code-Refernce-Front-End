import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SchoolListComponent } from './school-list/school-list.component';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { SchoolService } from '../services/school.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.css']
})
export class SchoolManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(SchoolListComponent) private _ListPage: SchoolListComponent

  showViewPage = false
  showAddChangePage = false
  showListPage = true

  isLoading = false
  Id = null
  masterData = MasterData
  public isSuperAdmin
  public editPermissions

  constructor(
    private sharedService: SharedService,
    private schoolService: SchoolService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(8,6) === 2
  }

  ngOnInit() {
    if (this.sharedService.currentUserRoleId()['$oid'] === this.masterData.superAdminRoleId['$oid']) {
      this.isSuperAdmin = true
    }
    else{
      this.Id = this.sharedService.currentSchoolId()
    }
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

  deleteClicked(id) {
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'School'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.schoolService.deleteSchool(id)
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

