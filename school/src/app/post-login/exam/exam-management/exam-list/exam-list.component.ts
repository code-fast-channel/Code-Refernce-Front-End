import { Component, OnInit, ChangeDetectorRef, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { environment, MasterData } from '@env/environment';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, OnDestroy {
 
  private unsubscribe$ = new Subject();
  
  @Output() viewButtonEvent = new EventEmitter()
  @Output() editButtonEvent = new EventEmitter()
  @Output() deleteButtonEvent = new EventEmitter()
  @Output() reportCardButtonEvent = new EventEmitter()
  @Output() tabularReportCardButtonEvent = new EventEmitter()
  
  @Input() pageTitle: string =""
  @Input() roleId: number

  isLoading = false;

  environment = environment
  masterData = MasterData;
  exams = [];

  viewUserId : any
  viewUser = false
  public editPermissions
  public allClassSubjectObject

  searchParams = null
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  sortParams = {
    fieldName : "_id",
    isAsc : false
  }

  constructor(
    private examService: ExamService,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    private sharedApiService: SharedApiService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(9,1) == 2
  }

  ngOnInit() {
    this.getClassSubjectObject()
    this.getList()
  }

  getClassSubjectObject(){
    this.sharedApiService.getClassSubjectSectionDdl()    
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(val => {
      this.allClassSubjectObject = val
    },
      error => {
      }
    )
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

    this.examService
    .getSchoolExamList(SearchObject)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.isLoading =false
        this.exams = result.data   
        this.paging.length = result.count    
      }, 
      (error) => {
        this.isLoading =false
        console.log(error)
      }
      );    
  }
  
  examTabularReportCardClicked(id){
    this.tabularReportCardButtonEvent.emit(id)
  }

  examReportCardClicked(id){
    this.reportCardButtonEvent.emit(id)
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
