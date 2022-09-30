import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { environment, MasterData } from '@env/environment';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SharedService } from '@app/shared/services/shared.service';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit, OnDestroy {
 
  private unsubscribe$ = new Subject();
  
  @Output() viewButtonEvent = new EventEmitter()
  @Output() editButtonEvent = new EventEmitter()
  
  @Input() pageTitle: string =""
  @Input() roleId: number

  isLoading = false;

  environment = environment
  masterData = MasterData;
  schools = [];

  viewUserId : any
  viewUser = false

  searchParams = null
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  sortParams = {
    fieldName : "schoolName",
    isAsc : true
  }

  constructor(
    private schoolService: SchoolService,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.getList()
  }

  getList()
  {
    this.isLoading = true;

    let SearchObject = {
      paging : {
        "pageIndex": this.paging.pageIndex,
        "pageSize": this.paging.pageSize
      },
      sorting:{
        "fieldName": this.sortParams.fieldName,
        "isAsc": this.sortParams.isAsc
      }
    }

    this.schoolService
    .getSchoolList(SearchObject)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.isLoading =false
        this.schools = result.data   
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

  deleteClicked(guardianId){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this Guardian?")

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (confirmed: boolean) => {
      if (confirmed) {        
        
        this.isLoading = true

        this.schoolService.deleteSchool(guardianId)
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
