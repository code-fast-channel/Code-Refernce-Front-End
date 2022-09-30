import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { GuardianService } from '../services/guardian.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment';
import { PostLoginService } from '@app/post-login/post-login.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-guardian-list',
  templateUrl: './guardian-list.component.html',
  styleUrls: ['./guardian-list.component.css']
})
export class GuardianListComponent implements OnInit, OnDestroy {
 
  private unsubscribe$ = new Subject();
  
  @Output() viewButtonEvent = new EventEmitter()
  @Output() editButtonEvent = new EventEmitter()
  
  @Input() pageTitle: string =""
  @Input() roleId: number

  currentTime = Date.now()

  public editPermissions = false
  isLoading = false;

  environment = environment
  masterData = MasterData;
  guardians = [];

  viewUserId : any
  viewUser = false

  searchParams = null
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  sortParams = {
    fieldName : "basicInfo.firstName",
    isAsc : true
  }

  constructor(
    private guardianService: GuardianService,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(6,1) === 2
  }

  ngOnInit() {
    this.getList()
  }

  getList()
  {
    this.isLoading = true;

    let SearchObject = {
      SearchParameters : this.searchParams,
      paging : {
        "pageIndex": this.paging.pageIndex,
        "pageSize": this.paging.pageSize
      },
      sorting:{
        "fieldName": this.sortParams.fieldName,
        "isAsc": this.sortParams.isAsc
      }
    }

    this.guardianService
    .getGuardianList(SearchObject)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.isLoading =false
        this.guardians = result.data   
        this.paging.length = result.count    
      }, 
      (error) => {
        this.isLoading =false
        console.log(error)
      }
      );    
  }
  
  viewClicked(id, guardianId){
    let idObj = {
      id : id,
      focusId : guardianId
    }
    this.viewButtonEvent.emit(idObj)
  }

  editClicked(id, guardianId){
    let idObj = {
      id : id,
      focusId : guardianId
    }
    this.editButtonEvent.emit(idObj)
  }

  deleteClicked(guardianId){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this Guardian?")

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (confirmed: boolean) => {
      if (confirmed) {        
        
        this.isLoading = true

        this.guardianService.deleteGuardian(guardianId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result) => {
            this.getList()
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

  CardCrossEvent_ViewUser(){
    this.viewUser = false
  }

  sortClicked(sort: Sort){
    this.paging.pageIndex = 0
    this.sortParams.fieldName = sort.active
    this.sortParams.isAsc = sort.direction === 'asc'
    this.getList()
    this.changeDetector.detectChanges();
  }

  pagingClicked(paginator: PageEvent){  
    this.paging.pageIndex = paginator.pageIndex
    this.paging.pageSize = paginator.pageSize
    this.getList();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
