import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterData, environment } from '@env/environment';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { RouteService } from '../../services/route.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit, OnDestroy {
 
  private unsubscribe$ = new Subject();
  
  @Output() viewButtonEvent = new EventEmitter()
  @Output() editButtonEvent = new EventEmitter()
  @Output() deleteButtonEvent = new EventEmitter()

  @Input() pageTitle: string =""
  @Input() roleId: number

  isLoading = false;

  environment = environment
  masterData = MasterData;
  routes = [];

  viewUserId : any
  viewUser = false
  public editPermissions = false

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
    private routeService: RouteService,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(7,1) == 2
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

    this.routeService
    .getRouteList(SearchObject)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.isLoading =false
        this.routes = result.data   
        this.paging.length = result.count    
      }, 
      (error) => {
        this.isLoading =false
        console.log(error)
      }
      );    
  }
  
  viewClicked(id){
    this.viewButtonEvent.emit(id)
  }

  editClicked(id){
    this.editButtonEvent.emit(id)
  }

  deleteClicked(id){
    this.deleteButtonEvent.emit(id)
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
