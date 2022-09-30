import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { MasterData } from '@env/environment';
import { ClassListComponent } from '../class-list/class-list.component';
import { Subject } from 'rxjs';
import { ClassService } from '../../services/class.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(ClassListComponent) private _ListPage: ClassListComponent
  
  showViewPage = false
  showAddChangePage = false
  showListPage = true
  showDeleteButton = false

  public editPermissions
  public isLoading = false
    
  Id = null
  masterData = MasterData

  searchForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sharedApiService: SharedApiService,
    private classService: ClassService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(8,4) === 2
  }

  ngOnInit() {}

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

  deleteClassPermanently(){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Class'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.classService.deleteClass(this.Id)
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
